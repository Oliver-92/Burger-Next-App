"use client";

import { useState } from "react";
import { ProductCard } from "@/components/molecules/ProductCard";
import { FilterBar } from "@/components/organisms/FilterBar";
import { FloatingCart } from "@/components/organisms/FloatingCart";
import type { Product, MenuCategory } from "@/lib/types";
import { MENU_CATEGORY } from "@/lib/types";

interface MenuGridProps {
    items: Product[];
}

export function MenuGrid({ items }: MenuGridProps) {
    const [activeCategory, setActiveCategory] = useState<MenuCategory>(
        MENU_CATEGORY.ALL
    );

    const filtered =
        activeCategory === MENU_CATEGORY.ALL
            ? items
            : items.filter((item) => item.category === activeCategory);

    return (
        <>
            <FilterBar active={activeCategory} onChange={setActiveCategory} />

            <div className="w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>

            {/* Mobile floating cart */}
            <FloatingCart />
        </>
    );
}
