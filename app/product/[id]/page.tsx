import { notFound } from "next/navigation";
import { getProductById } from "@/lib/services/products";
import { ProductDetail } from "@/components/organisms/ProductDetail";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="grow flex flex-col items-center w-full bg-background-dark">
            <ProductDetail product={product} />
        </main>
    );
}
