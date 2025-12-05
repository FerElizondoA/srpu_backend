const db = require("../config/db.js");

module.exports = {
  //CREAR
  createAsignacionTipoMovSolicitudes: (req, res) => {
    //const IdSolicitud = req.body.IdSolicitud;
    const IdSolicitud = req.body.IdSolicitud; //TE QUEDASTE AQUI
    const IdFuentePago = req.body.IdFuentePago;
    const TipoMovRelacionado = req.body.TipoMovRelacionado;
    const NombreTipoFuentePago = req.body.NombreTipoFuentePago;
    const IdEntePublicoObligado = req.body.IdEntePublicoObligado;
    const IdFondoIngreso = req.body.IdFondoIngreso;
    const PorcentajeOriginalIngreso = req.body.PorcentajeOriginalIngreso;
    const PorcentajeOriginalEquivalencia =
      req.body.PorcentajeOriginalEquivalencia;
    const PorcentajeUtilizadoIngreso = req.body.PorcentajeUtilizadoIngreso;
    const PorcentajeUtilizadoEquivalencia =
      req.body.PorcentajeUtilizadoEquivalencia;

    if (
      (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) &&
      IdSolicitud.length <= 36
    ) {
      return res.status(409).send({
        error: "Ingrese Id usuario válido.",
      });
    } else {
      db.query(
        `CALL sp_AgregarAsignacionTipoMovSolicitudes(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          IdSolicitud.trim(),
          IdFuentePago.trim(),
          TipoMovRelacionado,
          NombreTipoFuentePago,
          IdEntePublicoObligado,
          IdFondoIngreso,
          PorcentajeOriginalIngreso,
          PorcentajeOriginalEquivalencia,
          PorcentajeUtilizadoIngreso,
          PorcentajeUtilizadoEquivalencia,
        ],
        // `CALL sp_AgregarAsignacionTipoMovSolicitudes('${IdSolicitud}', '${IdFuentePago}', '${TipoMovRelacionado}', '${PorcentajeOriginalIngreso}', '${PorcentajeOriginalEquivalencia}', '${PorcentajeUtilizadoIngreso}', '${PorcentajeUtilizadoEquivalencia}')`,
        (err, result) => {
          if (err) {
            console.error("ERROR SP:", err);
            return res.status(500).send({
              error: "Error" + err,
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

  modifyAsignacionUtilizadoTipoMovSolicitudes: (req, res) => {
    const IdFuentePago = req.body.IdFuentePago;
    const TipoMovRelacionado = req.body.TipoMovRelacionado;
    const NombreTipoFuentePago = req.body.NombreTipoFuentePago;
    //const IdEntePublicoObligado = req.body.IdEntePublicoObligado;
    //const IdFondoIngreso = req.body.IdFondoIngreso;
    const PorcentajeUtilizadoIngreso = req.body.PorcentajeUtilizadoIngreso;
    const PorcentajeUtilizadoEquivalencia =
      req.body.PorcentajeUtilizadoEquivalencia;
    const bool_Suma = req.body.bool_Suma;
    if (
      (IdFuentePago == null || /^[\s]*$/.test(IdFuentePago)) &&
      IdFuentePago.length <= 36
    ) {
      return res.status(409).send({
        error: "Ingrese Id usuario válido.",
      });
    } else {
      db.query(
        `CALL sp_ModificaAsignacionUtilizadoTipoSolicitud(?, ?, ?, ?, ?,?)`,
        [
          IdFuentePago,
          TipoMovRelacionado,
          NombreTipoFuentePago,
          //IdEntePublicoObligado,
          //IdFondoIngreso,
          PorcentajeUtilizadoIngreso,
          PorcentajeUtilizadoEquivalencia,
          bool_Suma,
        ],
        (err, result) => {
          if (err) {
            console.error(" ASIGNACION ERROR SP:", err);
            return res.status(500).send({
              error: "Error" + err,
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
  modifyAsignacionOriginalTipoMovSolicitudes: (req, res) => {
    const {
      IdFuentePago,
      TipoMovRelacionado,
      NombreTipoFuentePago,
      PorcentajeOriginalIngreso,
      PorcentajeOriginalEquivalencia,
    } = req.body;

    // Validación de entrada
    if (
      !IdFuentePago ||
      IdFuentePago.trim() === "" ||
      IdFuentePago.length > 36
    ) {
      return res.status(409).send({
        error: "Ingrese IdFuentePago válido.",
      });
    }

    db.query(
      `CALL sp_ModificaAsignacionOriginalTipoSolicitud(?, ?, ?, ?, ?)`,
      [
        IdFuentePago,
        TipoMovRelacionado,
        NombreTipoFuentePago,
        PorcentajeOriginalIngreso,
        PorcentajeOriginalEquivalencia,
      ],
      (err, result) => {
        console.log("--- Parámetros SP ---");
        console.log(
          IdFuentePago,
          TipoMovRelacionado,
          NombreTipoFuentePago,
          PorcentajeOriginalIngreso,
          PorcentajeOriginalEquivalencia
        );

        if (err) {
          console.error("❌ ERROR SQL:", err.message);
          return res.status(409).send({
            error: err.message || "Error en el procedimiento almacenado.",
          });
        }

        console.log("✅ RESULTADO SP:", JSON.stringify(result, null, 2));

        // Verificamos que el SP haya devuelto filas
        // if (!result || !Array.isArray(result) || !result[0] || result[0].length === 0) {
        //   return res.status(404).send({
        //     error: "No se encontraron registros modificados.",
        //   });
        // }

        if (!result || !Array.isArray(result) || !result[0]) {
          return res.status(200).send({
            message: "Sin registros modificados (no se encontró coincidencia).",
            data: [],
          });
        }

        const data = result[0];

        // Si viene 'NO_MATCH', simplemente indicamos que no hubo actualización
        if (data.length === 1 && data[0].Resultado === "NO_MATCH") {
          return res.status(200).send({
            message: "Registro no existente, omitido correctamente.",
            data: [],
          });
        }

        return res.status(200).send({
          message: "Registro(s) modificado(s) correctamente.",
          data,
        });

        // const data = result[0];
        // return res.status(200).send({
        //   message: "Registro(s) modificado(s) correctamente.",
        //   data,
        // });
      }
    );
  },

  //   modifyAsignacionOriginalTipoMovSolicitudes: (req, res) => {
  //   const IdFuentePago = req.body.IdFuentePago;
  //   const TipoMovRelacionado = req.body.TipoMovRelacionado;
  //   const NombreTipoFuentePago = req.body.NombreTipoFuentePago;
  //   //const IdEntePublicoObligado = req.body.IdEntePublicoObligado;
  //   //const IdFondoIngreso = req.body.IdFondoIngreso;
  //   const PorcentajeOriginalIngreso = req.body.PorcentajeOriginalIngreso;
  //   const PorcentajeOriginalEquivalencia = req.body.PorcentajeOriginalEquivalencia;
  //   if (
  //     (IdFuentePago == null || /^[\s]*$/.test(IdFuentePago)) && IdFuentePago.length <= 36
  //   ) {
  //     return res.status(409).send({
  //       error: "Ingrese Id usuario válido.",
  //     });
  //   } else {
  //     db.query(
  //       `CALL sp_ModificaAsignacionOriginalTipoSolicitud(?, ?, ?, ?, ?)`,
  //       [
  //         IdFuentePago,
  //         TipoMovRelacionado,
  //         NombreTipoFuentePago,
  //         // IdEntePublicoObligado,
  //         // IdFondoIngreso,
  //         PorcentajeOriginalIngreso,
  //         PorcentajeOriginalEquivalencia,
  //       ],
  //       (err, result) => {

  //         console.log("---", IdFuentePago, TipoMovRelacionado, NombreTipoFuentePago, PorcentajeOriginalIngreso, PorcentajeOriginalEquivalencia);
  //         if (err) {
  //           console.error("ERROR SP:", err);
  //           return res.status(500).send({
  //             error: "Error" + err,
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
  //   }
  // },

  // DETALLE POR ID
  getDetalleAsignacionTipoMovi: (req, res) => {
    const IdFuentePago = req.query.IdFuentePago;

    if (IdFuentePago == null || /^[\s]*$/.test(IdFuentePago)) {
      return res.status(409).send({
        error: "Ingrese el Id de la Fuente de Pago.",
      });
    }

    db.query(
      `CALL sp_DetalleAsignacionTipoMovSolicitudes('${IdFuentePago}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error en el SP",
          });
        }

        // Verificar que result[0] y result[0][0] existen
        if (result && result[0] && result[0].length > 0) {
          const data = result[0];

          // Si lo que viene es un mensaje, lo mandamos como error
          if (data[0].Mensaje) {
            return res.status(409).send({
              mensaje: data[0].Mensaje,
            });
          }

          // Si son registros, los enviamos
          return res.status(200).send({
            data,
          });
        } else {
          // Haz esto:
          return res.status(200).send({
            data: [],
            message:
              "La fuente de pago seleccionada no tiene asignacion a ninguna solicitud!",
          });
        }
      }
    );
  },

  //hay que crear un sp para modificar las asignaciones en las columans de porcentajes en utilizacion
  //de todos los registros que tengan la misma fuente de pago en las demas solicitudes asignadas

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
