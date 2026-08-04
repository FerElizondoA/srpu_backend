const db = require("../config/db.js");

module.exports = {
  getTrazabilidadSolicitud: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }
    db.query(
      `CALL sp_ListadoTrazabilidadSolicitud('${IdSolicitud}')`,
      (err, result) => {
        if (err) {
          console.log(err);
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
      },
    );
  },

  getPrimerUsuarioEstatus2: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }
    db.query(
      `CALL sp_UsuarioTrazabilidadActualizacion('${IdSolicitud}')`,
      (err, result) => {
        if (err) {
          console.log(err);
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
      },
    );
  },

  getFechasFirmaVerificador: (req, res) => {
    const IdSolicitud = req.params.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }
    db.query(
      `CALL sp_ObtenerFechasFirmaVerificador(?)`,
      [IdSolicitud],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            error: "Error",
          });
        }

        if (result.length && result[0].length) {
          const data = result[0][0];
          return res.status(200).send({
            fechaInscripcion: data.FechaInscripcion,
            fechaRespuestaPrevencion: data.FechaRespuestaPrevencion,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      },
    );
  },
};
