import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/dbConnet";
import LetterReceiver from "@/models/letterReceiver";

export async function POST(req: NextRequest) {
  try {
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid request body", error: (error as Error).message },
        { status: 400 }
      );
    }

    const { name, surname, job } = data;

    // console.log("Received data:", { name, surname, job });

    if (!name || !surname || !job) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const letterReceiverData = {
      name,
      surname,
      job,
    };

    await connectMongoDB();

    await LetterReceiver.create(letterReceiverData);

    return NextResponse.json(
      { message: "Letter Receiver created!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error occurred while creating Letter Receiver",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
