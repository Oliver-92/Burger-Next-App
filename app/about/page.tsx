import { getAboutContent } from "@/lib/services/about";
import { AboutStory } from "@/components/organisms/AboutStory";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nosotros - BurgerBrand | Sabor Urbano Real",
    description: "Conoce la historia detrás de BurgerBrand, nuestra pasión por las hamburguesas artesanales y los valores que nos mueven.",
};

export default async function NosotrosPage() {
    const content = await getAboutContent();

    return (
        <main className="grow bg-background-light dark:bg-background-dark">
            <AboutStory content={content} />
        </main>
    );
}
