import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { ProfileForm } from "@/components/organisms/ProfileForm";
import { Icon } from "@/components/atoms/Icon";
import type { Metadata } from "next";
import type { UserProfile } from "@/lib/types";

export const metadata: Metadata = {
    title: "Mi Perfil — BurgerBrand | Sabor Urbano Real",
    description: "Completa tus datos personales para una experiencia personalizada en BurgerBrand.",
};

export default async function ProfilePage() {
    const supabase = await createClient();

    // ── Guardia de sesión ──────────────────────────────────────────────────────
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // ── Cargar perfil existente (si ya completó sus datos antes) ──────────────
    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <>

            <main className="min-h-[calc(100vh-140px)] bg-background-dark px-4 md:px-10 lg:px-40 py-12 md:py-20">
                <div className="max-w-2xl mx-auto">

                    {/* Page header */}
                    <div className="flex flex-col gap-3 mb-10">
                        <div className="inline-flex items-center gap-2 self-start bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                            <Icon name="person" size="sm" className="text-primary" />
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                Mi Cuenta
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Datos personales
                        </h1>
                        <p className="text-text-secondary text-sm md:text-base">
                            Completá tu perfil para que tus pedidos lleguen más rápido y sin errores.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-surface-border bg-surface-dark shadow-[0_0_60px_rgba(54,226,123,0.06)] overflow-hidden">

                        {/* Card header */}
                        <div className="flex items-center gap-4 px-8 py-6 border-b border-surface-border bg-background-dark/40">
                            <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Icon name="badge" size="lg" className="text-primary" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">
                                    {profile?.first_name && profile?.last_name
                                        ? `${profile.first_name} ${profile.last_name}`
                                        : "Usuario BurgerBrand"}
                                </p>
                                <p className="text-text-secondary text-xs">{user.email}</p>
                            </div>
                        </div>

                        {/* Form body */}
                        <div className="px-8 py-8">
                            <ProfileForm
                                email={user.email ?? ""}
                                existingProfile={profile as UserProfile | null}
                            />
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
