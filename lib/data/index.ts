import type { Product, Feature, CustomerAvatar, Extra } from "@/lib/types";

const COMMON_EXTRAS: Extra[] = [
    { id: "extra-cheddar", name: "Extra Cheddar", price: 1.5, image: "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960240/extra-cheddar_si66h6.webp" },
    { id: "extra-bacon", name: "Extra Bacon", price: 2.0, image: "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960240/extra-bacon_ymrlgc.webp" },
    { id: "extra-huevo", name: "Huevo Frito", price: 1.0, image: "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960240/extra-huevos_xmis5n.webp" },
    { id: "extra-aguacate", name: "Aguacate", price: 1.75, image: "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/extra-aguacate_oolgnp.webp" },
];

const COMMON_REMOVABLES = ["Cebolla", "Tomate", "Salsa", "Pepinillos"];

export const PRODUCTS: Product[] = [
    // Secciones Destacadas (Home) + Menú Completo
    {
        id: "classic-smash",
        name: "Classic Smash",
        description:
            "Doble carne smasheada, queso americano, cebolla picada y salsa especial.",
        price: 12.0,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/classic-smash_xqgg28.webp",
        category: "smash",
        featured: true,
        badge: {
            label: "Top Ventas",
            variant: "dark",
        },
        removables: COMMON_REMOVABLES,
        extras: COMMON_EXTRAS,
    },
    {
        id: "double-beast",
        name: "Double Beast",
        description: "Triple carne, tocino crujiente, aros de cebolla y bqq ahumada.",
        price: 15.5,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/double-beast_dbt5m7.webp",
        category: "classics",
        featured: true,
        removables: COMMON_REMOVABLES,
        extras: COMMON_EXTRAS,
    },
    {
        id: "crispy-chicken",
        name: "Crispy Chicken",
        description:
            "Pollo frito marinado en suero de leche, coleslaw y mayonesa picante.",
        price: 11.0,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/crispy-clucker_qsl3pp.webp",
        category: "chicken",
        featured: true,
        badge: {
            label: "Nuevo",
            variant: "dark",
        },
        removables: ["Coleslaw", "Salsa", "Pepinillos"],
        extras: COMMON_EXTRAS,
    },
    {
        id: "veggie-delight",
        name: "Veggie Delight",
        description: "Medallón de lentejas y champiñones, aguacate, rúcula y tomate.",
        price: 13.5,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960241/veggie-delight_iu8cuq.webp",
        category: "plant-based",
        featured: true,
        badge: {
            label: "Vegan",
            variant: "green",
            icon: "Leaf",
        },
        removables: ["Aguacate", "Rúcula", "Tomate"],
        extras: COMMON_EXTRAS,
    },
    {
        id: "gotham-smash",
        name: "The Gotham Smash",
        description:
            "Doble carne smash, cheddar madurado, cebollas caramelizadas, pepinillos caseros y nuestra salsa verde secreta.",
        price: 12.5,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/gotham-smash_ymhdwu.webp",
        category: "smash",
        badge: { label: "Best Seller", variant: "dark" },
        removables: COMMON_REMOVABLES,
        extras: COMMON_EXTRAS,
    },
    {
        id: "spicy-inferno",
        name: "Spicy Inferno",
        description:
            "Jalapeños asados, queso pepper jack, mayonesa de chipotle, pan brioche y cebolla crujiente.",
        price: 13.0,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960240/spicy-inferno_tc5p34.webp",
        category: "smash",
        badge: { label: "Spicy", variant: "spicy", icon: "Flame" },
        removables: ["Jalapeños", "Salsa", "Cebolla"],
        extras: COMMON_EXTRAS,
    },
    {
        id: "classic-cheese",
        name: "Classic Cheese",
        description:
            "Carne Angus premium, doble queso americano, lechuga crujiente, tomate, pepinillos, ketchup y mostaza.",
        price: 11.0,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/classic-cheese_fgxnzn.webp",
        category: "classics",
        removables: ["Lechuga", "Tomate", "Pepinillos", "Salsa"],
        extras: COMMON_EXTRAS,
    },
    {
        id: "truffle-mushroom",
        name: "Truffle Mushroom",
        description:
            "Queso suizo, champiñones silvestres salteados, alioli de trufa negra y rúcula en pan tostado.",
        price: 14.5,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960240/truffle-mushroom_l1nujw.webp",
        category: "classics",
        removables: ["Champiñones", "Salsa", "Rúcula"],
        extras: COMMON_EXTRAS,
    },
    {
        id: "crispy-clucker",
        name: "Crispy Clucker",
        description:
            "Pechuga de pollo frita al estilo sureño, ensalada de col de la casa, mayonesa picante y pepinillos.",
        price: 11.5,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/crispy-clucker_qsl3pp.webp",
        category: "chicken",
        removables: ["Ensalada de col", "Salsa", "Pepinillos"],
        extras: COMMON_EXTRAS,
    },
    {
        id: "green-giant",
        name: "The Green Giant",
        description:
            "Medallón vegetal, cheddar vegano, aguacate machacado, brotes, tomate y pan integral.",
        price: 13.5,
        image:
            "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/green-giant_geiif9.webp",
        category: "plant-based",
        badge: { label: "Vegan", variant: "vegan" },
        removables: ["Aguacate", "Tomate"],
        extras: COMMON_EXTRAS,
    },
];


export const FEATURES: Feature[] = [
    {
        id: "carne-premium",
        icon: "Utensils",
        title: "Carne Premium",
        description:
            "Cortes seleccionados de ganado de pastoreo, molidos diariamente en nuestra cocina para garantizar frescura.",
    },
    {
        id: "pan-brioche",
        icon: "Pizza",
        title: "Pan Brioche",
        description:
            "Suave, dorado y con ese toque de mantequilla perfecto. Horneado cada mañana por nuestros panaderos.",
    },
    {
        id: "vegetales-frescos",
        icon: "Leaf",
        title: "Vegetales Frescos",
        description:
            "Directo del huerto a tu hamburguesa. Apoyamos a productores locales para obtener los mejores ingredientes.",
    },
];

export const CUSTOMER_AVATARS: CustomerAvatar[] = [
    {
        src: "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960241/avatar_01_w3oapu.webp",
        alt: "Clienta satisfecha",
    },
    {
        src: "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960241/avatar_02_dxqtgn.webp",
        alt: "Cliente satisfecho",
    },
    {
        src: "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960241/avatar_03_ycx2qh.webp",
        alt: "Cliente satisfecho",
    },
];

export const HERO_BANNER_IMAGE =
    "https://res.cloudinary.com/dhrtwfd13/image/upload/v1773960239/hero_banner_xtl5ba.webp";
