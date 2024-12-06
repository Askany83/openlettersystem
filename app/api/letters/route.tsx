import { connectMongoDB } from "@/dbConnet";
import { NextRequest, NextResponse } from "next/server";
import OpenLetter from "@/models/openLetter";

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();
    console.log("on get letters api route");
    const parsedUrl = new URL(req.url, "http://localhost:3000/");
    const letterReceiverId = parsedUrl.searchParams.get("receiverId");
    console.log("letterReceiverId xY:", letterReceiverId);

    const lettersForReceiver = await OpenLetter.find({
      letterReceiver: letterReceiverId,
    });
    return new NextResponse(JSON.stringify(lettersForReceiver), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting letters:", error);
    return new NextResponse("Error getting letters:", { status: 500 });
  }
};
