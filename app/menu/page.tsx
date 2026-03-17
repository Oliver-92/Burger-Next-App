import { MenuHeroBanner } from "@/components/organisms/MenuHeroBanner";
import { MenuGrid } from "@/components/organisms/MenuGrid";
import { getMenuItems } from "@/lib/services/menu";
import { HERO_BANNER_IMAGE } from "@/lib/data";

export default async function MenuPage() {
    const menuItems = await getMenuItems();

    return (
        <main className="grow bg-background-dark">
            <MenuHeroBanner imageUrl={HERO_BANNER_IMAGE} />
            <MenuGrid items={menuItems} />
        </main>
    );
}
