import { Request, Response } from "express";
import { Urls } from "../models/url";
import { generateBase62Hash } from "../utils/generateBase62Hash";
import { isUrlValid } from "../utils/isUrlValid";
import { checkProtocol } from "../utils/checkProtocol";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const shortenUrl = async (req: Request, res: Response) => {
  let { url, userType } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  url = checkProtocol(url);

  if (!isUrlValid(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const [lastAddedDoc] = await Urls.find({}, { counter: true }) // get the last added document
    .sort({ counter: -1 })
    .limit(1);

  const counter = lastAddedDoc?.counter || 0; //get counter from last added document
  const shortUrlId = generateBase62Hash(counter + 1);

  console.log(userType);

  if (userType === "guest") {
    const DoctoAdd = new Urls({
      counter: counter + 1,
      longUrl: url,
      shortUrlId,
    });

    let savedUrl;
    try {
      savedUrl = await DoctoAdd.save();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json(err.message);
      }
    }
    return res.json(savedUrl);
  }

  let token;
  const authorizationHeader = req.get("authorization");

  console.log(authorizationHeader && authorizationHeader.startsWith("Bearer "));

  authorizationHeader && authorizationHeader.startsWith("Bearer ")
    ? (token = authorizationHeader.replace("Bearer ", ""))
    : (token = null);

  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "token not found" });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY as string) as JWTPayload;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "token is not a valid JWT token" });
  }

  if (!payload.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const DoctoAdd = new Urls({
    counter: counter + 1,
    longUrl: url,
    shortUrlId,
    user: payload.id,
  });

  let savedUrl;
  try {
    savedUrl = await DoctoAdd.save();
    const user = await User.findById(payload.id);

    if (user) {
      user.urls = user.urls.concat(savedUrl.id);
      await user.save();
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json(err.message);
    }
  }
  return res.json(savedUrl);
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
