import { Navbar } from "@/components/organisms/Navbar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { FeaturesSection } from "@/components/organisms/FeaturesSection";
import { PopularSection } from "@/components/organisms/PopularSection";
import { Footer } from "@/components/organisms/Footer";
import { getProducts } from "@/lib/services/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <main className="grow">
        <HeroSection />
        <FeaturesSection />
        <PopularSection products={products} />
      </main>
      <Footer />
    </div>
  );
}
