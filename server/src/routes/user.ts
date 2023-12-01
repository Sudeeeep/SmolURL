import express from "express";
import { createUser, getUser } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/userDetails", getUser);

export default userRouter;
