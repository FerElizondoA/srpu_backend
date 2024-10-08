const db = require("../config/db.js");

module.exports = {
  //CREAR  
  createReglaDeFinanciamiento: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const Descripcion = req.body.Descripcion;
    const OCP = req.body.OCP;
    const OLP = req.body.OLP;

    if ((Descripcion == null ||/^[\s]*$/.test(Descripcion))) {
      return res.status(409).send({
        error: "Ingrese Descripcion válido.",
      });
    } 
    if ((IdUsuario == null || /^[\s]*$/.test(IdUsuario))) {
        return res.status(409).send({
          error: "Ingrese Id usuario válido.",
        });
      } 
    else {
      db.query(
        `CALL sp_AgregarReglaDeFinanciamiento('${IdUsuario}', '${Descripcion}', '${OCP}', '${OLP}' )`,
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
  getReglasDeFinanciamiento: (req, res) => {
    db.query(`CALL sp_ListadoReglasDeFinanciamiento()`, (err, result) => {
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
  getDetailReglaDeFinanciamiento: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    if (IdDescripcion == null ||/^[\s]*$/.test(IdDescripcion)) {
        return res.status(409).send({
          error: "Ingrese IdDescripcion.",
        });
      } 

    db.query(
      `CALL sp_DetalleReglaDeFinanciamiento('${IdDescripcion}')`,
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
  modifyReglaDeFinanciamiento: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const Descripcion = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;
    const OCP = req.body.OCP;
    const OLP = req.body.OLP;

    if (IdDescripcion == null ||/^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (Descripcion == null ||/^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese nueva descripcion",
      });
    }
    
    if (IdUsuarioModificador == null ||/^[\s]*$/.test(IdUsuarioModificador)) {
        return res.status(409).send({
          error: "Ingrese Id usuario modificador",
        });
      } else {
      db.query(
        `CALL sp_ModificaReglaDeFinanciamiento('${IdDescripcion}','${Descripcion}','${IdUsuarioModificador}','${OCP}','${OLP}')`,
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
  deleteReglaDeFinanciamiento: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaReglaDeFinanciamiento('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
