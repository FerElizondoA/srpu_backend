const db = require("../config/db.js");

module.exports = {
  //CREAR
  createPorcentajesAcumulados: (req, res) => {
    const {
      IdTipoEntePublicoObligado,
      IdEntePublicoObligado,
      NombreEntePublico,
      IdFondoOIngreso,
      NombreFondoOIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios,
    } = req.body;

    db.query(
      `CALL sp_AgregarPorcentajesAcumulados(?, ?, ?, ?, ?, ?, ?)`,
      [
        IdTipoEntePublicoObligado,
        IdEntePublicoObligado,
        NombreEntePublico,
        IdFondoOIngreso,
        NombreFondoOIngreso,
        AfectadoTotalIngreso,
        EquivalenciaCorrespondienteMunicipios,
      ],
      (err, result) => {
        if (err) {
          console.error("ERROR SP:", err);
          return res.status(409).send({
            error: err.sqlMessage || "Ocurrió un error al ejecutar el SP.",
          });
        }

        if (result.length && result[0].length > 0) {
          const data = result[0][0]; // contiene { Mensaje: '...' }
          return res.status(200).send({ data });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },

  modificaPorcentajesAcumulados: (req, res) => {
    const {
      IdTipoEntePublicoObligado,
      IdEntePublicoObligado,
      NombreEntePublico,
      IdFondoOIngreso,
      NombreFondoOIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios,
    } = req.body;

    db.query(
      `CALL sp_ModificaPorcentajesAcumulados(?, ?, ?, ?, ?, ?, ?)`,
      [
        IdTipoEntePublicoObligado,
        IdEntePublicoObligado,
        NombreEntePublico,
        IdFondoOIngreso,
        NombreFondoOIngreso,
        AfectadoTotalIngreso,
        EquivalenciaCorrespondienteMunicipios,
      ],
      (err, result) => {
        if (err) {
          console.error("ERROR SP:", err);
          return res.status(409).send({
            error: err.sqlMessage || "Ocurrió un error al ejecutar el SP.",
          });
        }

        if (result.length && result[0].length > 0) {
          const data = result[0][0]; // contiene { Mensaje: '...' }
          return res.status(200).json({ mensaje: "Actualizado correctamente", data });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },

  // //LISTADO COMPLETO

  DetallePorcentajesAcumulados: (req, res) => {
    const IdEntePublicoObligado = req.query.IdEntePublicoObligado;
    const IdFondoOIngreso = req.query.IdFondoOIngreso;

    db.query(
      `CALL sp_DetallePorcentajeAcumulado(?,?)`,
      [IdEntePublicoObligado, IdFondoOIngreso],
      (err, result) => {
        console.error("ERROR OBTENER PORCENTAJE ACUMULADOS: ", err);

        if (err) {
          return res.status(500).send({
            error: "Error en el servidor",
          });
        }

        if (result.length && result[0].length > 0) {
          const data = result[0];

          // Validamos si es un mensaje en vez de datos de tabla
          if (data[0].Mensaje) {
            return res.status(200).send({
              mensaje: data[0].Mensaje,
              data: null,
            });
          } else {
            return res.status(200).send({
              mensaje: null,
              data: data[0], // Primer resultado de la tabla
            });
          }
        } else {
          return res.status(404).send({
            error: "Sin información encontrada",
          });
        }
      }
    );
  },

  DetallePorcentajesAcumuladosMultiples: (req, res) => {
    const combinaciones = req.body.combinaciones; // [{ IdEntePublicoObligado, IdFondoOIngreso }]

    if (!Array.isArray(combinaciones) || combinaciones.length === 0) {
      return res
        .status(400)
        .send({ error: "Se requiere al menos una combinación." });
    }

    const combinacionesJSON = JSON.stringify(combinaciones);

    db.query(
      "CALL sp_DetallePorcentajeAcumuladoMultiples(?)",
      [combinacionesJSON],
      (err, result) => {
        if (err) {
          console.error("Error al ejecutar SP Múltiple:", err);
          return res
            .status(500)
            .send({ error: "Error del servidor al obtener porcentajes." });
        }

        if (result && result[0]) {
          return res.status(200).send({ data: result[0] });
        } else {
          return res
            .status(200)
            .send({
              mensaje: "Sin datos para las combinaciones proporcionadas.",
            });
        }
      }
    );
  },

  // DetallePorcentajesAcumulados: (req, res) => {
  //   const IdEntePublicoObligado = req.query.IdEntePublicoObligado;

  //   db.query(
  //     `CALL sp_DetallePorcentajeAcumulado('${IdEntePublicoObligado}')`,
  //     (err, result) => {
  //       console.log("ERROR OBTENER PORCENTAJE ACUMULADOS:  ", err);

  //       if (err) {
  //         return res.status(500).send({
  //           error: "Error",
  //         });
  //       }

  //       if (result.length && result[0].length > 0) {
  //         const data = result[0];
  //         return res.status(200).send({ data });
  //       } else {
  //         return res.status(409).send({
  //           error: "¡Sin Información!",
  //         });
  //       }
  //     }
  //   );
  // },
};
