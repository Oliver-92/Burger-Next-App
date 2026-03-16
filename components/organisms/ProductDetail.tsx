"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { ExtraCard } from "@/components/molecules/ExtraCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductDetailProps {
    product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

    const toggleExtra = (id: string) => {
        setSelectedExtras((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    const toggleIngredient = (name: string) => {
        setRemovedIngredients((prev) =>
            prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
        );
    };

    const extrasTotal = (product.extras || [])
        .filter((e) => selectedExtras.includes(e.id))
        .reduce((sum, e) => sum + e.price, 0);

    const totalPrice = (product.price + extrasTotal) * quantity;

    return (
        <div className="layout-content-container flex flex-col max-w-[1280px] flex-1">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 p-4 mb-4">
                <Link
                    href="/"
                    className="text-text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors"
                >
                    Inicio
                </Link>
                <span className="text-text-secondary text-sm font-medium leading-normal">/</span>
                <Link
                    href="/menu"
                    className="text-text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors"
                >
                    Menú
                </Link>
                <span className="text-text-secondary text-sm font-medium leading-normal">/</span>
                <span className="text-white text-sm font-medium leading-normal">
                    {product.name}
                </span>
            </nav>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 pb-20">
                {/* Left Column: Visuals */}
                <div className="lg:col-span-7 flex flex-col gap-6 relative">
                    <div className="lg:sticky lg:top-24">
                        <div className="w-full aspect-square md:aspect-4/3 rounded-3xl overflow-hidden bg-surface-dark border border-surface-border shadow-2xl relative group">
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10"></div>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 ease-out"
                            />
                            {product.badge && (
                                <div className="absolute top-6 right-6 z-20">
                                    <Badge
                                        label={product.badge.label}
                                        variant={product.badge.variant}
                                        icon={product.badge.icon}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Details & Customization */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    {/* Header */}
                    <div className="border-b border-surface-border pb-6">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h1 className="text-white text-4xl md:text-5xl font-black leading-none tracking-tight uppercase font-display">
                                {product.name.split(" ").map((word, i, arr) => (
                                    <span key={i}>
                                        <span className={cn(i === arr.length - 1 && "text-primary")}>
                                            {word}
                                        </span>
                                        {i !== arr.length - 1 && <br />}
                                    </span>
                                ))}
                            </h1>
                            <div className="flex flex-col items-end">
                                <span className="text-white text-3xl font-bold tracking-tight">
                                    ${product.price.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-1 text-text-secondary text-xs font-medium">
                                    <Icon name="timer" size="sm" className="text-[16px]" /> 15 min
                                </div>
                            </div>
                        </div>
                        <p className="text-text-secondary text-lg font-normal leading-relaxed mt-4">
                            {product.description}
                        </p>
                        <div className="flex gap-2 mt-4">
                            {product.badge?.variant === "spicy" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-border text-white text-xs font-medium">
                                    <Icon name="local_fire_department" size="sm" className="text-orange-400" /> Picante Suave
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-border text-white text-xs font-medium">
                                100% Angus
                            </span>
                        </div>
                    </div>

                    {/* Customization: Remove Ingredients */}
                    {product.removables && product.removables.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <h3 className="text-white text-lg font-bold flex items-center gap-2">
                                <Icon name="remove_circle_outline" size="md" className="text-primary" />
                                ¿Quitar algo?
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.removables.map((ing) => (
                                    <label key={ing} className="cursor-pointer group select-none">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={removedIngredients.includes(ing)}
                                            onChange={() => toggleIngredient(ing)}
                                        />
                                        <div className="px-4 py-2 rounded-full border border-surface-border bg-transparent text-text-secondary text-sm font-medium transition-all peer-checked:bg-red-500/20 peer-checked:border-red-500 peer-checked:text-red-400 hover:border-white/30">
                                            Sin {ing}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Customization: Add Extras */}
                    {product.extras && product.extras.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <h3 className="text-white text-lg font-bold flex items-center gap-2">
                                <Icon name="add_circle_outline" size="md" className="text-primary" />
                                Mejora tu burger
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {product.extras.map((extra) => (
                                    <ExtraCard
                                        key={extra.id}
                                        extra={extra}
                                        isSelected={selectedExtras.includes(extra.id)}
                                        onToggle={() => toggleExtra(extra.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white text-sm font-bold">Notas de cocina</h3>
                        <textarea
                            className="w-full bg-surface-dark border border-surface-border rounded-xl p-3 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none placeholder-[#586b60] resize-none"
                            placeholder="Ej: La carne bien cocida, salsa aparte..."
                            rows={2}
                        ></textarea>
                    </div>

                    {/* Sticky Action Footer */}
                    <div className="sticky bottom-4 lg:relative lg:bottom-0 lg:mt-4 z-40">
                        <div className="p-4 rounded-2xl bg-[#1a231f]/90 backdrop-blur-md border border-surface-border shadow-2xl flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrement={() => setQuantity((q) => q + 1)}
                                    onDecrement={() => setQuantity((q) => q - 1)}
                                />
                                <div className="text-right">
                                    <p className="text-text-secondary text-xs">Total estimado</p>
                                    <p className="text-white text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            <Button variant="primary" className="w-full h-14 bg-primary hover:bg-primary-hover text-black text-lg font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(54,226,123,0.3)] hover:shadow-[0_0_30px_rgba(54,226,123,0.5)] transition-all transform active:scale-[0.98]">
                                <Icon name="shopping_bag" size="md" className="font-bold" />
                                Agregar al pedido
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
