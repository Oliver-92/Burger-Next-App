import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}
