const db = require("../config/db.js");

module.exports = {
  //CREAR
  createClaseTitulo: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const Descripcion = req.body.Descripcion;

    if (
      (Descripcion == null || /^[\s]*$/.test(Descripcion)) &&
      Descripcion.length() <= 255
    ) {
      return res.status(409).send({
        error: "Ingrese Descripcion válido.",
      });
    }
    if (
      (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) &&
      IdUsuario.length() <= 36
    ) {
      return res.status(409).send({
        error: "Ingrese Id usuario válido.",
      });
    } else {
      db.query(
        `CALL sp_AgregarClaseTitulo('${IdUsuario}', '${Descripcion}' )`,
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: "Error",
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
    }
  },

  //LISTADO COMPLETO
  getClaseTitulo: (req, res) => {
    db.query(`CALL sp_ListadoClaseTitulo`, (err, result) => {
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

  // DETALLE POR ID
//   getDetailClaseTitulo: (req, res) => {
//     const IdDescripcion = req.body.IdDescripcion;
//     if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
//       return res.status(409).send({
//         error: "Ingrese IdDescripcion.",
//       });
//     }

//     db.query(
//       `CALL sp_DetalleDetalleInversion('${IdDescripcion}')`,
//       (err, result) => {
//         if (err) {
//           return res.status(500).send({
//             error: "Error",
//           });
//         }
//         if (result.length) {
//           const data = result[0][0];
//           if (data.error) {
//             return res.status(409).send({
//               result: data,
//             });
//           }
//           return res.status(200).send({
//             data,
//           });
//         } else {
//           return res.status(409).send({
//             error: "¡Sin Información!",
//           });
//         }
//       }
//     );
//   },

  //MODIFICA POR ID
  modifyClaseTitulo: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const Descripcion = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;

    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Clase de Titulo",
      });
    }

    if (IdUsuarioModificador == null || /^[\s]*$/.test(IdUsuarioModificador)) {
      return res.status(409).send({
        error: "Ingrese Id usuario modificador",
      });
    } else {
      db.query(
        `CALL sp_ModificaClaseTitulo('${IdDescripcion}','${Descripcion}','${IdUsuarioModificador}')`,
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: "Error",
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
              result: data,
            });
          } else {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
        }
      );
    }
  },

  //BORRADO LOGICO
  deleteClaseTitulo: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaClaseTitulo('${IdDescripcion}', '${IdUsuarioModificador}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
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
            result: data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },
};
