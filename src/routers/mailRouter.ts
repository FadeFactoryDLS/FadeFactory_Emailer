import { Request, Response, Router } from "express";
import Email from "../models/emailModel.js";
import sendMail from "../services/mailService.js";
import basicHttpAuthentication from "../middleware/authenticate.js";
const router: Router = Router();

router.post(
  "/promotion",
  basicHttpAuthentication,
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

router.post(
  "/reminder",
  basicHttpAuthentication,
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

export default router;
