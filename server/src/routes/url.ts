import bodyParser from "body-parser";
import express from "express";
import { getLongUrl, handleFavIcon, shortenUrl } from "../controllers/url";

const urlRouter = express.Router();

urlRouter.use(bodyParser.json());

urlRouter.post("/url", shortenUrl);
urlRouter.get("/favicon.ico", handleFavIcon);
urlRouter.get("/:shortUrlId", getLongUrl);

export default urlRouter;
