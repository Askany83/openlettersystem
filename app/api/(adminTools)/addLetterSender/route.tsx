import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/dbConnet";
import LetterSender from "@/models/letterSender";

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

    const { name, surname } = data;

    // console.log("Received data:", { name, surname });

    if (!name || !surname) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const letterSenderData = {
      name,
      surname,
    };

    await connectMongoDB();

    await LetterSender.create(letterSenderData);

    return NextResponse.json(
      { message: "Letter Sender created!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error occurred while creating Letter Sender",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
