const db = require("../config/db.js");

module.exports = {
  //CREAR
  createGarantiaDePago: (req, res) => {
    const GarantiaDePago = req.body.Descripcion;
    const IdUsuarioCreador = req.body.IdUsuario;

    if (GarantiaDePago == null || /^[\s]*$/.test(GarantiaDePago)) {
      return res.status(409).send({
        error: "Ingrese Fuente De Pago",
      });
    } else {
      db.query( 
        `CALL sp_AgregarGarantiaDePago('${GarantiaDePago}', '${IdUsuarioCreador}' )`,
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

  //LISTADO COMPLETO en proceso
  getGarantiaDePago: (req, res) => {
    db.query(`CALL sp_ListadoGarantiaDePago()`, (err, result) => {
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

  //MODIFICA POR ID
  modifyGarantiaDePago: (req, res) => {
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
        error: "Ingrese Nueva Garantia De Pago",
      });
    } else {
      db.query(
        `CALL sp_ModificaGarantiaDePago('${IdDescripcion}','${Descripcion}','${IdUsuarioModificador}')`,
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
  deleteGarantiaDePago: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaGarantiaDePago('${IdDescripcion}', '${IdUsuarioModificador}')`,
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