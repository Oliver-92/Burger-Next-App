"use client";

import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";

export function NavActions() {
    return (
        <div className="flex items-center justify-end gap-3">
            {/* Search */}
            <Button variant="icon" aria-label="Buscar">
                <Icon name="search" size="md" />
            </Button>

            {/* Cart */}
            <button
                className="relative flex size-10 items-center justify-center rounded-full bg-primary text-background-dark font-bold hover:opacity-90 transition-colors shadow-[0_0_15px_rgba(54,226,123,0.3)] cursor-pointer"
                aria-label="Carrito de compras"
            >
                <Icon name="shopping_cart" size="md" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-background-dark">
                    3
                </span>
            </button>

            {/* Login */}
            <Button variant="ghost" className="flex items-center">
                Login
            </Button>
        </div>
    );
}
