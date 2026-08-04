const db = require("../config/db.js");
const { sendEmail } = require("./mail/sendMail.js");
const path = require("path");
module.exports = {
  //Crear
  createNotificacion: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const ControlInterno = req.body.ControlInterno;
    const Titulo = req.body.Titulo;
    const Mensaje = req.body.Mensaje;
    const IdUsuarioCreador = req.body.IdUsuarioCreador;
    const ListadoUsuarios = req.body.ListadoUsuarios;
    const NumRegistroSolicitud = req.body.NumRegistroSolicitud;
    const FechaNotificacion = req.body.FechaNotificacion; // Nueva fecha opcional

    if (Titulo == null || /^[\s]*$/.test(Titulo)) {
      return res.status(409).send({
        error: "Ingrese Titulo",
      });
    }
    if (Mensaje == null || /^[\s]*$/.test(Mensaje)) {
      return res.status(409).send({
        error: "Ingrese Mensaje",
      });
    }
    if (IdUsuarioCreador == null || /^[\s]*$/.test(IdUsuarioCreador)) {
      return res.status(409).send({
        error: "Ingrese IdUsuarioCreador",
      });
    }
    if (ListadoUsuarios === null) {
      return res.status(409).send({
        error: "Ingrese ListaUsuarios",
      });
    }

    if (IdSolicitud === null) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }

    if (ControlInterno === null) {
      return res.status(409).send({
        error: "Ingrese ControlInterno",
      });
    }

    if (NumRegistroSolicitud === null) {
      return res.status(409).send({
        error: "Ingrese Numero  de Registro de la Solicitud",
      });
    }
    const Usuarios = JSON.stringify({ Usuarios: ListadoUsuarios });

    // Formatear la fecha si se proporciona
    const fechaFormateada = FechaNotificacion ? new Date(FechaNotificacion).toISOString().slice(0, 19).replace('T', ' ') : null;

    db.query(
      `CALL sp_AgregarNotificacion('${IdSolicitud}','${ControlInterno}','${Titulo}','${Mensaje}','${IdUsuarioCreador}', '${Usuarios}', ${fechaFormateada ? `'${fechaFormateada}'` : 'NULL'})`,
      (err, result) => {
        // console.log("error", err);
        // console.log("result", result);

        // console.log("ListadoUsuarios", ListadoUsuarios);
        // console.log("Titulo", Titulo);
        // console.log("Mensaje", Mensaje);
        // console.log("NumRegistroSolicitud", NumRegistroSolicitud);
        // console.log(
        //   "process.env.LOGIN_B_APP_FRONT",
        //   process.env.LOGIN_B_APP_FRONT
        // );
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }
        if (result.length) {
          const data = result[0][0];
          if (data.error) {
            return res.status(409).send({
              result: data,
            });
          }
          // sendEmail({
          //   usuarios: ListadoUsuarios,
          //   titulo: Titulo,
          //   asunto: Mensaje,
          //   plantilla: "sgcm-1",
          //   nombre: "Nombre del usuario",
          //   mensaje: Mensaje,
          //   usuario: "Usuario",
          //   NumRegistroSolicitud: "Número de Registro",
          // });
          console.log(path.join(__dirname, "../controllers/mail/templates/image/Palacio.png"));
          sendEmail({
            usuarios: ListadoUsuarios,
            template: "template_New_Correo",
            subject: Titulo,
            attachments: [
              {
                filename: "Palacio.png",
                path: path.join(__dirname, "../controllers/mail/templates/image/Palacio.png"),
                cid: "Palacio",
              },
            ],
            data: {
              Titulo: Titulo,
              Nombre: "Hola Nombre",
              Mensaje: Mensaje,
              Usuario: "Usuario Hola",
              NumRegistroSolicitud: NumRegistroSolicitud,
              LoginUrl: process.env.LOGIN_B_APP_FRONT,
            },
          });
          console.log("Mensaje enviado", Mensaje);

          return res.status(200).send({
            data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },

  //LISTADO DE NOTIFICACINES DEL USUARIO
  getNotificaciones: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(
      `CALL sp_ListadoNotificacionesUsuario('${IdUsuario}')`,
      (err, result) => {
        //  console.log("result: ",result);
        if (err) {
          return res.status(500).send({
            error: err,
          });
        }

        if (result.length) {
          const data = result[0];
          return res.status(200).send({
            data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },

  //MARCAR MOMO LEIDA UNA  NOTIFICACION
  leerNotificacion: (req, res) => {
    const IdNotificacion = req.body.IdNotificacion;

    if (IdNotificacion == null || /^[\s]*$/.test(IdNotificacion)) {
      return res.status(409).send({
        error: "Ingrese IdNotificacion",
      });
    }

    db.query(
      `CALL sp_LeerNotificacion( '${IdNotificacion}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error de servidor",
          });
        }
        if (result.length) {
          const data = result[0][0];
          if (data.error) {
            return res.status(409).send({
              result: data,
            });
          }
          return res.status(200).send({
            data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },
  //LISTADO DE NOTIFICACIONES CREADAS  POR  EL USAURIO
  getNotificacionesCreadas: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }
    db.query(
      `CALL sp_ListadoHistorialNotificaciones('${IdUsuario}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }

        if (result.length) {
          const data = result[0];
          return res.status(200).send({
            data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },
  //LISTADO DE INFORMACION DE UNA NOTIFICACION
  getInfoNotificacion: (req, res) => {
    const IdNotificacion = req.query.IdNotificacion;
    if (IdNotificacion == null || /^[\s]*$/.test(IdNotificacion)) {
      return res.status(409).send({
        error: "Ingrese IdNotificacion",
      });
    }
    db.query(`CALL sp_InfoNotificacion('${IdNotificacion}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }

      if (result.length) {
        const data = result[0];
        return res.status(200).send({
          data,
        });
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },
};
