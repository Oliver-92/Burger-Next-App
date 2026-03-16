import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
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
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="grow flex flex-col items-center w-full bg-background-dark">
                <ProductDetail product={product} />
            </main>
            <Footer />
        </div>
    );
}
