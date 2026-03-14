import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data";

export async function GET() {
    const featuredProducts = PRODUCTS.filter((p) => p.featured);
    return NextResponse.json(featuredProducts);
}
