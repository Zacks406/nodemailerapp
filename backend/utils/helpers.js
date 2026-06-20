const nodemailer = require("nodemailer");
const path = require("path");
const handleBars = require("handlebars");
const fs = require("fs");

const sendMail = (data) => {
  const filePath = path.join(__dirname, "../template/mail.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const html = handleBars.compile(source);
  const replacements = {
    content: data,
  };
  const template = html(replacements);
  return template;
};

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: "587",
  tls: {
    ciphers: "SSLv3",
  },
  secure: false,
  auth: {
    user: process.env.OUTLOOK_MAIL, // email user
    pass: process.env.OUTLOOK_PASSWORD, // email password
  },
});

const html = sendMail(description);

const options = {
  from: process.env.OUTLOOK_MAIL,
  to: emailTo,
  subject,
  html,
};
module.exports = (options) => {
  return transporter.sendMail(options);
};
