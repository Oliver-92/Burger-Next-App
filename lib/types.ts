export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: MenuCategory;
    featured?: boolean;
    badge?: ProductBadge;
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

const MENU_CATEGORY = {
    ALL: "all",
    SMASH: "smash",
    CLASSICS: "classics",
    CHICKEN: "chicken",
    PLANT_BASED: "plant-based",
} as const;

export type MenuCategory = (typeof MENU_CATEGORY)[keyof typeof MENU_CATEGORY];
export { MENU_CATEGORY };
