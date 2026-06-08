const db = require("../config/db.js");

module.exports = {
  sumaPorcentajeAcumulado: (req, res) => {
    const { tabla } = req.query;

    db.query(`CALL sp_SumaPorcentajeAcumulado('${tabla}')`, (err, result) => {
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
    });
  },
  listaMecanismosDePago: (req, res) => {
    const { tabla } = req.query;

    db.query(`CALL sp_ListaMecanismosDePago('${tabla}')`, (err, result) => {
      if (err) {
        console.log("ERROR LISTADO SP:", err);
        return res.status(500).send({ error: "Error" });
      }

      if (result && result.length > 0) {
        const data = Array.isArray(result[0]) ? result[0] : result; 

        if (data.length === 0) {
          return res.status(404).send({ error: "¡Sin Información!" });
        }

        if (data[0] && data[0].error) {
          return res.status(409).send({ result: data });
        }

        return res.status(200).send({ data });
      }

      return res.status(404).send({ error: "¡Sin Información!" });
    });
  },

  // listaMecanismosDePago: (req, res) => {
  //   const { tabla } = req.query;

  //   db.query(`CALL sp_ListaMecanismosDePago('${tabla}')`, (err, result) => {
  //       console.log("RAW RESULT ===>", JSON.stringify(result, null, 2));

  //      console.log("ERROR LISTADO SP:", err);
  //     if (err) {
  //       console.log("ERROR LISTADO SP:", err);
  //       return res.status(500).send({
  //         error: "Error",
  //       });
  //     }
  //     if (result.length) {
  //       const data = result[0];
  //       if (data.error) {
  //         return res.status(409).send({
  //           result: data,
  //         });
  //       }
  //       return res.status(200).send({
  //         data,
  //       });
  //     } else {
  //       return res.status(409).send({
  //         error: "¡Sin Información!",
  //       });
  //     }
  //   });
  // },
};
