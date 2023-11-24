import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email or password is missing" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: passwordHash,
  });

  let savedUser;
  try {
    savedUser = await user.save();
  } catch (err) {
    return res.json({ err: "Error occured when creating user" });
  }

  return res.status(201).json(savedUser);
};
