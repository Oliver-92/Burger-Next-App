"use client";

import { Icon } from "@/components/atoms/Icon";

interface QuantitySelectorProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export function QuantitySelector({
    quantity,
    onIncrement,
    onDecrement,
}: QuantitySelectorProps) {
    return (
        <div className="flex items-center bg-background-dark rounded-full p-1 border border-surface-border">
            <button
                onClick={onDecrement}
                disabled={quantity <= 1}
                className="size-10 rounded-full flex items-center justify-center text-white hover:bg-surface-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                type="button"
            >
                <Icon name="remove" size="md" />
            </button>
            <span className="w-8 text-center text-white font-bold text-lg select-none">
                {quantity}
            </span>
            <button
                onClick={onIncrement}
                className="size-10 rounded-full flex items-center justify-center text-white hover:bg-surface-border transition-colors"
                type="button"
            >
                <Icon name="add" size="md" />
            </button>
        </div>
    );
}
