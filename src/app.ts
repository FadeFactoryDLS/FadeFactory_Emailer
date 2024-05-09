import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mailRouter from "./routers/mailRouter.js";
import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import swaggerUI, { SwaggerOptions } from "swagger-ui-express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "FadeFactory Emailer API",
    version: "0.0.1",
    description: "API for sending emails",
  },
  securityDefinitions: {
    basicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  apis: ["./dist/routers/*.js", "./src/routers/*.ts"],
};

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition,
  apis: ["./dist/routers/*.js", "./src/routers/*.ts"],
};

app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerOptions))
);

app.use("/send-mail", mailRouter);

/**
 * @openapi
 * /:
 *  get:
 *    description: Check if the API is running
 *    responses:
 *      200:
 *        description: API is running
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Email Service API is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
