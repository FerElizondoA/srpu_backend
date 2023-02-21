const db = require("../config/db.js");

module.exports = {
  //CREAR
  createUsuario: (req, res) => {
    
    const IdUsuarioCreador = req.body.CreadoPor;
    const IdUsuarioCentral = req.body.IdUsuarioCentral;
    const Cargo = req.body.Cargo;
    const Correo  = req.body.Correo;
    const IdRol = req.body.IdRol;
    if (IdUsuarioCreador == null ||/^[\s]*$/.test(IdUsuarioCreador)) {
      return res.status(409).send({
        error: "Ingrese IdUsuarioCreador",
      });
    } 
    if (IdUsuarioCentral == null ||/^[\s]*$/.test(IdUsuarioCentral)) {
      return res.status(409).send({
        error: "Ingrese IdUsuarioCentral",
      });
    } 
    if (Cargo == null ||/^[\s]*$/.test(Cargo)) {
      return res.status(409).send({
        error: "Ingrese Cargo",
      });
    } 
    if (Correo == null ||/^[\s]*$/.test(Correo)) {
      return res.status(409).send({
        error: "Ingrese Correo",
      });
    } 
    if (IdRol == null ||/^[\s]*$/.test(IdRol)) {
      return res.status(409).send({
        error: "Ingrese IdRol",
      });
    } 
      db.query(
        `CALL sp_NuevoUsuario('${CreadoPor}', '${IdUsuarioCentral}''${Cargo}','${Correo}','${IdRol}', )`,
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

//   //LISTADO COMPLETO
//   getUsuario: (req, res) => {
//     db.query(`CALL sp_ListadoUsuarios()`, (err, result) => {
//       if (err) {
//         return res.status(500).send({
//           error: "Error",
//         });
//       }

//       if (result.length) {
//         const data = result[0];
//         return res.status(200).send({
//           data,
//         });
//       } else {
//         return res.status(409).send({
//           error: "¡Sin Información!",
//         });
//       }
//     });
//   },

  // DETALLE POR ID
  getDetailUsuario: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(
      `CALL sp_DetalleUsuario('${IdUsuario}')`,
      (err, result) => {
        console.log(err);
        if (err) {
          return res.status(500).send({
            error: "Error",
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
  },

//   //MODIFICA POR ID
//   modifyUsuario: (req, res) => {
//     const IdUsuario = req.body.IdUsuario;
//     const NuevoUsuario = req.body.NuevoUsuario;
//     const IdUsuarioModificador = req.body.ModificadoPor;

//     if (
//       IdUsuario == null ||
//       /^[\s]*$/.test(IdUsuario)
//     ) {
//       return res.status(409).send({
//         error: "Ingrese Id",
//       });
//     }

//     if (
//       NuevoUsuario == null ||
//       /^[\s]*$/.test(NuevoUsuario)
//     ) {
//       return res.status(409).send({
//         error: "Ingrese Nuevo Usuario",
//       });
//     } else {
//       db.query(
//         `CALL sp_ModificaUsuario('${IdUsuario}','${NuevoUsuario}','${IdUsuarioModificador}')`,
//         (err, result) => {
//           if (err) {
//             return res.status(500).send({
//               error: "Error",
//             });
//           }
//           if (result.length) {
//             const data = result[0][0];
//             if (data.error) {
//               return res.status(409).send({
//                 result: data,
//               });
//             }
//             return res.status(200).send({
//               result: data,
//             });
//           } else {
//             return res.status(409).send({
//               error: "¡Sin Información!",
//             });
//           }
//         }
//       );
//     }
//   },

};
