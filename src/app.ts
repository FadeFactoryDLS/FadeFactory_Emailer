import express, { Express, Request, Response } from "express";
import { sendMail } from "./services/mailService";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-mail/promotion", async (req: Request, res: Response) => {
  const to: string = req.body.email;
  const subject: string = req.body.subject;
  const mailTemplate: string = "Promotion mail placeholder";

  sendMail(to, subject, mailTemplate);

  res.sendStatus(200);
});

app.post("/send-mail/reminder", async (req: Request, res: Response) => {
  const to: string = req.body.email;
  const subject: string = req.body.subject;
  const mailTemplate: string = "Reminder mail placeholder";

  sendMail(to, subject, mailTemplate);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
