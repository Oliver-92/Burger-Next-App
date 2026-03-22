"use client";

import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    size?: "sm" | "md";
}

export function QuantitySelector({
    quantity,
    onIncrement,
    onDecrement,
    size = "md",
}: QuantitySelectorProps) {
    const isSmall = size === "sm";

    return (
        <div className={cn(
            "flex items-center bg-background-dark rounded-full p-0.5 border border-surface-border",
            isSmall ? "p-0.5" : "p-1"
        )}>
            <button
                onClick={onDecrement}
                disabled={quantity <= 1}
                className={cn(
                    "rounded-full flex items-center justify-center text-white hover:bg-surface-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                    isSmall ? "size-7" : "size-10"
                )}
                type="button"
            >
                <Icon name="remove" size={isSmall ? "sm" : "md"} />
            </button>
            <span className={cn(
                "text-center text-white font-bold select-none",
                isSmall ? "w-6 text-sm" : "w-8 text-lg"
            )}>
                {quantity}
            </span>
            <button
                onClick={onIncrement}
                className={cn(
                    "rounded-full flex items-center justify-center text-white hover:bg-surface-border transition-colors",
                    isSmall ? "size-7" : "size-10"
                )}
                type="button"
            >
                <Icon name="add" size={isSmall ? "sm" : "md"} />
            </button>
        </div>
    );
}
