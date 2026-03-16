"use client";

import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import type { Extra } from "@/lib/types";

interface ExtraCardProps {
    extra: Extra;
    isSelected: boolean;
    onToggle: () => void;
}

export function ExtraCard({ extra, isSelected, onToggle }: ExtraCardProps) {
    return (
        <label className="cursor-pointer group relative block h-full">
            <input
                type="checkbox"
                className="peer sr-only"
                checked={isSelected}
                onChange={onToggle}
            />
            <div
                className={cn(
                    "flex items-center p-3 h-full rounded-xl bg-surface-dark border border-transparent transition-all",
                    "hover:bg-surface-border",
                    isSelected && "border-primary bg-surface-dark/80"
                )}
            >
                <div className="size-12 rounded-full overflow-hidden bg-white/10 shrink-0 relative">
                    <Image
                        src={extra.image}
                        alt={extra.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="ml-3 flex-1">
                    <div className="text-white text-sm font-bold">{extra.name}</div>
                    <div className="text-text-secondary text-xs">
                        +${extra.price.toFixed(2)}
                    </div>
                </div>
                <div
                    className={cn(
                        "size-6 rounded-full border-2 border-surface-border flex items-center justify-center transition-colors",
                        isSelected && "bg-primary border-primary"
                    )}
                >
                    <Icon
                        name="check"
                        size="sm"
                        className={cn("text-black opacity-0", isSelected && "opacity-100")}
                    />
                </div>
            </div>
        </label>
    );
}
