const db = require("../config/db.js");

module.exports = {
  //CREAR
  createAsignacionTipoMovSolicitudes: (req, res) => {

    const IdSolicitud = req.body.IdSolicitud;
    const IdFuentePago = req.body.IdFuentePago;
    const TipoMovRelacionado = req.body.TipoMovRelacionado;
    const PorcentajeOriginalIngreso = req.body.PorcentajeOriginalIngreso;
    const PorcentajeOriginalEquivalencia = req.body.PorcentajeOriginalEquivalencia;
    const PorcentajeUtilizadoIngreso = req.body.PorcentajeUtilizadoIngreso;
    const PorcentajeUtilizadoEquivalencia = req.body.PorcentajeUtilizadoEquivalencia;

    if (
      (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) &&
      IdSolicitud.length() <= 36
    ) {
      return res.status(409).send({
        error: "Ingrese Id usuario válido.",
      });
    } else {
      db.query(
        `CALL sp_AgregarAsignacionTipoMovSolicitudes('
        ${IdSolicitud}', '${IdFuentePago}', '${TipoMovRelacionado}' , '${PorcentajeOriginalIngreso}',
         '${PorcentajeOriginalEquivalencia}' , '${PorcentajeUtilizadoIngreso}' , '${PorcentajeUtilizadoEquivalencia}' )`,
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
  getAutorizaciones: (req, res) => {
    db.query(`CALL sp_ListadoAutorizaciones()`, (err, result) => {
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
  getDetailAutorizacion: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese IdDescripcion.",
      });
    }

    db.query(
      `CALL sp_DetalleAutorizacion('${IdDescripcion}')`,
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
  },

  //MODIFICA POR ID
  modifyAutorizacion: (req, res) => {
    const IdAutorizacion = req.body.IdAutorizacion;
    const Entidad = req.body.Entidad;
    const FechaPublicacion = req.body.FechaPublicacion;
    const MedioPublicacion = req.body.MedioPublicacion;
    const MontoAutorizado = req.body.MontoAutorizado;
    const DocumentoSoporte = req.body.DocumentoSoporte;
    const AcreditacionQuorum = req.body.AcreditacionQuorum;
    const DestinoAutorizado = req.body.DestinoAutorizado;
    const DetalleDestino = req.body.DetalleDestino;
    const IdUsuario = req.body.IdUsuario;

    if (IdAutorizacion == null || /^[\s]*$/.test(IdAutorizacion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    } else {
      db.query(
        `CALL sp_ModificaAutorizacion('${IdAutorizacion}', '${Entidad}', '${FechaPublicacion}', '${MedioPublicacion}', '${MontoAutorizado}', '${DocumentoSoporte}', '${AcreditacionQuorum}', '${DestinoAutorizado}', '${DetalleDestino}', '${IdUsuario}')`,
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
  deleteAutorizacion: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const IdUsuarioModificador = req.body.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaAutorizacion('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
