"use server";

import { createClient } from "@/lib/supabase/server";
import { simulatePaymentResult } from "@/lib/payment";
import { revalidatePath } from "next/cache";

export async function executePayment(orderId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Usuario no autenticado" };
    }

    try {
        // 1. Update status to 'processing'
        const { error: procError, data: procData } = await supabase
            .from("orders")
            .update({ status: "processing" })
            .eq("id", orderId)
            .select();

        if (procError) throw procError;
        if (!procData || procData.length === 0) {
            throw new Error("No se encontró la orden para actualizar a 'processing'");
        }

        // 2. Simulate payment (Wait 2-3s + Randomize)
        const result = await simulatePaymentResult();

        // 3. Update status to final result
        const { error: updateError, data: updateData } = await supabase
            .from("orders")
            .update({ status: result })
            .eq("id", orderId)
            .select();

        if (updateError) throw updateError;
        if (!updateData || updateData.length === 0) {
            throw new Error(`No se pudo actualizar la orden al estado final: ${result}`);
        }

        // 4. Special handling for success: Clear DB Cart
        if (result === "paid") {
            const { data: cart } = await supabase
                .from("carts")
                .select("id")
                .eq("user_id", user.id)
                .eq("status", "active")
                .maybeSingle();

            if (cart) {
                await supabase.from("cart_items").delete().eq("cart_id", cart.id);
            }
        }

        // Revalidate relevant paths
        revalidatePath("/perfil");
        revalidatePath("/admin/pedidos"); // Assuming there's an admin page for orders

        return { success: true, status: result };
    } catch (error: any) {
        console.error("Error processing payment:", error);
        return { success: false, error: error.message || "Error al procesar el pago" };
    }
}
