import type { Feature, CustomerAvatar } from "@/lib/types";

// Los productos, extras y removibles se consumen ahora desde Supabase a través de las rutas de API correspondientes.

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
