import { NextResponse } from "next/server";
import { ABOUT_CONTENT } from "@/lib/data/about";

export async function GET() {
    return NextResponse.json(ABOUT_CONTENT);
}
