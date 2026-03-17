import { HeroSection } from "@/components/organisms/HeroSection";
import { FeaturesSection } from "@/components/organisms/FeaturesSection";
import { PopularSection } from "@/components/organisms/PopularSection";
import { getProducts } from "@/lib/services/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="grow">
      <HeroSection />
      <FeaturesSection />
      <PopularSection products={products} />
    </main>
  );
}
