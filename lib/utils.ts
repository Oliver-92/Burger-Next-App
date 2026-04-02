import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductBadge } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mapBadge(badgeLabel?: string): ProductBadge | undefined {
    if (!badgeLabel) return undefined;
    const labelLower = badgeLabel.toLowerCase();
    if (labelLower === "vegan") {
        return { label: badgeLabel, variant: "vegan", icon: "Leaf" };
    } else if (labelLower === "spicy") {
        return { label: badgeLabel, variant: "spicy", icon: "Flame" };
    } else {
        return { label: badgeLabel, variant: "dark" };
    }
}
