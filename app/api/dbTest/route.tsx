import { connectMongoDB } from "@/dbConnet";
import { NextResponse } from "next/server";

// This is a test route to check if the database is connected

export const GET = async () => {
  try {
    await connectMongoDB();
    return new NextResponse(
      JSON.stringify({ message: "Successfully connected to MongoDB" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new NextResponse("Failed to connect to MongoDB: " + error, {
      status: 500,
    });
  }
};
