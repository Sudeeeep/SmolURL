import express from "express";
import "dotenv/config";
import urlRouter from "./routes/url";
import { connectDb } from "./services/connectDb";
import userRouter from "./routes/user";
import bodyParser from "body-parser";
import loginRouter from "./routes/login";

const app = express();

connectDb();

app.use(bodyParser.json());

app.use(urlRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
