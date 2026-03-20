"use client";

import { FilterChip, FILTER_OPTIONS } from "@/components/molecules/FilterChip";
import type { MenuCategory } from "@/lib/types";

interface FilterBarProps {
    active: MenuCategory;
    onChange: (category: MenuCategory) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
    return (
        <div className="w-full px-4 md:px-10 py-4 max-w-[1280px] mx-auto sticky top-[65px] z-40 bg-background-dark/95 backdrop-blur-sm border-b border-surface-border/50 md:border-none">
            <div className="flex flex-wrap justify-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {FILTER_OPTIONS.map((opt) => (
                    <FilterChip
                        key={opt.category}
                        category={opt.category}
                        label={opt.label}
                        icon={opt.icon}
                        isActive={active === opt.category}
                        onClick={onChange}
                    />
                ))}
            </div>
        </div>
    );
}
