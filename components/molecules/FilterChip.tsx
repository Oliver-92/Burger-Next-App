"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import type { MenuCategory } from "@/lib/types";
import { MENU_CATEGORY } from "@/lib/types";

interface FilterChipProps {
    category: MenuCategory;
    label: string;
    icon?: string;
    isActive: boolean;
    onClick: (category: MenuCategory) => void;
}

export function FilterChip({
    category,
    label,
    icon,
    isActive,
    onClick,
}: FilterChipProps) {
    return (
        <button
            onClick={() => onClick(category)}
            className={cn(
                "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all active:scale-95 cursor-pointer",
                isActive
                    ? "bg-primary text-background-dark font-bold"
                    : "bg-surface-border hover:bg-surface-border/80 text-white font-medium border border-transparent hover:border-primary/30"
            )}
        >
            {icon && <Icon name={icon} size="sm" />}
            <span className="text-sm">{label}</span>
        </button>
    );
}

export const FILTER_OPTIONS: Array<{
    category: MenuCategory;
    label: string;
    icon?: string;
}> = [
        { category: MENU_CATEGORY.ALL, label: "Todos" },
        { category: MENU_CATEGORY.SMASH, label: "Smash", icon: "Flame" },
        { category: MENU_CATEGORY.CLASSICS, label: "Clásicas", icon: "Heart" },
        { category: MENU_CATEGORY.CHICKEN, label: "Pollo", icon: "Drumstick" },
        { category: MENU_CATEGORY.PLANT_BASED, label: "Vegano", icon: "Leaf" },
    ];
