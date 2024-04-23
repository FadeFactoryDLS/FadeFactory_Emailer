import express, { Express, Request, Response } from "express";
import { sendMail } from "./services/mailService";
import dotenv from "dotenv";
import Email from "./models/emailModel";

dotenv.config();

const app: Express = express();
const port = 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-mail/promotion", async (req: Request, res: Response) => {
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
});

app.post("/send-mail/reminder", async (req: Request, res: Response) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
