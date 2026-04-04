"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CartItem } from "@/lib/types";

export async function createInitialOrder(items: CartItem[], total: number) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Usuario no autenticado" };
    }

    if (items.length === 0) {
        return { success: false, error: "El carrito está vacío" };
    }

    try {
        // 1. Create the order in 'pending' status
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert({
                user_id: user.id,
                status: "pending",
                total: total,
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create order items (Snapshots)
        for (const item of items) {
            const { data: orderItem, error: itemError } = await supabase
                .from("order_items")
                .insert({
                    order_id: order.id,
                    product_name: item.product.name,
                    product_price: item.product.price,
                    quantity: item.quantity,
                    notes: item.notes || "",
                })
                .select()
                .single();

            if (itemError) throw itemError;

            // 3. Create snapshots for extras
            if (item.selectedExtras.length > 0) {
                const extrasToInsert = item.selectedExtras.map((extra) => ({
                    order_item_id: orderItem.id,
                    extra_name: extra.name,
                    extra_price: extra.price,
                }));
                await supabase.from("order_item_extras").insert(extrasToInsert);
            }

            // 4. Create snapshots for removables
            if (item.removedIngredients.length > 0) {
                const removablesToInsert = item.removedIngredients.map((name) => ({
                    order_item_id: orderItem.id,
                    removable_name: name,
                }));
                await supabase.from("order_item_removables").insert(removablesToInsert);
            }
        }

        return { success: true, orderId: order.id };
    } catch (error: any) {
        console.error("Error creating order:", error);
        return { success: false, error: error.message || "Error al crear la orden" };
    }
}
