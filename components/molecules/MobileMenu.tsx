"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <div className="lg:hidden">
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
                    <Link
                        href="/login"
                        onClick={closeMenu}
                        className="mt-6 mb-6 px-12 py-4 bg-primary text-background-dark font-bold text-xl rounded-full transition-all hover:brightness-110 active:scale-95 shadow-[0_0_30px_rgba(54,226,123,0.5)]"
                    >
                        Iniciar Sesión
                    </Link>
                </nav>
            </div>
        </div>
    );
}
