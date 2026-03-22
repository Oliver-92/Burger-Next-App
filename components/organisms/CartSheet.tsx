"use client";

import { useCartStore } from "@/lib/store/useCart";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { useEffect } from "react";

export function CartSheet() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
    const hydrated = useHydrated();

    // Prevent body scroll when open
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

    if (!hydrated) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-100 transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Sheet */}
            <aside
                className={cn(
                    "fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background-dark border-l border-surface-border z-101 shadow-2xl transition-transform duration-500 ease-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="p-6 border-b border-surface-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display">
                            Tu <span className="text-primary">Pedido</span>
                        </h2>
                        <span className="bg-surface-border text-text-secondary text-xs px-2 py-1 rounded-md font-bold">
                            {totalItems} items
                        </span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="size-10 rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-surface-border transition-all cursor-pointer"
                    >
                        <Icon name="close" size="md" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                            <div className="size-24 rounded-full bg-surface-dark flex items-center justify-center mb-6 border border-surface-border">
                                <Icon name="shopping_cart" size="lg" className="text-surface-border text-5xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Tu carrito está vacío</h3>
                            <p className="text-text-secondary max-w-[250px]">
                                ¡Parece que aún no has añadido ninguna delicia artesanal!
                            </p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-8 text-primary font-bold hover:underline"
                            >
                                Volver al menú
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative size-20 rounded-xl overflow-hidden bg-surface-dark border border-surface-border shrink-0">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-white font-bold leading-tight group-hover:text-primary transition-colors">
                                            {item.product.name}
                                        </h4>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-text-secondary hover:text-red-400 transition-colors p-1"
                                        >
                                            <Icon name="delete" size="sm" />
                                        </button>
                                    </div>

                                    {/* Customizations summary */}
                                    {(item.selectedExtras.length > 0 || item.removedIngredients.length > 0) && (
                                        <div className="text-[11px] text-text-secondary mb-3 space-y-0.5">
                                            {item.selectedExtras.map((e) => (
                                                <div key={e.id} className="flex items-center gap-1">
                                                    <span className="text-primary">+</span> {e.name}
                                                </div>
                                            ))}
                                            {item.removedIngredients.map((ing) => (
                                                <div key={ing} className="flex items-center gap-1">
                                                    <span className="text-red-400 font-bold">x</span> Sin {ing}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-auto">
                                        <QuantitySelector
                                            quantity={item.quantity}
                                            onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                                            onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                                            size="sm"
                                        />
                                        <span className="text-white font-bold">
                                            ${((item.product.price + item.selectedExtras.reduce((s, e) => s + e.price, 0)) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 bg-surface-dark/50 border-t border-surface-border flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-text-secondary text-sm">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-white text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full h-14 bg-primary text-background-dark font-black text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(54,226,123,0.3)] cursor-pointer">
                            Finalizar Compra
                            <Icon name="arrow_forward" size="md" />
                        </button>

                        <p className="text-[10px] text-center text-text-secondary">
                            Impuestos y envío calculados en el siguiente paso.
                        </p>
                    </div>
                )}
            </aside>
        </>
    );
}
