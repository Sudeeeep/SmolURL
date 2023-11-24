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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

urlSchema.set("toJSON", {
  transform(_, ret) {
    ret.id = ret._id.toString();

    delete ret._id;
    delete ret.__v;
  },
});

export const Urls = mongoose.model("Url", urlSchema);
