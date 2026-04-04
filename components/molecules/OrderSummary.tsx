"use client";

import Image from "next/image";
import { CartItem } from "@/lib/types";
import { useCartStore } from "@/lib/store/useCart";

export function OrderSummary() {
    const items = useCartStore((state) => state.items);
    const totalPrice = useCartStore((state) => state.totalPrice);

    if (items.length === 0) return null;

    return (
        <div className="flex flex-col gap-6 p-6 rounded-2xl border border-surface-border bg-surface-dark/50">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Resumen del Pedido</h2>
            
            <div className="flex flex-col gap-4 divide-y divide-surface-border">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pt-4 first:pt-0">
                        <div className="relative size-16 rounded-lg overflow-hidden shrink-0 bg-background-dark border border-surface-border">
                            <Image 
                                src={item.product.image} 
                                alt={item.product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                                <h4 className="text-sm font-bold text-white leading-tight truncate">
                                    {item.product.name}
                                </h4>
                                <span className="text-sm font-black text-primary italic">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                            <p className="text-xs text-text-secondary mt-1">
                                Cantidad: {item.quantity}
                            </p>
                            {item.selectedExtras.length > 0 && (
                                <p className="text-[10px] text-primary/80 mt-1 uppercase font-bold tracking-wider">
                                    + {item.selectedExtras.map(e => e.name).join(", ")}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-dashed border-surface-border">
                <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-medium lowercase">Total a pagar</span>
                    <span className="text-3xl font-black text-white italic tracking-tighter">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
                <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-bold mt-2 text-right">
                    IVA Incluido
                </p>
            </div>
        </div>
    );
}
