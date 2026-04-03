import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface IconProps {
    name: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    fill?: string | null;
}

const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};

export function Icon({ name, className, size = "md", fill = "transparent" }: IconProps) {
    // Map Material Symbol names to Lucide icon names
    const iconMap: Record<string, string> = {
        add: "Plus",
        remove: "Minus",
        search: "Search",
        shopping_cart: "ShoppingCart",
        add_shopping_cart: "ShoppingCart",
        shopping_bag: "ShoppingBag",
        person: "User",
        lunch_dining: "Hamburger",
        restaurant: "Utensils",
        local_pizza: "Pizza",
        eco: "Leaf",
        verified: "BadgeCheck",
        fingerprint: "Fingerprint",
        favorite: "Heart",
        location_on: "MapPin",
        call: "Phone",
        schedule: "Clock",
        timer: "Timer",
        map: "Map",
        instagram: "Instagram",
        facebook: "Facebook",
        twitter: "Twitter",
        arrow_back: "ArrowLeft",
        arrow_forward: "ArrowRight",
        close: "X",
        local_fire_department: "Flame",
        public: "Globe",
        alternate_email: "AtSign",
        star: "Star",
        chevron_left: "ChevronLeft",
        chevron_right: "ChevronRight",
        egg_alt: "Drumstick",
        remove_circle_outline: "MinusCircle",
        add_circle_outline: "PlusCircle",
        check: "Check",
        logout: "LogOut",
        inventory_2: "Package",
        group: "Users",
        refresh: "RefreshCw",
    };

    const lucideName = (iconMap[name] ||
        name.split(/[\s_-]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("")
    ) as string;

    let LucideIcon = (LucideIcons as Record<string, any>)[lucideName] as React.ElementType;

    // Final fallbacks if indexing failed
    if (!LucideIcon) {
        LucideIcon = LucideIcons.HelpCircle as React.ElementType;
    }

    return (
        <LucideIcon
            className={cn("shrink-0", className)}
            size={sizeMap[size]}
            strokeWidth={2.5}
            fill={fill}
        />
    );
}
