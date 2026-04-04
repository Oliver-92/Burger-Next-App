"use client";

import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AdminTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export function AdminTable({ products, onEdit, onDelete }: AdminTableProps) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-surface-border bg-surface-dark/30 backdrop-blur-md shadow-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-surface-border bg-background-dark/50">
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider">Producto</th>
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider">Categoría</th>
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider text-center">Precio</th>
                        <th className="px-6 py-4 text-xs font-black text-text-secondary uppercase tracking-wider text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative size-12 rounded-lg overflow-hidden border border-surface-border bg-background-dark shrink-0">
                                        <Image 
                                            src={product.image} 
                                            alt={product.name} 
                                            fill 
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white group-hover:text-primary transition-colors">{product.name}</div>
                                        <div className="text-xs text-text-secondary line-clamp-1 max-w-[200px]">{product.description}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {product.badge ? (
                                    <Badge label={product.badge.label} variant={product.badge.variant} />
                                ) : (
                                    <span className="text-sm text-text-secondary capitalize">{product.category}</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="font-black text-primary">${product.price.toFixed(2)}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <Button 
                                        variant="icon"
                                        onClick={() => onEdit(product)}
                                        className="size-9 bg-surface-border/30 text-text-secondary hover:text-white hover:bg-blue-500/20 border-transparent hover:border-blue-500/30"
                                        title="Editar"
                                    >
                                        <Icon name="edit" size="sm" />
                                    </Button>
                                    <Button 
                                        variant="icon"
                                        onClick={() => onDelete(product)}
                                        className="size-9 bg-surface-border/30 text-text-secondary hover:text-white hover:bg-red-500/20 border-transparent hover:border-red-500/30"
                                        title="Eliminar"
                                    >
                                        <Icon name="trash_2" size="sm" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-20 text-center">
                                <div className="flex flex-col items-center gap-3 opacity-40">
                                    <Icon name="inventory_2" size="lg" />
                                    <p className="font-bold">No se encontraron productos</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
