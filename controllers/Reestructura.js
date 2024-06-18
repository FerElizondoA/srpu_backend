const db = require("../config/db.js");

module.exports = {

    createSolicitudReestructura: (req, res) => {
        const IdSolicitud = req.body.IdSolicitud;
        const SolicitudReestructura = req.body.SolicitudReestructura;
        const IdEditor = req.body.IdEditor;
        const Estatus = req.body.Estatus
        const NumeroRegistro = req.body.NumeroRegistro 
    
        if (
          (IdEditor == null || /^[\s]*$/.test(IdEditor)) &&
          IdEditor.length() <= 36
        ) {
          return res.status(409).send({
            error: "Ingrese Id usuario válido.",
          });
        } else {
          db.query(
            `CALL sp_AgregarSolicitudReestructura('${IdSolicitud}', '${SolicitudReestructura}', '${IdEditor}','${Estatus}', '${NumeroRegistro}')`,
            (err, result) => {
              console.log(err)
              console.log(result)
              if (err) {
                console.log(err)
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


      getSolicitudReestructuraFirma: (req, res) => {
        const IdSolicitud = req.query.IdSolicitud
        if (
          (IdSolicitud === null || IdSolicitud === "") 
        ) {
          return res.status(409).send({
            error: "Ingrese Id de la Solicitud.",
          });
        } else {
          db.query(
            `CALL sp_SelectSolicitudReestructura('${IdSolicitud}')`,
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  error: err,
                });
              }
        
              if (result.length) {
                const data = result[0][0];
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

}