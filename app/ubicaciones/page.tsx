import { LocationsSection } from "@/components/organisms/LocationsSection";
import { getLocations } from "@/lib/services/locations";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ubicaciones - BurgerBrand | Sabor Urbano Real",
    description: "Encuentra tu local BurgerBrand más cercano. Direcciones, horarios y contacto de todas nuestras sedes.",
};

export default async function UbicacionesPage() {
    const locations = await getLocations();

    return (
        <main className="grow bg-background-light dark:bg-background-dark">
            <LocationsSection locations={locations} />
        </main>
    );
}
