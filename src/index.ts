import express from "express";
import "dotenv/config";
import urlRouter from "./routes/url";
import { connectDb } from "./services/connectDb";

const app = express();

connectDb();

app.use(urlRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
