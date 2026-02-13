var nodemailer = require("nodemailer");
const db = require("../../config/db.js");
const renderTemplate = require("./renderTemplate"); // ✅ IMPORTANTE

module.exports = {

sendEmail: async (payload) => {
  const { usuarios, template, subject, data } = payload;

  // if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
  //   console.log("No hay usuarios para enviar correo");
  //   return;
  // }

  const transporter = nodemailer.createTransport({
    host: process.env.SRPU_B_APP_EMAIL_HOST,
    port: process.env.SRPU_B_APP_EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.SRPU_B_APP_EMAIL_USERNAME,
      pass: process.env.SRPU_B_APP_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // 🔥 Generamos placeholders dinámicos (?, ?, ?)
  const placeholders = usuarios.map(() => "?").join(",");

  const query = `
    SELECT CorreoElectronico 
    FROM TiCentral.Usuarios 
    WHERE Id IN (${placeholders})
  `;

  const [rows] = await db.promise().query(query, usuarios);

  if (!rows.length) {
    console.log("No se encontraron correos electrónicos");
    return;
  }

  const emails = rows.map((r) => r.CorreoElectronico).join(",");

  const html = renderTemplate(template, data);

  await transporter.sendMail({
    from: process.env.SRPU_B_APP_EMAIL_ADDRESS,
    to: emails,
    subject,
    html,
  });

  console.log("Correo enviado correctamente a:", emails);
},
}
  // sendEmail: async (payload) => {
  //   const { usuarios, template, subject, data } = payload;

  //   const transporter = nodemailer.createTransport({
  //     host: process.env.SRPU_B_APP_EMAIL_HOST,
  //     port: process.env.SRPU_B_APP_EMAIL_PORT,
  //     secure: true,
  //     auth: {
  //       user: process.env.SRPU_B_APP_EMAIL_USERNAME,
  //       pass: process.env.SRPU_B_APP_EMAIL_PASSWORD,
  //     },
  //     tls: {
  //       rejectUnauthorized: false,
  //     },
  //   });

  //   const [rows] = await db
  //     .promise()
  //     .query(
  //       `SELECT CorreoElectronico FROM TiCentral.Usuarios WHERE FIND_IN_SET(Id, ?)`,
  //       [usuarios]
  //     );

  //   const emails = rows.map((r) => r.CorreoElectronico).join(";");

  //   // ✅ aquí ya funciona
  //   const html = renderTemplate(template, data);

  //   await transporter.sendMail({
  //     from: process.env.SRPU_B_APP_EMAIL_ADDRESS,
  //     to: emails,
  //     subject,
  //     html,
  //   });
  // },


// var nodemailer = require("nodemailer");

// const db = require("../../config/db.js");
// const template_New_Correo = "controllers/templates/template_New_Correo.html";

// module.exports = {
//   sendEmail: async (req, res) => {
//     // let { usuarios, titulo, asunto, plantilla } = req;
//     let {
//       usuarios,
//       titulo,
//       asunto,
//       plantilla,
//       nombre,
//       mensaje,
//       usuario,
//       NumRegistroSolicitud,
//     } = req;

//     var transporter = nodemailer.createTransport({
//       host: process.env.SRPU_B_APP_EMAIL_HOST,
//       port: process.env.SRPU_B_APP_EMAIL_PORT,
//       secure: true,
//       auth: {
//         user: process.env.SRPU_B_APP_EMAIL_USERNAME, // enter your email address
//         pass: process.env.SRPU_B_APP_EMAIL_PASSWORD, // enter your visible/encripted password
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     const [rows] = await db
//       .promise()
//       .query(
//         `SELECT CorreoElectronico FROM TiCentral.Usuarios WHERE FIND_IN_SET(Id, ?)`,
//         [usuarios]
//       );

//     const emails = rows.map((r) => r.CorreoElectronico).join(";");

//     const html = renderTemplate(template_New_Correo, data);

//     await transporter.sendMail({
//       from: process.env.SRPU_B_APP_EMAIL_ADDRESS,
//       to: emails,
//       subject,
//       html,
//     });

//     // function getCorreo() {
//     //   return new Promise((resolve, reject) => {
//     //     let emails = "";
//     //     let mock = "";
//     //     db.query(
//     //       `CALL sp_DetalleCorreos('${usuarios}', '${plantilla}')`,
//     //       (err, result) => {
//     //         console.log("err", err);
//     //         console.log("result", result);

//     //         mock = result[1][0].body;
//     //         result[0].map(({ CorreoElectronico }) => {
//     //           if (emails !== "") {
//     //             return (emails = emails + "; " + CorreoElectronico);
//     //           } else {
//     //             return (emails = CorreoElectronico);
//     //           }
//     //         });
//     //         resolve({ emails: emails, plantilla: mock });
//     //       }
//     //     );
//     //   });
//     // }

//     // getCorreo().then((r) => {
//     //   transporter.sendMail({
//     //     from: process.env.SRPU_B_APP_EMAIL_ADDRESS,
//     //     to: r.emails, //"japerez@cecapmex.com; prpardo@cecapmex.com"
//     //     subject: titulo,
//     //     text: asunto,
//     //     html: r.plantilla
//     //       .replaceAll("{{Titulo}}", titulo)
//     //       .replaceAll("{{Asunto}}", asunto)
//     //       .replaceAll("{{Nombre}}", nombre)
//     //       .replaceAll("{{Mensaje}}", mensaje)
//     //       .replaceAll("{{Usuario}}", usuario)
//     //       .replaceAll("{{Contrasena}}", NumRegistroSolicitud)
//     //       .replaceAll("{{LoginUrl}}", process.env.LOGIN_B_APP_FRONT),
//     //   });
//     // });
//   },
// };
