import openLetter from "@/models/openLetter";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    console.log("on deleteLetter api route");
    const parsedUrl = new URL(req.url, "http://localhost:3000/");
    const letterId = parsedUrl.searchParams.get("letterId");
    console.log("letterId in delete:", letterId);

    if (!letterId) {
      return new NextResponse("Letter ID is required", { status: 400 });
    }

    const deletedLetter = await openLetter.findByIdAndDelete(letterId);

    if (!deletedLetter) {
      return new NextResponse("Letter not found", { status: 404 });
    }

    return new NextResponse("Letter deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting letter:", error);
    return new NextResponse("Error deleting letter", { status: 500 });
  }
}
