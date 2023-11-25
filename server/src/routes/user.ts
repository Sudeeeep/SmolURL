import express from "express";
import { createUser, getUser } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/:userId", getUser);

export default userRouter;
