import { Request, Response, Router } from "express";
import Email, { isEmailModel } from "../models/emailModel.js";
import sendMail from "../services/mailService.js";
import basicHttpAuthentication from "../middleware/authenticate.js";
const router: Router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *      Email:
 *          type: object
 *          properties:
 *              emailAddress:
 *                  type: string
 *              name:
 *                  type: string
 *              subject:
 *                  type: string
 *              message:
 *                  type: string
 *          required:
 *              - emailAddress
 *              - name
 *              - subject
 *              - message
 *  securitySchemes:
 *     basicAuth:
 *      type: http
 *      scheme: basic
 *
 * tags:
 *  -name: Email
 */

/**
 * @openapi
 * /send-mail/promotion:
 *  post:
 *      tags:
 *          - Email
 *      summary: Send email to user in 'promotion' template
 *      description: Send email to user in 'promotion' template
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Email'
 *      responses:
 *          "200":
 *              description: Email sent successfully
 *          "401":
 *              description: Unauthorized
 *          "500":
 *              description: Internal Server Error
 *      security:
 *         - basicAuth: []
 */
router.post(
  "/promotion",
  basicHttpAuthentication,
  async (req: Request, res: Response) => {
    try {
      const emailData: Email = req.body;
      isEmailModel(emailData);

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
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

/**
 * @openapi
 * /send-mail/reminder:
 *  post:
 *      tags:
 *          - Email
 *      summary: Send email to user in 'reminder' template
 *      description: Send email to user in 'reminder' template
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Email'
 *      responses:
 *          "200":
 *              description: Email sent successfully
 *          "401":
 *              description: Unauthorized
 *          "500":
 *              description: Internal Server Error
 *      security:
 *         - basicAuth: []
 */
router.post(
  "/reminder",
  basicHttpAuthentication,
  async (req: Request, res: Response) => {
    try {
      const emailData: Email = req.body;
      isEmailModel(emailData);

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
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

export default router;
