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

/**
 * Aggregates dashboard metrics (Revenue, Orders, Users, Products)
 */
export async function getDashboardStats() {
    const supabase = await createClient();

    // 1. Total Revenue (Paid orders)
    const { data: revenueData } = await supabase
        .from("orders")
        .select("total")
        .eq("status", "paid");
    
    const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

    // 2. Total Orders
    const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

    // 3. Total Users
    const { count: usersCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

    // 4. Products Count
    const { count: productsCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

    return {
        totalRevenue,
        ordersCount: ordersCount || 0,
        usersCount: usersCount || 0,
        productsCount: productsCount || 0,
    };
}

/**
 * Fetches full order history for the admin panel using a manual join strategy.
 * This bypasses PGRST200 errors when foreign key constraints are missing in Supabase.
 */
export async function getAdminOrders() {
    const supabase = await createClient();

    // 1. Fetch all orders (no join)
    const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (ordersError) {
        console.error("Error fetching orders:", JSON.stringify(ordersError, null, 2));
        return [];
    }

    if (!orders || orders.length === 0) return [];

    // 2. Collect unique user IDs
    const userIds = Array.from(new Set(orders.map(o => o.user_id)));

    // 3. Fetch corresponding profiles
    const { data: profiles, error: profilesError } = await supabase
        .from("users")
        .select("id, first_name, last_name, email")
        .in("id", userIds);

    if (profilesError) {
        console.error("Error fetching related profiles:", JSON.stringify(profilesError, null, 2));
        // Return orders anyway, maybe without names
        return orders;
    }

    // 4. Manual Join: Attach profile data to orders
    const profilesMap = new Map(profiles.map(p => [p.id, p]));
    
    return orders.map(order => ({
        ...order,
        users: profilesMap.get(order.user_id) || null
    }));
}
