import type { Product, Feature, CustomerAvatar, Extra } from "@/lib/types";

const COMMON_EXTRAS: Extra[] = [
    { id: "extra-cheddar", name: "Extra Cheddar", price: 1.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH2cpUcrJxej8pOWrZzcgnb74A5o91ZnHcETnoGAhKM0EISL6Q0p5pXvFqfFAp0-lMVRV1EEH8XeZ5KtKV-L9oSsdJSQuktTsXn-WY71AMDueR1TdAO5i1IynfwfQ0cukJoaeSSSdxWbVMbzNWa3wJg6ymNld5WigAQ5O_ZykGx9298pBO5FH35Ybd8bTMXWHsmgnW0VRlMBNHVLDNqcgeAQg9PuxzHMbvPQ09zwtoXasPwxcQhWkkaNrArUybtSouBFe6jYv4za-G" },
    { id: "extra-bacon", name: "Extra Bacon", price: 2.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfvQVYUi6TErx7g5IqumPx55aKw2zOj_IlKlXft6LednyztYO0-f_d1qb6Zqp6Dvgz_xN9KEpLJVZnZ0bzVWamhh8BWtTgO7SGprr3N30qBEHR5drEbquzY-jqjdPCAg_K6tLhzMUSD-KYAcaFnBBp61MYRfDlZ-tqilss5U_ejnJf7pnlOILpA_DIUm3lTvlgu5tAVXo0K6JtB5Kg0iKlOn1x3PoDZhf1iL8tFmSCKQlWvZzjTonhJ0GOI4VzNidau" },
    { id: "extra-huevo", name: "Huevo Frito", price: 1.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKR9RUT_TDXsi_hhIdBjWkaPgt-Ny4SsexDwlm-JMkw9bfFyUsDHAv3YYDwJdqmoOrHTFMWRe3Nrs3esuPr5a8BbFrn5TsQMdjKOyMKveLpNTLuoohE3GEEnbLF_zHC0TJY0dorEVTf78xc7bGZvbpXDo7F-mYqPvC9QOdm3bnoAim9oe09fK_L-XVqWlR7Ir_UKvlYiCLJDRhsz0w1u6J13i_nKLnU_xYqoqO852MibiJjMSZe_gEZFDP_gQ_YGd2rzaFp1jHLw5" },
    { id: "extra-aguacate", name: "Aguacate", price: 1.75, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCao1cm37FwBiibuFNPJkYB7Em2dBZ7zBOopA_X4YBWtvJj0hf3uMrFo6yAbv41XoyWFuIjoPWcgH6sVp0hBERMtdew1QIxiNw9y7PC0o7LCEy7qPmQV4YVSfLGO3er9VGmhhNKrTAdhk6IGnmc1pPviYAN1i2DJWBOyyV9fNKzpTyV6m0aeaL_aylEwk8N4Jzs4xktac3fp1Epmvs7AShyAt4CFmFKk4T7LFujXy-S5mvojhe_8wbmjMAsW7S2WvtCm4Vz7eopbV8d" },
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDg5apk3Jl1Uywlc43VJHTREwZpIJnjLdhdQSWfb-gFIdOgygeljwnjL1madu7uP0YN5wWoYV7jXNdbzLKdWFBnbHWbqwHN1p3ruqDnEntBgCxCP6ZvTicpfLE_OrJD3XGsJy8btfAxZndD6EmEf2-XlkrFZdHykE1vP34cERoRyLA42t-gICUrmC7e3o4lBOCTzQkt-P7KE9JYG0s4oqmm1X8QRgueZ_had0cSQiiQhmuic8s2yYsSPP__aCtssEkwf3xRj0Si2J9t",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAGS4rNnvIXOEa3nNImLndiGYyl5RN4yT39-v7SqzE7TaEz8W2N3tgjTP27zL4WI09Fx2GIrvFby0dvCfpgCmEgbBS6ZVGUSlf_5UTBuwswoGHhuCz2LyAdFAlY50bnaw3y-KROEV2nLaKmZZyiC5PCMuCA8N_hBb0xBy9BQCZNFo0tj0rmSBbu-dP2eCXVqhT0QFm9Lcr70feUiKh1MSuEermeFgKopQ6G2w86auR-_KWDbBr5uO7aEHonk82gRJpZQMPpP-lhVxBN",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD3yc32W_ZXxuUrGgI-m_WJU7dG6_QAHuGNy3ko9usVsungajd1M-G0OR3zshS3Bsrr3pF3eo3Nt8WmEPsfkx_Y9b0f77sJH1mFjdVQrgFR8qrejtLVK7qfKwHP4NzuEE-SaEoQOp0-I1cIT9ygCBiFINd1YfRK0XTF9uSyNTlOMalfQ6C4ZDrCmvLe7YgKOMDMYN9AY9Cs9KEQ4kxDIO3QIbPbyljOQoWhlMPNtGuB8szY2iegjnY_0jiu_8unwOZ5_Ext26QXl26q",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuADTw7hTJ45oiLJHm1dHFxbSaWDAnUpBY4HYerEJBlQx0-jCoLkDAo3w7Jcg3DZTqb4Fi-qqe3w8Esmv9d9aFUd2fKpi3QiGdl8hqyAJoTCEOQb2R4JcRai6RndI6H7pu785owo4oSQ9lSCUAyr_Psj27bQWXLy7Of_AL07rNZg2DZItn50ciK8-Yc7YDfiaBxAjrOqOIgePInqTlFKW4IumbGof0ATLfX3sGEVJn-2IVT1OOIxTP680tp5OO3MkKLn4efv6rYcclXJ",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDS82ttJl6TvnvYf7BJJ3Zv0nKG7gh7V-Z3kfwuRQ_mmTR9ZX2Gu-oIZKVmeSASv7xnPEvXp3YHvRRSsrviJWBUcVxPvPaXnBhhlyroP0Z0aZ_CM0lOTDaUamGkizsGaM5WQx5V48qHD4Se4PGLK_PPWrMZgdRVEVXlkOxGVgx_6TpWaOdvWWJnr_vCzykoos_PTykdR0a9V0TsXlhjSWKHl6MB6CYnNPMU1B2cQ-Nemfu6R-UdvgdYTiMRmP3nNhRMHp15pDr6WfKu",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDp-c2TnFzz9gzD1j2pJnRPTGUfEA40PU1bZZsCRk-ewq4WPJyUq5RbrXINeZEzzGkRFmF-lip2qz_oBHU1lWa3t702aSQ3M6272T8hyOP66iAkDVK98F4-DAipW-GlGOyDGkNciKpyV0255zJfmfIJpSI3WsTV9xZt8JWvSGfL7AqpVwdu9cyKeDcXtMKHb1o_IWofSDJvDtjUBGAbSz464QLG09j9ngamxVXnQuyQw4Z4RRFOgmaMGw1T19hBChZg2La5aHvfCouZ",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCdHLrA2JNUdK0pRw_rS8MAusNzknpZc7ZaDLvh_hS0l1VId6WJmB39XefrKoKR2G4QjFRvry7j7Cwn-4aoQ3QxOx15CyI62Bn-g8e2ceu8t0XHm4EicAuq3pu8J5ynsBoBAWYuGv1U-dBqjJwZbbkDQD2Sb44kBos5S8Yr4wUjgvPO7z4O2tTlTP7w6K-yMeVuwixUvGm-wiLTBWicTVi00tfMOJSMjgz85QHMOnvgTg6K-lodYpWQZXdlUKYQHiZVwQmKxvsX7RMi",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCDiumeaOzCPnWQUds-hbb2EjCeMBrV_TcELDNGynm58F99WMpTNwqG4YK0l5Laun0Y3DVRjOUUQZzxXCJNqRrCidMxW-DeudsGpd5ueRIjeJd5a6kaE8EvALWp0etJOqjvWPNqZYtaOYoL3Part4wfPhxB1N-OGEYB2Uh07fa_BZF9aijq6GXsK_cnbWe7YCPHjsD0zqLh-l4QGehbDzO3b3FMUIOLI8XZ3xvHeswyfYpp8Vh05fYzegFYwrs1DT22rkIGxFrobjVn",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbuFylThp4FgLZArTssqKf5KlK3s2Gjrng0xF8HMxSYJKCA_QbeSIHi6lhqinhCA1udFLmxMuNl6Sq1VEGtQ4jRP6-1v1U9SKKW9zY-QiXnP-W0kmj3oQS9JG65wL45bBoFFPzu9pJ7QC7KdckeqBSOzlRSiMbeqKAGNoYEriMypENH3xOSM3ebMHEED9CM6yL-glVJaAMpeTU4l8Z7Tcx-7-ARoEpjia9ymqsiX-dAInfgxjQAbvE03zEgyyNFLbcYktjw82fN5-",
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
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDQR9xqu1cyTTQFzJDOjhUsa3yzkkAyBz3zW5y9GcG4TK-0jCqb1Bpuw_8GvoBqLT5udK_e5MFophIwaxDXl4kZNE4j6uXHmOHep6YT8GIrynm3E6GgapAXdJQ9h5QBhiAU_wE9gPc_pTgUPoszUZpmBhYB7zh_wdjny6KHUzJ2WiOBcI5-YKnN432GWSYwWxgBiMssirdraarI5dQB98y7Cm26rKCbk_MoLpm1c8_xfTx4FOgFP0sh31ezjE0A2tdRjVJol3bhZHX_",
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
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn46fE4gbAhN_ZbDxTamDDgGJn4nLi2yURvVicQIcJ9Hjq9-xXqld3Id1IBmTp6EFJjk2EQ2wqvJjJGCbqEEpAr6-NKBPhLCIUYcA1akdSOwP70uFuvpAwJDnM8-4VxSZNkJ5IjgrxpUwj6qbn5_5zvhLl0H4Wxs5EPMeimd8iCh5430oj_82xXZYO38AvRpO5pKutaMFo7bw00FVWhLXtvC7pomwANYFcUpd_wggJcHfBq4X711rIohoqlEjpRZZJW0iw8xpje6zw",
        alt: "Clienta satisfecha",
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeNbFTL-uY55ryCCpWS4V6z6aQXH3iuNMoJtQvvnerXjoSXYH3vXr_O1mtyORTlRImsvPUXpHatYKBwWqClRlh4GTin66g-3rHP_uVMlkO-iD3GnUV9lf5LXoB8vMEIDtuQToXQg25eywllbz41huXL81TUxwb5hUlUdc9Hg0GV8gptwksFVvG6sno8OKvifeZ9qQSpFUnJ5zmkKZFxJrZH7yL6z4X4RrwjHhcAEsaNqGGFY-vjhoeF5dlOk3zz2ZeGTOf_gEx2ipC",
        alt: "Cliente satisfecho",
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAla5w0dLFUMJP5j6NxpYlz7YmlSe48gp0irwoVQKm_E2vLCjRp4jn-cHNCCYCi7rRFGHqquVAw03_QaDTz_jrRujNxcXDTDcUCR1WL23M8vkfl6i88z9oM-dExuhws6y2OoTvSx40TDEbw5BveQUWeTuR9TQZal67ys7oH6VG8YyVYH-1VBNVj4I-6kLltO-FbN7pDyNCdRpupI0YqRNJS8Uy1cvQXNr-vVQzgAt2SEhxnML3HqybEfRJ-L6w1TC1ujhVdRwSsjTYZ",
        alt: "Cliente satisfecho",
    },
];

export const HERO_BANNER_IMAGE =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAQqgaEj0hkX95tw5Yk7FveDm5KDtQsYruD7M-t4KhmCBeVlKBb4QvXLjhGPsHOOzAcOXjfd0OI6fo1qEdYjqQstlyReGmMTnmdPloMSlGn7RGBmSZSE-xRb-pmdtBFdiK-m0o2zAO0lGP7bd8XzAUG1wmriHtxDEu8mtsToi_rYthvMjBg_AALSwUZXZeIeSchJupdHrBysyROuiZ2X48HNXPJxYM6kPQAJV9Va1g_I8p5HZquHl6CWTdbvrAH05JmMEsqHepAEea8";
