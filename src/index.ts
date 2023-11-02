import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("REQUEST SUCCESS");
});

app.listen(3000, () => {
  console.log("Server started");
});
