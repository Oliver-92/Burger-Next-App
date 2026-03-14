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
