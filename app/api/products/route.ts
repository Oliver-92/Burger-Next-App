import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mapBadge } from "@/lib/utils";

export async function GET() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            *,
            categories (
                slug
            )
        `)
        .eq("featured", true);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mappedProducts = (products || []).map((p: any) => ({
        ...p,
        category: p.categories?.slug || "all",
        badge: mapBadge(p.badge),
    }));

    return NextResponse.json(mappedProducts);
}
