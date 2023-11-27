import express from "express";
import { handleLogin } from "../controllers/login";

const loginRouter = express.Router();

loginRouter.post("/", handleLogin);

export default loginRouter;
