import nodemailer from "nodemailer";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";

dotenv.config();

const sendMail = async (
  to: string,
  subject: string,
  template: string,
  context: object
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve("./src/views/"),
      layoutsDir: path.resolve("./src/views/"),
      defaultLayout: "",
    },
    viewPath: path.resolve("./src/views/"),
    extName: ".hbs",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: subject,
    template,
    context: context,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    } else {
      console.info("Email sent: " + info.response);
    }
  });
};

export default sendMail;
