const db = require("../config/db.js");
const promiseDb = db.promise();

module.exports = {
  //CREAR
  addPathDocSol: (req, res) => {
    const { IdSolicitud, Ruta, NombreIdentificador, NombreArchivo, TpoDoc } = req.body;
    db.query(
      `CALL sp_AddPathDocSol(?,?,?,?,?)`, [IdSolicitud, Ruta, NombreIdentificador, NombreArchivo, TpoDoc],
      (err, result) => {
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
  // DETALLE POR ID
  getDetailPathDocSol: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSol.",
      });
    }
    db.query(`CALL sp_DetallePathDocSol('${IdSolicitud}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0];
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
    });
  },

  //CREAR
  addPathDocAut: (req, res) => {
    const IdAutorizacion = req.body.IdAutorizacion;
    const Ruta = req.body.Ruta;
    const NombreIdentificador = req.body.NombreIdentificador;
    const NombreArchivo = req.body.NombreArchivo;

    db.query(
      `CALL sp_AddPathDocAutorizaciones('${IdAutorizacion}', '${Ruta}', '${NombreIdentificador}' , '${NombreArchivo}' )`,
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
  // DETALLE POR ID
  getDetailPathDocAut: (req, res) => {
    const IdAutorizacion = req.query.IdAutorizacion;
    if (IdAutorizacion == null || /^[\s]*$/.test(IdAutorizacion)) {
      return res.status(409).send({
        error: "Ingrese IdSol.",
      });
    }
    db.query(
      `CALL sp_DetallePathDocAutorizaciones('${IdAutorizacion}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0];
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

  //CREAR
  addPathDocFideicomiso: (req, res) => {
    const IdFideicomiso = req.body.IdFideicomiso;
    const Ruta = req.body.Ruta;
    const NombreIdentificador = req.body.NombreIdentificador;
    const NombreArchivo = req.body.NombreArchivo;

    db.query(
      `CALL sp_AddPathDocFideicomisos('${IdFideicomiso}', '${Ruta}', '${NombreIdentificador}' , '${NombreArchivo}' )`,
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

  // DETALLE POR ID
  getDetailPathDocFideicomiso: (req, res) => {
    const IdFideicomiso = req.query.IdFideicomiso;
    if (IdFideicomiso == null || /^[\s]*$/.test(IdFideicomiso)) {
      return res.status(409).send({
        error: "Ingrese IdSol.",
      });
    }
    db.query(
      `CALL sp_DetallePathDocFideicomisos('${IdFideicomiso}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0];
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

  //CREAR
  addPathDocMandato: (req, res) => {
    const IdMandato = req.body.IdMandato;
    const Ruta = req.body.Ruta;
    const NombreIdentificador = req.body.NombreIdentificador;
    const NombreArchivo = req.body.NombreArchivo;

    db.query(
      `CALL sp_AddPathDocMandatos('${IdMandato}', '${Ruta}', '${NombreIdentificador}' , '${NombreArchivo}' )`,
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

  // DETALLE POR ID
  getDetailPathDocMandato: (req, res) => {
    const IdMandato = req.query.IdMandato;
    if (IdMandato == null || /^[\s]*$/.test(IdMandato)) {
      return res.status(409).send({
        error: "Ingrese IdSol.",
      });
    }
    db.query(
      `CALL sp_DetallePathDocMandatos('${IdMandato}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0];
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

  //CREAR
  addPathDocInstruccion: (req, res) => {
    const IdInstruccion = req.body.IdInstruccion;
    const Ruta = req.body.Ruta;
    const NombreIdentificador = req.body.NombreIdentificador;
    const NombreArchivo = req.body.NombreArchivo;

    db.query(
      `CALL sp_AddPathDocInstrucciones('${IdInstruccion}', '${Ruta}', '${NombreIdentificador}' , '${NombreArchivo}' )`,
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

  // DETALLE POR ID
  getDetailPathDocInstruccion: (req, res) => {
    const IdInstruccion = req.query.IdInstruccion;
    if (IdInstruccion == null || /^[\s]*$/.test(IdInstruccion)) {
      return res.status(409).send({
        error: "Ingrese IdSol.",
      });
    }
    db.query(
      `CALL sp_DetallePathDocInstrucciones('${IdInstruccion}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0];
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

  deletePathDocSol: async (req, res) => {
    const { IdSolicitud, jsonDocsDel } = req.body;
  
    // Validación de entrada
    if (!IdSolicitud || !Array.isArray(jsonDocsDel) || jsonDocsDel.length === 0) {
      return res.status(400).send({
        error: 'Ingrese IdSolicitud y al menos un documento a eliminar',
      });
    }
  
    try {
      for (const doc of jsonDocsDel) {
        const { NombreDoc, TpoDoc } = doc;
        console.log( `DELETE FROM SRPU.PathDocSol
          WHERE IdSolicitud = ?
          AND TipoDocId = ?
          AND (NombreArchivo = ? OR NombreIdentificador = ?)`,
         [IdSolicitud, TpoDoc, NombreDoc, NombreDoc]);
        
        const [results] = await promiseDb.query(
          `DELETE FROM SRPU.PathDocSol
           WHERE IdSolicitud = ?
           AND TipoDocId = ?
           AND (NombreArchivo = ? OR NombreIdentificador = ?)`,
          [IdSolicitud, TpoDoc, NombreDoc, NombreDoc]
        );
  
        if (results.affectedRows === 0) {
          throw new Error(`No se pudo eliminar el documento ${NombreDoc} de tipo ${TpoDoc}`);
        }
      }
  
      //db.release();
      return res.status(200).send({ message: 'Documentos eliminados correctamente' });
    } catch (error) {
      console.error(error); // Registra el error para depuración
      return res.status(500).send({ error: 'Error al eliminar documentos' });
    }
  },

};
