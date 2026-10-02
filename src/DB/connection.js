import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUrl = process.env.URL_DB || "mongodb://127.0.0.1:27017/My-App";

  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected Successfully");
  });

  mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error:", error.message);
  });

  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.log("Error Connected DB:", error.message);
  }
};