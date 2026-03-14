import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { Icon } from "@/components/atoms/Icon";
import type { Product } from "@/lib/types";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const formattedPrice = `$${product.price.toFixed(2)}`;

    return (
        <article className="min-w-[280px] md:min-w-[320px] snap-center rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group shrink-0">
            {/* Image */}
            <div className="h-48 w-full bg-slate-100 dark:bg-black/20 relative overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                    <div className="absolute top-3 right-3">
                        <Badge
                            label={product.badge.label}
                            icon={product.badge.icon}
                            variant={product.badge.variant}
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {product.name}
                    </h3>
                    <span className="text-primary font-bold">{formattedPrice}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-text-secondary mb-4 line-clamp-2">
                    {product.description}
                </p>
                <button className="w-full h-10 rounded-full bg-slate-100 dark:bg-surface-border text-slate-900 dark:text-white font-bold text-sm hover:bg-primary hover:text-background-dark transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Icon name="add" size="sm" />
                    Agregar al pedido
                </button>
            </div>
        </article>
    );
}
