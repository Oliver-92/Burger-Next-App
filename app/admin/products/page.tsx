"use client";

import { useState, useEffect, useMemo } from "react";
import { AdminTable } from "@/components/molecules/AdminTable";
import { ProductModal } from "@/components/organisms/ProductModal";
import { Modal } from "@/components/atoms/Modal";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import { MENU_CATEGORY } from "@/lib/types";
import type { Product, MenuCategory } from "@/lib/types";
import { getAdminProducts, deleteProduct, saveProduct } from "@/app/actions/products";
import LoadingSpinner from "@/app/loading";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState<MenuCategory | "all">("all");

    // Modal State
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const data = await getAdminProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filtered Products
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === "all" || p.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, filterCategory]);

    // CRUD Handlers
    const handleSave = async (data: any) => {
        setIsSubmitting(true);
        try {
            const result = await saveProduct(data, editingProduct?.id);
            if (result.success) {
                await fetchProducts(); // Refresh list
                setIsProductModalOpen(false);
            } else {
                alert(result.error || "Ocurrió un error al guardar.");
            }
        } catch (error) {
            console.error("Error saving product:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;
        
        setIsSubmitting(true);
        try {
            const result = await deleteProduct(productToDelete.id);
            if (result.success) {
                setProducts(products.filter((p) => p.id !== productToDelete.id));
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            } else {
                alert(result.error || "Ocurrió un error al eliminar.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setIsProductModalOpen(true);
    };

    const openDeleteModal = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col pt-32 pb-12">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-10 lg:px-40">
                {/* Admin Header */}
                <div className="mb-10 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                        <div className="size-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Panel de Control</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-display leading-none">
                        Catálogo de Productos
                    </h1>
                </div>

                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-surface-border/50">
                        <div className="flex flex-1 w-full gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Icon name="search" size="sm" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input 
                                    type="text"
                                    placeholder="Buscar por nombre..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            {/* Category Filter */}
                            <select 
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value as MenuCategory | "all")}
                                className="h-12 px-4 rounded-xl bg-surface-dark border border-surface-border text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer min-w-[150px]"
                            >
                                <option value="all">Todas las categorías</option>
                                {Object.entries(MENU_CATEGORY).filter(([k]) => k !== "ALL").map(([key, value]) => (
                                    <option key={value} value={value} className="bg-surface-dark">
                                        {key.replace("_", " ").toLowerCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <Button 
                            onClick={openCreateModal}
                            className="w-full md:w-auto px-8"
                        >
                            <Icon name="add" size="sm" />
                            Agregar Producto
                        </Button>
                    </div>

                    {/* Content Table */}
                    {isLoading ? (
                        <div className="py-20">
                            <LoadingSpinner message="Sincronizando con base de datos..." />
                        </div>
                    ) : (
                        <AdminTable 
                            products={filteredProducts} 
                            onEdit={openEditModal}
                            onDelete={openDeleteModal}
                        />
                    )}
                </div>
            </div>

            {/* Modals outside constrained container to avoid z-index issues if any */}
            <ProductModal 
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onSave={handleSave}
                product={editingProduct}
            />

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="¿Eliminar Producto?"
                className="max-w-md"
            >
                <div className="space-y-6">
                    <p className="text-text-secondary">
                        Esta acción no se puede deshacer. El producto <span className="text-white font-bold inline">"{productToDelete?.name}"</span> será eliminado permanentemente de la base de datos.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            disabled={isSubmitting}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-1 h-12 rounded-xl border border-surface-border text-white font-bold hover:bg-white/5 transition-all cursor-pointer disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button 
                            disabled={isSubmitting}
                            onClick={handleDeleteProduct}
                            className="flex-1 h-12 rounded-xl bg-red-500 text-white font-black uppercase tracking-tight hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center"
                        >
                            {isSubmitting ? <LoadingSpinner message="" /> : "Eliminar"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
