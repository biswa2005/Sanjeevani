import mongoose from "mongoose";
import { config } from "dotenv";

config();

export default async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
};
