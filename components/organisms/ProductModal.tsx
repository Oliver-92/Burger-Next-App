"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/atoms/Modal";
import { Icon } from "@/components/atoms/Icon";
import { MENU_CATEGORY } from "@/lib/types";
import type { Product, MenuCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    product?: Product | null;
}

const INITIAL_STATE = {
    name: "",
    description: "",
    price: 0 as number,
    image: "",
    category: MENU_CATEGORY.SMASH as MenuCategory,
    featured: false,
    badge: "",
};

export function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
    const [formData, setFormData] = useState(INITIAL_STATE);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category,
                featured: product.featured || false,
                badge: product.badge?.label || "",
            });
        } else {
            setFormData(INITIAL_STATE);
        }
    }, [product, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={product ? "Editar Producto" : "Nuevo Producto"}
            className="max-w-xl"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Nombre del Producto</label>
                    <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-background-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/30"
                        placeholder="Ej: Triple Beast Burger"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Descripción</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full h-24 p-4 rounded-xl bg-background-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-text-secondary/30"
                        placeholder="Describe los ingredientes y el sabor..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Precio ($)</label>
                        <input
                            required
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            className="w-full h-12 px-4 rounded-xl bg-background-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Categoría</label>
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                                className="w-full h-12 px-4 rounded-xl bg-background-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                            >
                                {Object.entries(MENU_CATEGORY).filter(([k]) => k !== "ALL").map(([key, value]) => (
                                    <option key={value} value={value} className="bg-surface-dark">
                                        {key.replace("_", " ").toLowerCase()}
                                    </option>
                                ))}
                            </select>
                            <Icon name="expand_more" size="sm" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Badge & Featured */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Etiqueta (Badge)</label>
                        <input
                            type="text"
                            value={formData.badge}
                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl bg-background-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/30"
                            placeholder="Ej: Nuevo, Spicy, Vegan..."
                        />
                    </div>
                    <div className="flex items-center gap-3 pt-8">
                        <label className="relative flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-surface-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:inset-s-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            <span className="ms-3 text-xs font-black text-text-secondary uppercase tracking-wider">Destacado</span>
                        </label>
                    </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                    <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Imagen (URL)</label>
                    <input
                        required
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-background-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/30"
                        placeholder="https://..."
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 h-12 rounded-xl border border-surface-border text-white font-bold hover:bg-white/5 transition-all cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-2 h-12 rounded-xl bg-primary text-background-dark font-black uppercase tracking-tight hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(54,226,123,0.3)] cursor-pointer"
                    >
                        {product ? "Guardar Cambios" : "Crear Producto"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
