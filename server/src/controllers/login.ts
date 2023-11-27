import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "email or password is missing",
    });
  }

  const user = await User.findOne({ email });

  const isPasswordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.password);

  if (!user || !isPasswordCorrect) {
    return res.status(401).json({
      error: "invalid email or password",
    });
  }

  const userPayload = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(userPayload, process.env.SECRET_KEY as string, {
    expiresIn: 60 * 60,
  });

  return res.status(200).json({ email: user.email, token });
};
