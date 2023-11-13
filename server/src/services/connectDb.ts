import mongoose from "mongoose";

export function connectDb() {
  try {
    mongoose.connect(process.env.MONGODB_URL as string);
    console.log("successfully connected to DB");
  } catch (err) {
    console.log("Error while connecting to database", err);
  }
}
