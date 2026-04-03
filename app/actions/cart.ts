"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CartItem, Product, Extra } from "@/lib/types";

/**
 * Fetches the active cart for the current user, including all items and their customizations.
 */
export async function getUserCart(): Promise<CartItem[]> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    // 1. Get active cart
    const { data: cart, error: cartError } = await supabase
        .from("carts")
        .select(`
            id,
            cart_items (
                id,
                quantity,
                notes,
                products (
                    *,
                    categories (slug)
                ),
                cart_item_extras (
                    extras (*)
                ),
                cart_item_removables (
                    removables (*)
                )
            )
        `)
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();

    if (cartError || !cart) return [];

    // 2. Map DB structure to Frontend CartItem
    return (cart.cart_items || []).map((item: any) => ({
        id: item.id, // DB UUID
        quantity: item.quantity,
        notes: item.notes,
        product: {
            ...item.products,
            category: item.products.categories?.slug || "all",
        } as Product,
        selectedExtras: (item.cart_item_extras || []).map((e: any) => e.extras) as Extra[],
        removedIngredients: (item.cart_item_removables || []).map((r: any) => r.removables.name) as string[],
    }));
}

/**
 * Synchronizes the local cart state with the database.
 * Replaces old active cart content with current frontend state.
 */
export async function syncUserCart(items: CartItem[]) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "No authenticated user" };

    // 1. Ensure an active cart exists
    let { data: cart } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();

    if (!cart) {
        const { data: newCart, error: createError } = await supabase
            .from("carts")
            .insert({ user_id: user.id, status: "active" })
            .select()
            .single();

        if (createError) return { success: false, error: createError.message };
        cart = newCart;
    }
    if (!cart) return { success: false, error: "Unable to find or create cart" };

    const cartId = cart.id;

    // 2. Clear old items (Cascading delete handles extras/removables if configured, 
    // but we'll do it manually to be safe if cascade is not set)
    // Assuming Cascade Delete is set up for cart_items -> extras/removables in Supabase.
    await supabase.from("cart_items").delete().eq("cart_id", cartId);

    // 3. Insert new items
    for (const item of items) {
        const { data: insertedItem, error: itemError } = await supabase
            .from("cart_items")
            .insert({
                cart_id: cartId,
                product_id: item.product.id,
                quantity: item.quantity,
                notes: item.notes || "",
            })
            .select()
            .single();

        if (itemError) continue;

        // Insert Extras
        if (item.selectedExtras.length > 0) {
            const extrasToInsert = item.selectedExtras.map((e) => ({
                cart_item_id: insertedItem.id,
                extra_id: e.id,
            }));
            await supabase.from("cart_item_extras").insert(extrasToInsert);
        }

        // Insert Removables
        if (item.removedIngredients.length > 0) {
            // We need to fetch the ID of the removable by its name for this product
            const { data: removables } = await supabase
                .from("removables")
                .select("id")
                .in("name", item.removedIngredients);

            if (removables && removables.length > 0) {
                const removablesToInsert = removables.map((r) => ({
                    cart_item_id: insertedItem.id,
                    removable_id: r.id,
                }));
                await supabase.from("cart_item_removables").insert(removablesToInsert);
            }
        }
    }

    return { success: true };
}
