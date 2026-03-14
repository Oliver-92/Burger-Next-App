import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { FEATURES } from "@/lib/data";

export function FeaturesSection() {
    return (
        <section className="px-4 py-10 lg:px-40 bg-surface-dark/30 border-y border-surface-border/50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Calidad Artesanal
                        </h2>
                        <p className="text-slate-600 dark:text-text-secondary">
                            Ingredientes seleccionados para una experiencia superior.
                        </p>
                    </div>
                    <Link
                        href="#"
                        className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                    >
                        Conoce nuestra historia{" "}
                        <Icon name="arrow_forward" size="sm" />
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
