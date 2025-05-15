const db = require("../config/db.js");

module.exports = {
  //CREAR
  createPorcentajeAcumulado: (req, res) => {
    const IdTipoEntePublicoObligado = req.body.IdTipoEntePublicoObligado;
    const IdEntePublicoObligado = req.body.IdEntePublicoObligado;
    const NombreEntePublico = req.body.NombreEntePublico;
    const AfectadoTotalIngreso = req.body.AfectadoTotalIngreso;
    const EquivalenciaCorrespondienteMunicipios = req.body.EquivalenciaCorrespondienteMunicipios;

    if (
      (IdTipoEntePublicoObligado == null || /^[\s]*$/.test(IdTipoEntePublicoObligado)) &&
      IdTipoEntePublicoObligado.length() <= 36
    ) {
      return res.status(409).send({
        error: "Ingrese Id de ente publico obligado válido.",
      });
    } else {
      db.query(
        `CALL sp_AgregarPorcentajeAcumulado('${IdTipoEntePublicoObligado}', '${IdEntePublicoObligado}', '${NombreEntePublico}', '${AfectadoTotalIngreso}','${EquivalenciaCorrespondienteMunicipios}' )`,
        (err, result) => {
          consol.log("ERROR PORCENTAJE ACUMULADOS CREATE", err)
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

  // //LISTADO COMPLETO
  DetallePorcentajeAcumulado: (req, res) => {
    const IdEntePublicoObligado = req.query.IdEntePublicoObligado;
  
    db.query(`CALL sp_DetallePorcentajeAcumulado('${IdEntePublicoObligado}')`, (err, result) => {
      console.log("ERROR OBTENER PORCENTAJE ACUMULADOS:  ", err);
  
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
  
      if (result.length && result[0].length > 0) {
        const data = result[0];
        return res.status(200).send({ data });
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },

};
