"use client";

import { Icon } from "@/components/atoms/Icon";
import { ProductCard } from "@/components/molecules/ProductCard";
import type { Product } from "@/lib/types";
import { useRef } from "react";

interface PopularSectionProps {
    products: Product[];
}

export function PopularSection({ products }: PopularSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 340;
        scrollRef.current.scrollBy({
            left: direction === "right" ? amount : -amount,
            behavior: "smooth",
        });
    };

    return (
        <section className="px-4 py-16 lg:px-40">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Populares esta semana
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="size-10 rounded-full border border-surface-border flex items-center justify-center text-slate-900 dark:text-white hover:bg-surface-border transition-colors cursor-pointer"
                            aria-label="Anterior"
                        >
                            <Icon name="chevron_left" size="md" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="size-10 rounded-full bg-primary text-background-dark flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
                            aria-label="Siguiente"
                        >
                            <Icon name="chevron_right" size="md" />
                        </button>
                    </div>
                </div>

                {/* Products Carousel */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory"
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} isCarouselItem={true} />
                    ))}
                </div>
            </div>
        </section>
    );
}
