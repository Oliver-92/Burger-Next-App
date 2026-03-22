import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/useCart";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MenuCardProps {
    item: Product;
}

export function MenuCard({ item }: MenuCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem({
            product: item,
            quantity: 1,
            selectedExtras: [],
            removedIngredients: [],
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <article className="group flex flex-col overflow-hidden rounded-xl bg-surface-dark border border-surface-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(54,226,123,0.2)]">
            {/* Image */}
            <Link href={`/product/${item.id}`} className="relative aspect-4/3 w-full overflow-hidden bg-gray-800">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Badge Overlay */}
                {item.badge && (
                    <div className="absolute top-4 left-4 z-10 transition-transform group-hover:scale-110">
                        <Badge
                            label={item.badge.label}
                            variant={item.badge.variant}
                            icon={item.badge.variant === "vegan" ? "eco" : item.badge.variant === "spicy" ? "local_fire_department" : undefined}
                        />
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex justify-between items-start mb-2 group-hover:transform group-hover:translate-x-1 transition-transform">
                    <Link href={`/product/${item.id}`}>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                    </Link>
                    <span className="text-lg font-black text-primary">${item.price.toFixed(2)}</span>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                    {item.description}
                </p>

                {/* Actions */}
                <div className="mt-auto pt-4 flex gap-3">
                    <Button
                        variant={isAdded ? "primary" : "light"}
                        className="flex-1 transition-all"
                        onClick={handleAdd}
                        disabled={isAdded}
                    >
                        <Icon name={isAdded ? "check" : "add_shopping_cart"} size="sm" />
                        {isAdded ? "¡Añadido!" : "Agregar al carrito"}
                    </Button>
                </div>
            </div>
        </article>
    );
}
