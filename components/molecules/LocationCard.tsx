import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import type { Location } from "@/lib/types";

interface LocationCardProps {
    location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
    return (
        <article className="rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group h-full flex flex-col">
            <div className="h-48 md:h-56 w-full bg-slate-100 dark:bg-black/20 relative overflow-hidden">
                <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                    {location.name}
                </h3>
                
                <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-start gap-3">
                        <Icon name="location_on" className="text-primary mt-0.5 shrink-0" size="sm" />
                        <span className="text-sm text-slate-600 dark:text-text-secondary">
                            {location.address}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Icon name="call" className="text-primary shrink-0" size="sm" />
                        <span className="text-sm text-slate-600 dark:text-text-secondary">
                            {location.phone}
                        </span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <Icon name="schedule" className="text-primary mt-0.5 shrink-0" size="sm" />
                        <span className="text-sm text-slate-600 dark:text-text-secondary leading-tight">
                            {location.hours}
                        </span>
                    </div>
                </div>

                <a 
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-xl bg-primary text-background-dark font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                    <Icon name="map" size="sm" />
                    Cómo llegar
                </a>
            </div>
        </article>
    );
}
