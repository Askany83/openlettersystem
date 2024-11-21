/* 
Github does not have the MONGODB_URI, you have to define it in the .env file where the constant is defined when you click on connect in a cluster, just fallow the steps
*/

import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    if (!mongodbURI) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }
    await mongoose.connect(mongodbURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
