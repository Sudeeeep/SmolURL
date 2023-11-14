import { Request, Response } from "express";
import { Urls } from "../models/url";
import { generateBase62Hash } from "../utils/generateBase62Hash";

export const shortenUrl = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const [lastAddedDoc] = await Urls.find({}, { counter: true }) // get the last added document
    .sort({ counter: -1 })
    .limit(1);

  const counter = lastAddedDoc?.counter || 0; //get counter from last added document
  const shortUrlId = generateBase62Hash(counter + 1);
  const DoctoAdd = new Urls({
    counter: counter + 1,
    longUrl: body.url,
    shortUrlId,
  });

  try {
    await DoctoAdd.save();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json(err.message);
    }
  }
  return res.json(DoctoAdd);
};

export const handleFavIcon = (_: Request, res: Response) => {
  return res.status(404);
};

export const getLongUrl = async (req: Request, res: Response) => {
  const shortUrlId = req.params.shortUrlId;

  const requiredUrlData = await Urls.findOneAndUpdate(
    { shortUrlId },
    { $inc: { clicks: 1 } }
  );

  if (!requiredUrlData) {
    return res.status(400).json({ err: "Invalid Short URL ID" });
  }

  return res.redirect(301, requiredUrlData.longUrl);
};