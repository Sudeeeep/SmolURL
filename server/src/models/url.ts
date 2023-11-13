import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    counter: {
      type: Number,
      required: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortUrlId: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Urls = mongoose.model("Url", urlSchema);
