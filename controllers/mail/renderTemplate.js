const fs = require("fs");
const path = require("path");

module.exports = (templateName, data) => {
  const templatePath = path.join(
    __dirname,
    "templates",
    `${templateName}.html`
  );

  let html = fs.readFileSync(templatePath, "utf8");

  Object.keys(data).forEach((key) => {
    html = html.replaceAll(`{{${key}}}`, data[key] ?? "");
  });

  return html;
};