import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email or password is missing" });
  }

  if (password.length < 5) {
    return res
      .status(400)
      .json({
        error: "PasswordValidation",
        message: "Password should be at least 5 characters long",
      });
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
    return res.status(400).json(err);
  }

  return res.status(201).json(savedUser);
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "user ID is required" });
  }

  let user;
  try {
    user = await User.findById(userId).populate(
      "urls",
      "longUrl shortUrlId clicks createdAt updatedAt"
    );
  } catch (err) {
    return res.send(err);
  }

  if (!user) {
    console.log("user not found");
    console.log(user);

    return res.status(404).json({ error: "User not found" });
  } else {
    console.log(user);
    return res.status(200).json(user);
  }
};
