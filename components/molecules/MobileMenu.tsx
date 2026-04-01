"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

export function MobileMenu() {
    const [user, setUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    async function handleSignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
        closeMenu();
        router.push("/");
        router.refresh();
    }

    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center size-10 rounded-full bg-surface-dark border border-surface-border text-white hover:text-primary transition-all active:scale-95 shadow-lg"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
            >
                <Icon name={isOpen ? "close" : "menu"} size="md" />
            </button>

            {/* Overlay Menu */}
            <div
                className={cn(
                    "fixed inset-0 z-60 bg-background-dark/98 backdrop-blur-lg transition-all duration-300 ease-in-out lg:hidden flex flex-col items-center pt-18",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                )}
            >
                {/* Close Button Inside Overlay */}
                <button
                    onClick={closeMenu}
                    className="absolute top-6 right-6 flex items-center justify-center size-12 rounded-full bg-surface-dark border border-surface-border text-white hover:text-primary transition-all active:scale-95 shadow-xl"
                    aria-label="Cerrar menú"
                >
                    <Icon name="close" size="lg" />
                </button>

                {/* Nav Links */}
                <nav className="flex flex-col items-center gap-10 w-full bg-background-dark/98">
                    {/* Branding at bottom */}
                    <div className="flex flex-col items-center gap-3 opacity-80">
                        <div className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                            <Icon name="lunch_dining" size="md" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-widest uppercase">BurgerBrand</span>
                    </div>
                    <Link
                        href="/menu"
                        onClick={closeMenu}
                        className="text-4xl font-bold text-white hover:text-primary transition-all hover:scale-110 active:scale-95"
                    >
                        Menú
                    </Link>
                    <Link
                        href="/ubicaciones"
                        onClick={closeMenu}
                        className="text-4xl font-bold text-white hover:text-primary transition-all hover:scale-110 active:scale-95"
                    >
                        Ubicaciones
                    </Link>
                    <Link
                        href="/nosotros"
                        onClick={closeMenu}
                        className="text-4xl font-bold text-white hover:text-primary transition-all hover:scale-110 active:scale-95"
                    >
                        Nosotros
                    </Link>

                    {/* Extra mobile-only action */}
                    {user ? (
                        <div className="flex flex-col items-center gap-6 mt-4">
                            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface-dark border border-surface-border">
                                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold">
                                    {user.email?.charAt(0).toUpperCase() ?? "U"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-text-secondary text-xs">{user.email}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="px-12 py-4 border-2 border-primary text-primary font-bold text-xl rounded-full transition-all hover:bg-primary hover:text-background-dark active:scale-95"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            onClick={closeMenu}
                            className="mt-6 mb-6 px-12 py-4 bg-primary text-background-dark font-bold text-xl rounded-full transition-all hover:brightness-110 active:scale-95 shadow-[0_0_30px_rgba(54,226,123,0.5)]"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
}
