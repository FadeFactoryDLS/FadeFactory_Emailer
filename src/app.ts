import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
