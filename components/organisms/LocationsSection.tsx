import { LocationCard } from "@/components/molecules/LocationCard";
import type { Location } from "@/lib/types";

interface LocationsSectionProps {
    locations: Location[];
}

export function LocationsSection({ locations }: LocationsSectionProps) {
    return (
        <section className="py-20 px-4 md:px-10 lg:px-40 max-w-7xl mx-auto w-full">
            <div className="mb-16">
                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Donde sucede la magia</p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">
                    Nuestras <span className="text-primary">Sedes</span>
                </h2>
                <div className="h-1.5 w-24 bg-primary mb-6 rounded-full" />
                <p className="text-slate-500 dark:text-text-secondary max-w-2xl leading-relaxed">
                    Cada una de nuestras sedes está diseñada para sumergirte en el ambiente urbano de BurgerBrand.
                    Ven a disfrutar de la mejor experiencia burger con música en vivo y el estilo que nos define.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                ))}
            </div>

            <div className="mt-20 p-10 rounded-3xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-surface-border text-center">
                <h3 className="text-2xl font-bold dark:text-white mb-4">¿Buscas algo más rápido?</h3>
                <p className="text-slate-500 dark:text-text-secondary mb-8">También estamos presentes en las principales plataformas de delivery.</p>
                <div className="flex flex-wrap justify-center gap-6 opacity-60">
                    <div className="px-6 py-2 bg-white dark:bg-background-dark grayscale border-2 border-slate-200 dark:border-surface-border hover:border-primary hover:border-solid transition-all rounded-xl font-bold text-slate-400 cursor-pointer">Rappi</div>
                    <div className="px-6 py-2 bg-white dark:bg-background-dark grayscale border-2 border-slate-200 dark:border-surface-border hover:border-primary hover:border-solid transition-all rounded-xl font-bold text-slate-400 cursor-pointer">PedidosYa</div>
                    <div className="px-6 py-2 bg-white dark:bg-background-dark grayscale border-2 border-slate-200 dark:border-surface-border hover:border-primary hover:border-solid transition-all rounded-xl font-bold text-slate-400 cursor-pointer">Uber Eats</div>
                </div>
            </div>
        </section>
    );
}
