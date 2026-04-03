"use server";

import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "@/lib/types";

/**
 * Fetches all users from the 'users' table.
 * Admin-only security check is already handled by middleware/layout,
 * but can be reinforced here.
 */
export async function getUsers(): Promise<UserProfile[]> {
    const supabase = await createClient();

    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .order("first_name", { ascending: true });

    if (error) {
        console.error("Error fetching admin users:", error);
        return [];
    }

    return (users || []) as UserProfile[];
}

/**
 * Update user role (Bonus action for admin panel)
 */
export async function updateUserRole(userId: string, newRole: "admin" | "user") {
    const supabase = await createClient();

    const { error } = await supabase
        .from("users")
        .update({ role: newRole })
        .eq("id", userId);

    if (error) {
        console.error("Error updating user role:", error);
        return { success: false, message: "No se pudo actualizar el rol." };
    }

    return { success: true, message: "Rol actualizado correctamente." };
}
