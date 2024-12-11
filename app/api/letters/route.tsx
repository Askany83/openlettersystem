import { connectMongoDB } from "@/dbConnet";
import { NextRequest, NextResponse } from "next/server";
import OpenLetter from "@/models/openLetter";

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();

    const parsedUrl = new URL(req.url, "http://localhost:3000/");
    const letterReceiver = parsedUrl.searchParams.get("receiverId");
    console.log("receiverId - GET:", letterReceiver);

    const lettersForReceiver = await OpenLetter.find({
      letterReceiverId: letterReceiver,
    });
    console.log("lettersForReceiver - GET:", lettersForReceiver.length);
    return new NextResponse(JSON.stringify(lettersForReceiver), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting letters:", error);
    return new NextResponse("Error getting letters:", { status: 500 });
  }
};
