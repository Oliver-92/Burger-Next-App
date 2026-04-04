import { createClient } from "@/lib/supabase/server";
import { mapBadge } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * Fetches all featured products from Supabase.
 * This avoids internal fetch calls to localhost:3000 during build time.
 */
export async function getProducts(): Promise<Product[]> {
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
        console.error("Error fetching featured products from Supabase:", error);
        return [];
    }

    const mappedProducts = (products || []).map((p: any) => ({
        ...p,
        category: p.categories?.slug || "all",
        badge: mapBadge(p.badge),
        price: Number(p.price), // Ensure price is a number
    }));

    return mappedProducts as Product[];
}

/**
 * Fetches a single product by ID from Supabase, including its extras and removables.
 * This avoids internal fetch calls to localhost:3000 during build time.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
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
        if (error) console.error(`Error fetching product ${id} from Supabase:`, error);
        return undefined;
    }

    // Map nested data to match the Product interface
    const mappedProduct = {
        ...product,
        price: Number(product.price), // Ensure price is a number
        category: product.categories?.slug || "all",
        badge: mapBadge(product.badge),
        // Flatten nested results from join tables
        // Using the same join names as in the select
        extras: (product.product_extras || [])
            .map((pe: any) => pe.extras)
            .filter((e: any) => e !== null)
            .map((e: any) => ({
                ...e,
                price: Number(e.price) // Ensure extra price is a number
            })),
        removables: (product.product_removables || [])
            .map((pr: any) => pr.removables?.name)
            .filter((name: any) => name !== undefined)
    };

    return mappedProduct as Product;
}
