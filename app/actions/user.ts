"use server";

import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "@/lib/types";

/**
 * Fetches the profile of the currently authenticated user.
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error("Error fetching current user profile:", error);
        return null;
    }

    return profile as UserProfile;
}
