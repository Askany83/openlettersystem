import { NextRequest, NextResponse } from "next/server";
import openLetter from "@/models/openLetter";

export async function PATCH(req: NextRequest) {
  try {
    console.log("on EditLetter api route");
    const parsedUrl = new URL(req.url, "http://localhost:3000/");
    const letterId = parsedUrl.searchParams.get("letterId");
    console.log("letterId in edit:", letterId);

    if (!letterId) {
      return new NextResponse("Letter ID is required", { status: 400 });
    }

    const requestBody = await req.json();
    const { title, message } = requestBody;

    // Assuming the message is base64 encoded and needs to be decoded before saving
    const decodedMessage = atob(message.split(",")[1]);
    const updatedLetter = await openLetter.findByIdAndUpdate(
      letterId,
      { title, message: decodedMessage },
      { new: true }
    );

    if (!updatedLetter) {
      return new NextResponse("Letter not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedLetter), { status: 200 });
  } catch (error) {
    console.error("Error updating letter:", error);
    return new NextResponse("Error updating letter", { status: 500 });
  }
}
