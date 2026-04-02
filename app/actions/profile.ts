"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type ActionState = {
    success: boolean;
    message: string;
};

import { type ProfileFormData, profileSchema } from "@/lib/schemas/profile";

export async function saveProfile(
    data: ProfileFormData
): Promise<ActionState> {
    const supabase = await createClient();

    // ── 1. Verificar sesión ───────────────────────────────────────────────────
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect("/login");
    }

    const result = profileSchema.safeParse(data);

    if (!result.success) {
        const firstIssue = result.error.issues[0];
        return { success: false, message: firstIssue.message };
    }

    const { error: dbError } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        ...result.data,
    });
    
    if (dbError) {
        return {
            success: false,
            message: "No se pudieron guardar los datos. Intenta nuevamente.",
        };
    }

    revalidatePath("/perfil");

    return { success: true, message: "Perfil guardado exitosamente." };
}
