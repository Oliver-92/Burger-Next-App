"use client";

import { useCartStore } from "@/lib/store/useCart";
import { useHydrated } from "@/lib/hooks/useHydrated";

export function FloatingCart() {
    const totalItems = useCartStore((state) => state.totalItems);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const hydrated = useHydrated();

    if (!hydrated || totalItems === 0) return null;

    const formattedTotal = `$${totalPrice.toFixed(2)}`;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:hidden z-50">
            <button
                onClick={() => useCartStore.getState().setIsOpen(true)}
                className="flex w-full items-center justify-between overflow-hidden rounded-full h-14 px-6 bg-primary text-background-dark shadow-xl hover:bg-primary/90 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-2 font-bold">
                    <div className="bg-background-dark text-primary size-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {totalItems}
                    </div>
                    <span>Ver carrito</span>
                </div>
                <span className="font-bold text-lg">{formattedTotal}</span>
            </button>
        </div>
    );
}
