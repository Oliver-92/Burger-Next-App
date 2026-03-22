"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { useCartStore } from "@/lib/store/useCart";
import { useHydrated } from "@/lib/hooks/useHydrated";

export function NavActions() {
    const { data: session } = useSession();
    const totalItems = useCartStore((state) => state.totalItems);
    const hydrated = useHydrated();

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
            {session ? (
                <div className="hidden md:flex items-center gap-3">
                    {/* User avatar initials */}
                    <div
                        className="size-9 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center text-sm font-bold text-primary"
                        title={session.user?.email ?? ""}
                    >
                        {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
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
