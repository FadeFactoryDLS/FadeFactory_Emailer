import express, { Express, Request, Response } from "express";
import { sendMail } from "./services/mailService";
import dotenv from "dotenv";
import Email from "./models/emailModel";
import { BasicStrategy } from "passport-http";
import passport from "passport";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = {
  username: process.env.SIMPLE_LOGIN_USERNAME,
  password: process.env.SIMPLE_LOGIN_PASSWORD,
};

passport.use(
  new BasicStrategy(function (username, password, cb) {
    if (username === user.username && password === user.password) {
      return cb(null, user);
    } else {
      return cb(null, false);
    }
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Email Service API is running!");
});

app.post(
  "/send-mail/promotion",
  passport.authenticate("basic", { session: false }),
  async (req: Request, res: Response) => {
    const emailData: Email = req.body;

    if (emailData) {
      const to: string = emailData.emailAddress;
      const subject: string = emailData.subject;
      const mailTemplate: string = "email_promotion";
      const context: object = {
        name: emailData.name,
        subject: emailData.subject,
        message: emailData.message,
      };

      sendMail(to, subject, mailTemplate, context);

      res.sendStatus(200);
    }
  }
);

app.post(
  "/send-mail/reminder",
  passport.authenticate("basic", { session: false }),
  async (req: Request, res: Response) => {
    const emailData: Email = req.body;

    if (emailData) {
      const to: string = emailData.emailAddress;
      const subject: string = emailData.subject;
      const mailTemplate: string = "email_reminder";
      const context: object = {
        name: emailData.name,
        subject: emailData.subject,
        message: emailData.message,
      };

      sendMail(to, subject, mailTemplate, context);

      res.sendStatus(200);
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
