import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mailRouter from "./routers/mailRouter.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/send-mail", mailRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Email Service API is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
