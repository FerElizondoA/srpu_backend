const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const db = require("../config/db.js");
const headerFolder = "controllers/templates/header.html";
const footerFolder = "controllers/templates/footer.html";
const templateSolicitudCorto = "controllers/templates/template_corto.html";
const templateRequerimientos =
  "controllers/templates/template_requerimientos.html";
const templateConstancia = "controllers/templates/template_constancia.html";
const templateAcuseEnviado =
  "controllers/templates/template_acuse_envio_solicitud.html";
const templateAcuseRespuesta =
  "controllers/templates/template_acuse_envio_respuesta.html";
const templateCancelacion =
  "controllers/templates/template_cancelacion_credito.html";
const templateAnulacion =
  "controllers/templates/template_anular_cancelacion.html";
const templateAcuseCancelacion =
  "controllers/templates/template_acuse_envio_respuesta.html";
const templateAcuse = "controllers/templates/template_acuse.html";
const templateConstanciaReestructura =
  "controllers/templates/template_constancia_reestructuracion.html"; //#requerimiento reestructura
const templateContestacionReestructura =
  "controllers/templates/template_contestacion_reestructura.html";
const templateInscripcionReestructura = 
  "controllers/templates/template_inscripcion_reestructura.html";


//#region HEADER

const headerTemplate = fs.readFileSync(headerFolder, "utf8");
var header = headerTemplate;

function callHeader() {
  db.query(`CALL sp_DetalleHeader()`, (err, result) => {
    const data = result[0][0];

    const headerImg = (logoTesoreria, escudo) => {
      const resLogoTesoreria = fs.readFileSync(logoTesoreria);
      const resEescudo = fs.readFileSync(escudo);

      header = headerTemplate
        .replaceAll("{{headerText}}", data.Descripcion)
        .replaceAll(
          "{{logoTesoreria}}",
          `data:image/${path
            .extname(logoTesoreria)
            .split(".")
            .pop()};base64,${Buffer.from(resLogoTesoreria, "binary").toString(
            "base64"
          )}`
        )
        .replaceAll(
          "{{escudo}}",
          `data:image/${path
            .extname(escudo)
            .split(".")
            .pop()};base64,${Buffer.from(resEescudo, "binary").toString(
            "base64"
          )}`
        );
    };

    headerImg(
      "controllers/stylessheet/images/logoTesoreria.png",
      "controllers/stylessheet/images/escudo.png"
    );
  });
}
//#endregion

//#region FOOTER

const footerTemplate = fs.readFileSync(footerFolder, "utf8");

var footer = footerTemplate;

const footerImg = (logoLeon) => {
  const resLogoLeon = fs.readFileSync(logoLeon);
  footer = footerTemplate.replaceAll(
    "{{logoLeon}}",
    `data:image/${path.extname(logoLeon).split(".").pop()};base64,${Buffer.from(
      resLogoLeon,
      "binary"
    ).toString("base64")}`
  );
};

footerImg("controllers/stylessheet/images/logoLeon.png");
//#endregion

