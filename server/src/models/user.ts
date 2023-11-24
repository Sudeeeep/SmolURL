import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [5, "password should be at least 5 characters long"],
  },
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Urls",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString();

    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

export const User = mongoose.model("User", userSchema);
