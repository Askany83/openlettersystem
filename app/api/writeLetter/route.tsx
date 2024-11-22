import OpenLetter from "@/models/openLetter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const letterData = await req.json();
    console.log(letterData);

    const { title, message, letterSenderId, letterReceiverId } = letterData;

    const newLetter = new OpenLetter({
      title,
      message,
      letterSender: letterSenderId,
      letterReceiver: letterReceiverId,
    });

    await newLetter.save();

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing letter submission:", error);
    return NextResponse.json(
      { error: "Failed to process letter" },
      { status: 500 }
    );
  }
}
