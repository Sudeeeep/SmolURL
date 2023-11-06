import bodyParser from "body-parser";
import express from "express";
import { shortenUrl } from "../controllers/url";

const urlRouter = express.Router();

urlRouter.use(bodyParser.json());

urlRouter.post("/url", shortenUrl);

export default urlRouter;
