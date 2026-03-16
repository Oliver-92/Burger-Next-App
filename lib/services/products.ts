import type { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json() as Promise<Product[]>;
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products/${id}`, {
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        if (res.status === 404) return undefined;
        throw new Error("Failed to fetch product");
    }

    return res.json() as Promise<Product>;
}
