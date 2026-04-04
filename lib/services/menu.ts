import { createClient } from "@/lib/supabase/server";
import { mapBadge } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * Fetches the full menu directly from Supabase.
 * This avoids internal fetch calls to localhost:3000 during build time.
 */
export async function getMenuItems(): Promise<Product[]> {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            *,
            categories (
                slug
            )
        `);

    if (error) {
        console.error("Error fetching menu items from Supabase:", error);
        return [];
    }

    const mappedProducts = (products || []).map((p: any) => ({
        ...p,
        category: p.categories?.slug || "all",
        badge: mapBadge(p.badge),
    }));

    return mappedProducts as Product[];
}
