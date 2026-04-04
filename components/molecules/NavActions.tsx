"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/atoms/Icon";
import { useCartStore } from "@/lib/store/useCart";
import { useHydrated } from "@/lib/hooks/useHydrated";
import type { User } from "@supabase/supabase-js";

export function NavActions() {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<"admin" | "user" | null>(null);
    const router = useRouter();
    const totalItems = useCartStore((state) => state.totalItems);
    const hydrated = useHydrated();

    useEffect(() => {
        const supabase = createClient();

        async function fetchRole(userId: string) {
            const { data, error } = await supabase
                .from("users")
                .select("role")
                .eq("id", userId)
                .single();
            if (!error && data) {
                setRole(data.role as "admin" | "user");
            }
        }

        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            if (data.user) fetchRole(data.user.id);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            const newUser = session?.user ?? null;
            setUser(newUser);
            if (newUser) {
                fetchRole(newUser.id);
            } else {
                setRole(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    async function handleSignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    }

    return (
        <div className="flex items-center justify-end gap-3">

            {/* Cart */}
            <button
                onClick={() => useCartStore.getState().setIsOpen(true)}
                className="relative flex size-10 items-center justify-center rounded-full bg-primary text-background-dark font-bold hover:opacity-90 transition-colors shadow-[0_0_15px_rgba(54,226,123,0.3)] cursor-pointer"
                aria-label="Carrito de compras"
            >
                <Icon name="shopping_cart" size="md" />
                {hydrated && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-background-dark">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Auth action */}
            {user ? (
                <div className="hidden md:flex items-center gap-3">
                    {/* User avatar initials */}
                    <Link
                        href={role === "admin" ? "/admin" : "/profile"}
                        className="size-9 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center text-sm font-bold text-primary hover:border-primary transition-colors cursor-pointer"
                        title={user.email ?? ""}
                    >
                        {user.email?.charAt(0).toUpperCase() ?? "U"}
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="text-sm font-semibold text-text-secondary hover:text-white transition-colors cursor-pointer"
                    >
                        <Icon name="logout" size="md" />
                    </button>
                </div>
            ) : (
                <Link
                    href="/login"
                    className="hidden lg:flex items-center text-sm font-semibold text-text-secondary hover:text-white transition-colors"
                >
                    Login
                </Link>
            )}
        </div>
    );
}
