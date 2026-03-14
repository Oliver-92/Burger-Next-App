import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { MenuHeroBanner } from "@/components/organisms/MenuHeroBanner";
import { MenuGrid } from "@/components/organisms/MenuGrid";
import { getMenuItems } from "@/lib/services/menu";
import { HERO_BANNER_IMAGE } from "@/lib/data";

export default async function MenuPage() {
    const menuItems = await getMenuItems();

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="grow bg-background-dark">
                <MenuHeroBanner imageUrl={HERO_BANNER_IMAGE} />
                <MenuGrid items={menuItems} />
            </main>
            <Footer />
        </div>
    );
}