module.exports = {

  createPdfSolicitudInscripcionReestructura: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateInscripcionReestructura, "utf8");

    const {
      oficioNum, // YAA
      directorGeneral,// YAA
      cargoDirectorGeneral,// YAA
      servidorPublico,// YAA
      cargoServidorPublico,// YAA
      organismoServidorPublico,// YAA
      claveInscripcion,
      institucionFinanciera,// YAA
      fechaContratacionSolicitud,// YAA
      fechaContratacionReestructura,// YAA
      montoOriginalContratado,// YAA
      obligadoSolidarioAval,
      entePublicoObligado,
      destino,// YAA
      plazo,// YAA
      periodoFinanciamiento,// YAA res
      periodoAdministracion,// YAA res
      saldoVigente,// YAA res
      tasaInteres,// YAA
      comisiones,// YAA
      gastosAdicionales,// YAA
      tasaEfectiva,// YAA
      fuentePago,// YAA
      anexosClausulas, //YAA res
      reglas,
      documentos,
    } = req.body;



    const rowsAnexosClausulas = JSON.parse(anexosClausulas).map(record => `
      <tr>
        <th style="font-family: Arial; font-size: 12px; border: 1px solid black; text-align: center;">${record.ClausulaOriginal.Descripcion}</th>
        <th style="font-family: Arial; font-size: 12px; border: 1px solid black; text-align: center;">${record.ClausulaModificada.Descripcion}</th>
        <th style="font-family: Arial; font-size: 12px; border: 1px solid black; text-align: center;">${record.Modificacion}</th>
      </tr>
    `).join('');

    const declaratorias =
      '<p style=" font-family: Arial; font-size: 12px; font-weight: 100; text-align: justify; letter-spacing: 1px; ">' +
      JSON.parse(reglas).map((val) => {
        return "<br />" + val;
      }) +
      "</p>";

    const docs =
      '<p style=" font-family: Arial; font-size: 12px; font-weight: 100; text-align: justify; letter-spacing: 1px; ">' +
      JSON.parse(documentos).map((val) => {
        return " " + val.descripcionTipo;
      }) +
      "</p>";

    const html = htmlTemplate
      .replaceAll("{{oficioNum}}", oficioNum)
      .replaceAll("{{directorGeneral}}", directorGeneral)
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral)
      .replaceAll("{{servidorPublico}}", servidorPublico)
      .replaceAll("{{cargoServidorPublico}}", cargoServidorPublico)
      .replaceAll("{{organismoServidorPublico}}", organismoServidorPublico)
      .replaceAll("{{claveInscripcion}}", claveInscripcion)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{fechaContratacionSolicitud}}", fechaContratacionSolicitud)
      .replaceAll("{{fechaContratacionReestructura}}", fechaContratacionReestructura)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{obligadoSolidarioAval}}", obligadoSolidarioAval)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{destino}}", destino)
      .replaceAll("{{plazo}}", plazo)
      .replaceAll("{{periodoFinanciamiento}}", periodoFinanciamiento)
      .replaceAll("{{periodoAdministracion}}", periodoAdministracion)
      .replaceAll("{{saldoVigente}}", saldoVigente)
      .replaceAll("{{tasaInteres}}", tasaInteres)
      .replaceAll("{{comisiones}}", comisiones || "")
      .replaceAll("{{gastosAdicionales}}", gastosAdicionales)
      .replaceAll("{{tasaEfectiva}}", tasaEfectiva)
      .replaceAll("{{fuentePago}}", fuentePago)
      .replaceAll("{{anexosClausulas}}", rowsAnexosClausulas)
      .replaceAll("{{reglas}}", declaratorias)
      .replaceAll("{{documentos}}", docs);

    const watermarkText = `DDPYPF-${oficioNum}/${fechaContratacionSolicitud}`;

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    await page.evaluate((watermarkText) => {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.opacity = 0.2;
      div.style.top = 300;
      div.style.bottom = 0;
      div.style.left = 300;
      div.style.width = "100%";
      div.style.height = "100%";
      div.style.textAlign = "center";
      div.style.fontSize = "48px";
      div.style.color = "k";
      div.style.transform = "rotate(-45deg)";
      div.style.transformOrigin = "50% 50%";
      div.textContent = `${watermarkText}`;
      document.body.appendChild(div);
    }, watermarkText);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
      l: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioNum}-${fechaContratacionReestructura}.pdf`
    );
    res.send(pdfBuffer);
  },


  createPdfSolicitudCorto: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateSolicitudCorto, "utf8");

    const {
      oficioNum,
      directorGeneral,
      cargoDirectorGeneral,
      servidorPublico,
      cargoServidorPublico,
      organismoServidorPublico,
      institucionFinanciera,
      fechaContratacion,
      montoOriginalContratado,
      entePublicoObligado,
      destino,
      plazo,
      tasaInteres,
      comisiones,
      gastosAdicionales,
      tasaEfectiva,
      mecanismoVehiculoDePago,
      fuentePago,
      garantiaDePago,
      reglas,
      documentos,
    } = req.body;

    const declaratorias =
      '<p style=" font-family: Arial; font-size: 12px; font-weight: 100; text-align: justify; letter-spacing: 1px; ">' +
      JSON.parse(reglas).map((val) => {
        return "<br />" + val;
      }) +
      "</p>";

    const docs =
      '<p style=" font-family: Arial; font-size: 12px; font-weight: 100; text-align: justify; letter-spacing: 1px; ">' +
      JSON.parse(documentos).map((val) => {
        return " " + val.descripcionTipo;
      }) +
      "</p>";

    const html = htmlTemplate
      .replaceAll("{{oficioNum}}", oficioNum)
      .replaceAll("{{directorGeneral}}", directorGeneral)
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral)
      .replaceAll("{{servidorPublico}}", servidorPublico)
      .replaceAll("{{cargoServidorPublico}}", cargoServidorPublico)
      .replaceAll("{{organismoServidorPublico}}", organismoServidorPublico)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{destino}}", destino)
      .replaceAll("{{plazo}}", plazo)
      .replaceAll("{{tasaInteres}}", tasaInteres)
      .replaceAll("{{comisiones}}", comisiones || "")
      .replaceAll("{{gastosAdicionales}}", gastosAdicionales)
      .replaceAll("{{tasaEfectiva}}", tasaEfectiva)
      .replaceAll("{{mecanismoVehiculoDePago}}", mecanismoVehiculoDePago)
      .replaceAll("{{fuentePago}}", fuentePago)
      .replaceAll("{{garantiaDePago}}", garantiaDePago)
      .replaceAll("{{reglas}}", declaratorias)
      .replaceAll("{{documentos}}", docs);

    const watermarkText = `DDPYPF-${oficioNum}/${fechaContratacion}`;

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    await page.evaluate((watermarkText) => {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.opacity = 0.2;
      div.style.top = 300;
      div.style.bottom = 0;
      div.style.left = 300;
      div.style.width = "100%";
      div.style.height = "100%";
      div.style.textAlign = "center";
      div.style.fontSize = "48px";
      div.style.color = "k";
      div.style.transform = "rotate(-45deg)";
      div.style.transformOrigin = "50% 50%";
      div.textContent = `${watermarkText}`;
      document.body.appendChild(div);
    }, watermarkText);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
      l: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioNum}-${fechaContratacion}.pdf`
    );
    res.send(pdfBuffer);
  },

  

  createPdfRequerimientos: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateRequerimientos, "utf8");

    const {
      oficioRequerimiento,
      servidorPublico,
      cargo,
      organismo,
      oficioSolicitud,
      fechaSolicitud,
      fechaContratacion,
      entePublicoObligado,
      institucionFinanciera,
      montoOriginalContratado,
      comentarios,
      directorGeneral,
      cargoDirectorGeneral,
    } = req.body;

    const coments =
      '<table id="data-table" style=" border-collapse: collapse; font-family: Arial; font-size: 12px; text-align: justify; font-weight: 100; letter-spacing: 1px;"><tbody>' +
      Object.keys(JSON.parse(comentarios)).map((val) => {
        return (
          '<tr> <td style="width: 15%; vertical-align: -webkit-baseline-middle">' +
          val +
          '</td> <td style="width: 5%; vertical-align: -webkit-baseline-middle"></td><td style="width: 40%; vertical-align: -webkit-baseline-middle">' +
          JSON.parse(comentarios)[val] +
          "</td> </tr>"
        );
      }) +
      "</tbody> </table>";

    const html = htmlTemplate
      .replaceAll("{{oficioRequerimiento}}", oficioRequerimiento)
      .replaceAll("{{servidorPublico}}", servidorPublico)
      .replaceAll("{{cargo}}", cargo)
      .replaceAll("{{organismo}}", organismo)
      .replaceAll("{{oficioSolicitud}}", oficioSolicitud)
      .replaceAll("{{fechaSolicitud}}", fechaSolicitud)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{directorGeneral}}", directorGeneral)
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral)
      .replaceAll("{{comentarios}}", coments);

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioRequerimiento - fechaContratacion}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfConstancia: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateConstancia, "utf8");

    const {
      oficioConstancia,
      servidorPublico,
      cargo,
      organismo,
      oficioSolicitud,
      fechaSolicitud,
      tipoDocumento,
      fechaContratacion,
      claveInscripcion,
      fechaClave,
      entePublicoObligado,
      obligadoSolidarioAval,
      institucionFinanciera,
      montoOriginalContratado,
      destino,
      plazo,
      amortizaciones,
      tasaInteres,
      tasaEfectiva,
      mecanismoVehiculoDePago,
      fuentePago,
      garantiaDePago,
      instrumentoDerivado,
      financiamientosARefinanciar,
      directorGeneral,
      cargoDirectorGeneral,
    } = req.body;

    const html = htmlTemplate
      .replaceAll("{{oficioConstancia}}", oficioConstancia)
      .replaceAll("{{servidorPublico}}", servidorPublico)
      .replaceAll("{{cargo}}", cargo)
      .replaceAll("{{organismo}}", organismo)
      .replaceAll("{{oficioSolicitud}}", oficioSolicitud)
      .replaceAll("{{fechaSolicitud}}", fechaSolicitud)
      .replaceAll("{{tipoDocumento}}", tipoDocumento)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{claveInscripcion}}", claveInscripcion)
      .replaceAll("{{fechaClave}}", fechaClave)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{obligadoSolidarioAval}}", obligadoSolidarioAval)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{destino}}", destino)
      .replaceAll("{{plazo}}", plazo)
      .replaceAll("{{amortizaciones}}", amortizaciones)
      .replaceAll("{{tasaInteres}}", tasaInteres)
      .replaceAll("{{tasaEfectiva}}", tasaEfectiva)
      .replaceAll("{{mecanismoVehiculoDePago}}", mecanismoVehiculoDePago)
      .replaceAll("{{fuentePago}}", fuentePago)
      .replaceAll("{{garantiaDePago}}", garantiaDePago)
      .replaceAll("{{instrumentoDerivado}}", instrumentoDerivado)
      .replaceAll(
        "{{financiamientosARefinanciar}}",
        financiamientosARefinanciar
      )
      .replaceAll("{{directorGeneral}}", directorGeneral)
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral);

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioConstancia}-${fechaContratacion}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfAcuseEnviado: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateAcuseEnviado, "utf8");

    const { oficioConstancia, fecha, hora, tipoSolicitud } = req.body;

    const html = htmlTemplate
      .replaceAll("{{oficioConstancia}}", oficioConstancia || "'No. Oficio'")
      .replaceAll("{{fecha}}", fecha || "'fecha de entrega'")
      .replaceAll("{{hora}}", hora || "'hora de entrega'")
      .replaceAll("{{tipoSolicitud}}", tipoSolicitud || "'Tipo de Solicitud'");

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioConstancia}-${fecha}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfFormatoReesctructura: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateAcuseProvisionalReestructura, "utf8");

    const { tipoSolicitud, oficioConstancia, fecha, hora } =
      req.body;

    const html = htmlTemplate
      .replaceAll("{{tipoSolicitud}}", tipoSolicitud || "'Tipo de solicitud'")
      .replaceAll("{{oficioConstancia}}", oficioConstancia || "'No. Oficio'")
      .replaceAll("{{fecha}}", fecha || "'fecha de entrega'")
      .replaceAll("{{hora}}", hora || "'hora de entrega'")
     // .replaceAll("{{fraccionTexto}}", fraccionTexto || "");
    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioConstancia}-${fecha}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfAcuseRespuesta: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateAcuseRespuesta, "utf8");

    const { tipoSolicitud, oficioConstancia, fecha, hora, fraccionTexto } =
      req.body;

    const html = htmlTemplate
      .replaceAll("{{tipoSolicitud}}", tipoSolicitud || "'Tipo de solicitud'")
      .replaceAll("{{oficioConstancia}}", oficioConstancia || "'No. Oficio'")
      .replaceAll("{{fecha}}", fecha || "'fecha de entrega'")
      .replaceAll("{{hora}}", hora || "'hora de entrega'")
      .replaceAll("{{fraccionTexto}}", fraccionTexto || "");
    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioConstancia}-${fecha}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfAcuseCancelacion: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateAcuseCancelacion, "utf8");

    const { tipoSolicitud, oficioConstancia, fecha, hora, fraccionTexto } =
      req.body;

    const html = htmlTemplate
      .replaceAll("{{tipoSolicitud}}", tipoSolicitud || "'Tipo de solicitud'")
      .replaceAll("{{oficioConstancia}}", oficioConstancia || "'No. Oficio'")
      .replaceAll("{{fecha}}", fecha || "'fecha de entrega'")
      .replaceAll("{{hora}}", hora || "'hora de entrega'")
      .replaceAll("{{fraccionTexto}}", fraccionTexto || "");
    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioConstancia}-${fecha}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfAcuse: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(templateAcuse, "utf8");

    const { titulo, oficio, mensaje } = req.body;

    const html = htmlTemplate
      .replaceAll("{{titulo}}", titulo || " ")
      .replaceAll("{{mensaje}}", mensaje || " ")
      .replaceAll("{{oficio}}", oficio || " ");
    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficio}-${
        new Date().toLocaleString("es-MX").split(" ")[0]
      }.pdf`
    );
    res.send(pdfBuffer);
  },

  actualizaDescarga: async (req, res) => {
    const { IdPath } = req.body;

    db.query(`CALL sp_ActualizaDescarga('${IdPath}' )`, (err, result) => {
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

  createPdfSolicitudCancelacion: async (req, res) => {
    callHeader();

    const footerTemplate = fs.readFileSync(footerFolder, "utf8");

    var footer = footerTemplate;

    const footerImg = (logoLeon) => {
      const resLogoLeon = fs.readFileSync(logoLeon);

      footer = footerTemplate.replaceAll(
        "{{logoLeon}}",
        `data:image/${path
          .extname(logoLeon)
          .split(".")
          .pop()};base64,${Buffer.from(resLogoLeon, "binary").toString(
          "base64"
        )}`
      );
    };

    footerImg("controllers/stylessheet/images/logoLeon.png");
    //#endregion

    const htmlTemplate = fs.readFileSync(templateCancelacion, "utf8");

    const {
      numeroSolicitud,
      UsuarioDestinatario,
      EntidadDestinatario,
      UsuarioRemitente,
      EntidadRemitente,
      claveInscripcion,
      fechaInscripcion,
      fechaLiquidacion,
      entePublicoObligado,
      institucionFinanciera,
      montoOriginalContratado,
      fechaContratacion,
      causaCancelacion,
      documentoAcreditacionCancelacion,
      documentoBajaCreditoFederal,
    } = req.body;

    const html = htmlTemplate
      .replaceAll("{{numeroSolicitud}}", numeroSolicitud)
      .replaceAll("{{UsuarioDestinatario}}", UsuarioDestinatario)
      .replaceAll("{{EntidadDestinatario}}", EntidadDestinatario)
      .replaceAll("{{UsuarioRemitente}}", UsuarioRemitente)
      .replaceAll("{{EntidadRemitente}}", EntidadRemitente)
      .replaceAll("{{claveInscripcion}}", claveInscripcion)
      .replaceAll("{{fechaInscripcion}}", fechaInscripcion)
      .replaceAll("{{fechaLiquidacion}}", fechaLiquidacion)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{causaCancelacion}}", causaCancelacion)
      .replaceAll(
        "{{documentoAcreditacionCancelacion}}",
        documentoAcreditacionCancelacion
      )
      .replaceAll(
        "{{documentoBajaCreditoFederal}}",
        documentoBajaCreditoFederal
      );

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${numeroSolicitud}-${fechaContratacion}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfSolicitudAnulacion: async (req, res) => {
    callHeader();

    const footerTemplate = fs.readFileSync(footerFolder, "utf8");

    var footer = footerTemplate;

    const footerImg = (logoLeon) => {
      const resLogoLeon = fs.readFileSync(logoLeon);

      footer = footerTemplate.replaceAll(
        "{{logoLeon}}",
        `data:image/${path
          .extname(logoLeon)
          .split(".")
          .pop()};base64,${Buffer.from(resLogoLeon, "binary").toString(
          "base64"
        )}`
      );
    };

    footerImg("controllers/stylessheet/images/logoLeon.png");
    //#endregion

    const htmlTemplate = fs.readFileSync(templateAnulacion, "utf8");

    const {
      numeroSolicitud,
      UsuarioDestinatario,
      EntidadDestinatario,
      UsuarioRemitente,
      EntidadRemitente,
      claveInscripcion,
      fechaInscripcion,
      fechaLiquidacion,
      entePublicoObligado,
      institucionFinanciera,
      montoOriginalContratado,
      fechaContratacion,
      causaAnulacion,
    } = req.body;

    const html = htmlTemplate
      .replaceAll("{{numeroSolicitud}}", numeroSolicitud)
      .replaceAll("{{UsuarioDestinatario}}", UsuarioDestinatario)
      .replaceAll("{{EntidadDestinatario}}", EntidadDestinatario)
      .replaceAll("{{UsuarioRemitente}}", UsuarioRemitente)
      .replaceAll("{{EntidadRemitente}}", EntidadRemitente)
      .replaceAll("{{claveInscripcion}}", claveInscripcion)
      .replaceAll("{{fechaInscripcion}}", fechaInscripcion)
      .replaceAll("{{fechaLiquidacion}}", fechaLiquidacion)
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado)
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera)
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado)
      .replaceAll("{{fechaContratacion}}", fechaContratacion)
      .replaceAll("{{causaAnulacion}}", causaAnulacion);

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${numeroSolicitud}-${fechaContratacion}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfConstanciaReestructura: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(
      templateConstanciaReestructura,
      "utf8"
    );

    const {
      oficioNum, //CONSTANCIA YA
      servidorPublico,//YA
      claseTitulo,
      cargo,//YA
      organismo,//YA
      oficioSolicitud,//YA 
      fechaSolicitud,//YA

      tipoDocumento, //YA
      fechaContratacion,//YA
      claveInscripcion,//YA
      fechaClave,//YA
      
      fechaReestructuracion,//YA
      entePublicoObligado, //YA
      institucionFinanciera, //YA
      obligadoSolidarioAval,
      
      montoOriginalContratado,//YA
      saldoVigente,//ya
      mecanismoVehiculoDePago,//ya
      fuentePago,//ya
      plazo,
      autoriazcionReestructura,
      periodicidad,
      comentarios,
      directorGeneral,//ya
      cargoDirectorGeneral,//ya
      modificaciones,
    } = req.body;

    const tablaModificaciones = modificaciones
      ? '<table id="data-table" style=" border-collapse: collapse; font-family: Arial; font-size: 12px; text-align: justify; font-weight: 100; letter-spacing: 1px;"><tbody>' +
        Object.keys(JSON.parse(modificaciones)).map((val) => {
          return (
            '<tr> <td style="width: 15%; vertical-align: -webkit-baseline-middle">' +
            val +
            '</td> <td style=" font-family: Arial; width: 5%; vertical-align: -webkit-baseline-middle"></td><td style="width: 40%; vertical-align: -webkit-baseline-middle">' +
            JSON.parse(modificaciones)[val] +
            "</td> </tr>"
          );
        }) +
        "</tbody> </table>"
      : "";

    const html = htmlTemplate
      .replaceAll("{{oficioNum}}", oficioNum || "")
      .replaceAll("{{servidorPublico}}", servidorPublico || "")

      .replaceAll("{{claseTitulo}}", claseTitulo || "")

      .replaceAll("{{cargo}}", cargo || "")
      .replaceAll("{{organismo}}", organismo || "")
      .replaceAll("{{oficioSolicitud}}", oficioSolicitud || "")
      .replaceAll("{{fechaSolicitud}}", fechaSolicitud || "")
      .replaceAll("{{tipoDocumento}}", tipoDocumento || "")
      .replaceAll("{{fechaContratacion}}", fechaContratacion || "")
      .replaceAll("{{claveInscripcion}}", claveInscripcion || "")
      .replaceAll("{{fechaClave}}", fechaClave || "")
      .replaceAll("{{fechaReestructuracion}}", fechaReestructuracion || "")
      .replaceAll("{{entePublicoObligado}}", entePublicoObligado || "")
      .replaceAll("{{obligadoSolidarioAval}}", obligadoSolidarioAval || "")
      .replaceAll("{{institucionFinanciera}}", institucionFinanciera || "")
      .replaceAll("{{montoOriginalContratado}}", montoOriginalContratado || "")
      .replaceAll("{{saldoVigente}}", saldoVigente || "")
      .replaceAll("{{mecanismoVehiculoDePago}}", mecanismoVehiculoDePago || "")
      .replaceAll("{{fuentePago}}", fuentePago || "")

      .replaceAll("{{plazo}}", plazo || "")
      .replaceAll("{{autoriazcionReestructura}}", autoriazcionReestructura || "")
      .replaceAll("{{periodicidad}}", periodicidad || "")

      .replaceAll("{{comentarios}}", comentarios || "")
      
      .replaceAll("{{directorGeneral}}", directorGeneral || "")
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral || "")
      .replaceAll("{{tablaModificaciones}}", tablaModificaciones || "");

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioNum}-${fechaContratacion}.pdf`
    );
    res.send(pdfBuffer);
  },

  createPdfContestacionReestructura: async (req, res) => {
    callHeader();
    const htmlTemplate = fs.readFileSync(
      templateContestacionReestructura,
      "utf8"
    );

    const {
      oficioNum,
      servidorPublico,
      cargo,
      fechaSolicitud,
      fechaRecepcion,
      claseTitulo,
      fechaContratacion,
      noInscripcionEstatal,
      acreditado,
      acreditante,
      monto,
      // modificaciones,
      directorGeneral,
      cargoDirectorGeneral,
      mecanismoVehiculoDePago,
      fuentePago,
      anexosClausulas,
    } = req.body;

    const rowsAnexosClausulas = JSON.parse(anexosClausulas).map(record => `
      <tr>
        <th style="font-family: Arial; font-size: 12px; border: 1px solid black; text-align: center;">${record.ClausulaOriginal.Descripcion}</th>
        <th style="font-family: Arial; font-size: 12px; border: 1px solid black; text-align: center;">${record.ClausulaModificada.Descripcion}</th>
        <th style="font-family: Arial; font-size: 12px; border: 1px solid black; text-align: center;">${record.Modificacion}</th>
      </tr>
    `).join('');

    const html = htmlTemplate
      .replaceAll("{{servidorPublico}}", servidorPublico || "")
      .replaceAll("{{cargo}}", cargo || "")
      .replaceAll("{{fechaSolicitud}}", fechaSolicitud || "")
      .replaceAll("{{fechaRecepcion}}", fechaRecepcion || "")
      .replaceAll("{{claseTitulo}}", claseTitulo || "")
      .replaceAll("{{fechaContratacion}}", fechaContratacion || "")
      .replaceAll("{{noInscripcionEstatal}}", noInscripcionEstatal || "")
      .replaceAll("{{acreditado}}", acreditado || "")
      .replaceAll("{{acreditante}}", acreditante || "")
      .replaceAll("{{monto}}", monto || "")
      .replaceAll("{{directorGeneral}}", directorGeneral || "")
      .replaceAll("{{cargoDirectorGeneral}}", cargoDirectorGeneral || "")
      .replaceAll("{{mecanismoVehiculoDePago}}", mecanismoVehiculoDePago || "")
      .replaceAll("{{fuentePago}}", fuentePago || "")
      .replaceAll("{{anexosClausulas}}", rowsAnexosClausulas || "");


    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = ${oficioNum}-${fechaContratacion}.pdf`
    );
    res.send(pdfBuffer);
  },
};
