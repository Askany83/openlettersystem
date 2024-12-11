import { NextResponse } from "next/server";
import { connectMongoDB } from "@/dbConnet";
import LetterReceiver from "@/models/letterReceiver";

export const GET = async () => {
  try {
    await connectMongoDB();
    const receivers = await LetterReceiver.find();

    console.log("receivers - back: ", receivers);

    return new NextResponse(JSON.stringify(receivers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching LetterReceivers: " + error, {
      status: 500,
    });
  }
};
