export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: MenuCategory;
    featured?: boolean;
    badge?: ProductBadge;
    gallery?: string[];
    removables?: string[];
    extras?: Extra[];
}

export interface Extra {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface ProductBadge {
    label: string;
    variant: "dark" | "green" | "spicy" | "vegan";
    icon?: string;
}

export interface Feature {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface CustomerAvatar {
    src: string;
    alt: string;
}

export interface Location {
    id: string;
    name: string;
    address: string;
    phone: string;
    hours: string;
    mapsUrl: string;
    image: string;
}

const MENU_CATEGORY = {
    ALL: "all",
    SMASH: "smash",
    CLASSICS: "classics",
    CHICKEN: "chicken",
    PLANT_BASED: "plant-based",
} as const;

export type MenuCategory = (typeof MENU_CATEGORY)[keyof typeof MENU_CATEGORY];
export { MENU_CATEGORY };

