import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/useCart";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
    isCarouselItem?: boolean;
}

export function ProductCard({ product, className, isCarouselItem = false }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);
    const formattedPrice = `$${product.price.toFixed(2)}`;

    const handleAdd = () => {
        addItem({
            product,
            quantity: 1,
            selectedExtras: [],
            removedIngredients: [],
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <article className={cn(
            "group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(54,226,123,0.2)]",
            isCarouselItem && "min-w-[200px] md:min-w-[320px] max-w-[280px] sm:max-w-[500px] max-h-[500px] snap-center shrink-0",
            className
        )}>
            {/* Image */}
            <Link href={`/product/${product.id}`} className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 dark:bg-gray-800">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Badge Overlay */}
                {product.badge && (
                    <div className="absolute top-4 left-4 z-10 transition-transform group-hover:scale-110">
                        <Badge
                            label={product.badge.label}
                            variant={product.badge.variant}
                            icon={product.badge.variant === "vegan" ? "eco" : product.badge.variant === "spicy" ? "flame" : undefined}
                        />
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex justify-between items-start mb-2 group-hover:transform group-hover:translate-x-1 transition-transform">
                    <Link href={`/product/${product.id}`}>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="text-lg font-black text-primary">{formattedPrice}</span>
                </div>

                <p className="text-slate-500 dark:text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                </p>

                {/* Actions */}
                <div className="mt-auto pt-4 flex gap-3">
                    <Button
                        variant={isAdded ? "primary" : "ghost"}
                        className="flex-1 transition-all"
                        onClick={handleAdd}
                        disabled={isAdded}
                    >
                        <Icon name={isAdded ? "check" : "shopping_cart"} size="sm" />
                        {isAdded ? "¡Añadido!" : "Agregar al carrito"}
                    </Button>
                </div>
            </div>
        </article>
    );
}
