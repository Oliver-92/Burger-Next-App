import { NextResponse } from "next/server";
import { LOCATIONS } from "@/lib/data/locations";

export async function GET() {
    return NextResponse.json(LOCATIONS);
}
