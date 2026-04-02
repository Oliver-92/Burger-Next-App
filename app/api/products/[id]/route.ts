import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mapBadge } from "@/lib/utils";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: product, error } = await supabase
        .from("products")
        .select(`
            *,
            categories (
                slug
            ),
            product_extras (
                extras (*)
            ),
            product_removables (
                removables (*)
            )
        `)
        .eq("id", id)
        .single();

    if (error || !product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const mappedProduct = {
        ...product,
        category: product.categories?.slug || "all",
        badge: mapBadge(product.badge),
        extras: product.product_extras?.map((pe: any) => pe.extras).filter(Boolean) || [],
        removables: product.product_removables?.map((pr: any) => pr.removables?.name).filter(Boolean) || [],
    };

    return NextResponse.json(mappedProduct);
}
