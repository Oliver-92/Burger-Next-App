import { useState, useEffect } from "react";
import { Modal } from "@/components/atoms/Modal";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { MENU_CATEGORY } from "@/lib/types";
import type { Product, MenuCategory, ProductSaveInput } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ProductSaveInput) => void;
    product?: Product | null;
    errors?: Record<string, string[]>;
    isSubmitting?: boolean;
}

const INITIAL_STATE: ProductSaveInput = {
    name: "",
    description: "",
    price: 0,
    image: "",
    category: MENU_CATEGORY.SMASH as MenuCategory,
    featured: false,
    badge: "",
};

export function ProductModal({ 
    isOpen, 
    onClose, 
    onSave, 
    product, 
    errors = {}, 
    isSubmitting = false 
}: ProductModalProps) {
    const [formData, setFormData] = useState<ProductSaveInput>(INITIAL_STATE);

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

    const getFieldError = (field: string) => {
        return errors[field]?.[0];
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
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={cn(
                            "w-full h-12 px-4 rounded-xl bg-background-dark border text-white focus:ring-1 outline-none transition-all placeholder:text-text-secondary/30",
                            getFieldError("name") 
                                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50" 
                                : "border-surface-border focus:border-primary focus:ring-primary"
                        )}
                        placeholder="Ej: Triple Beast Burger"
                    />
                    {getFieldError("name") && (
                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider pl-1 animate-in fade-in slide-in-from-top-1">
                            {getFieldError("name")}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Descripción</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={cn(
                            "w-full h-24 p-4 rounded-xl bg-background-dark border text-white focus:ring-1 outline-none transition-all resize-none placeholder:text-text-secondary/30",
                            getFieldError("description")
                                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
                                : "border-surface-border focus:border-primary focus:ring-primary"
                        )}
                        placeholder="Describe los ingredientes y el sabor..."
                    />
                    {getFieldError("description") && (
                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider pl-1 animate-in fade-in slide-in-from-top-1">
                            {getFieldError("description")}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Precio ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                            className={cn(
                                "w-full h-12 px-4 rounded-xl bg-background-dark border text-white focus:ring-1 outline-none transition-all",
                                getFieldError("price")
                                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
                                    : "border-surface-border focus:border-primary focus:ring-primary"
                            )}
                        />
                        {getFieldError("price") && (
                            <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider pl-1 animate-in fade-in slide-in-from-top-1">
                                {getFieldError("price")}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Categoría</label>
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                                className={cn(
                                    "w-full h-12 px-4 rounded-xl bg-background-dark border text-white focus:ring-1 outline-none transition-all appearance-none cursor-pointer",
                                    getFieldError("category")
                                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
                                        : "border-surface-border focus:border-primary focus:ring-primary"
                                )}
                            >
                                {Object.entries(MENU_CATEGORY).filter(([k]) => k !== "ALL").map(([key, value]) => (
                                    <option key={value} value={value} className="bg-surface-dark">
                                        {key.replace("_", " ").toLowerCase()}
                                    </option>
                                ))}
                            </select>
                            <Icon name="chevron_down" size="sm" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                        </div>
                        {getFieldError("category") && (
                            <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider pl-1 animate-in fade-in slide-in-from-top-1">
                                {getFieldError("category")}
                            </p>
                        )}
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
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className={cn(
                            "w-full h-12 px-4 rounded-xl bg-background-dark border text-white focus:ring-1 outline-none transition-all placeholder:text-text-secondary/30",
                            getFieldError("image")
                                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
                                : "border-surface-border focus:border-primary focus:ring-primary"
                        )}
                        placeholder="https://..."
                    />
                    {getFieldError("image") && (
                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider pl-1 animate-in fade-in slide-in-from-top-1">
                            {getFieldError("image")}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <Button
                        disabled={isSubmitting}
                        type="button"
                        onClick={onClose}
                        variant="secondary"
                        className="flex-1 h-12 rounded-xl"
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="flex-2 h-12 rounded-xl uppercase tracking-tight shadow-[0_0_20px_rgba(54,226,123,0.3)] flex items-center justify-center"
                    >
                        {isSubmitting ? <LoadingSpinner message="" className="w-6 h-6" /> : (product ? "Guardar Cambios" : "Crear Producto")}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
