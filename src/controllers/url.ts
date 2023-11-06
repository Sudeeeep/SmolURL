import { Request, Response } from "express";

export const shortenUrl = (req: Request, res: Response) => {
  const body = req.body;
  if (!body) {
    res.status(400).json({ error: "url is required" });
  }
  console.log(body);
  res.json(body);
};
