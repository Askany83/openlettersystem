import { connectMongoDB } from "@/dbConnet";

export const test = async () => {
  await connectMongoDB();
};
