"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/lib/schemas/product";
import { mapBadge } from "@/lib/utils";
import type { Product } from "@/lib/types";

// Fetch products for admin (unfiltered)
export async function getAdminProducts(): Promise<Product[]> {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            *,
            categories (
                slug
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching admin products:", error);
        return [];
    }

    return (products || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        image: p.image,
        category: p.categories?.slug || "all",
        featured: p.featured,
        badge: mapBadge(p.badge),
    }));
}

// Save (Create or Update) product
export async function saveProduct(formData: any, id?: string) {
    const supabase = await createClient();

    // 1. Validation
    const validatedFields = productSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            error: "Datos inválidos. Por favor revisa el formulario.",
            details: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { category, ...data } = validatedFields.data;

    // 2. Map category slug to category_id
    const { data: categoryData, error: catError } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", category)
        .single();

    if (catError || !categoryData) {
        return { error: "Categoría no encontrada." };
    }

    // 3. Upsert product
    const productPayload = {
        ...data,
        category_id: categoryData.id,
    };

    if (id) {
        // Update
        const { error: updateError } = await supabase
            .from("products")
            .update(productPayload)
            .eq("id", id);

        if (updateError) {
            console.error("Error updating product:", updateError);
            return { error: "No se pudo actualizar el producto." };
        }
    } else {
        // Create
        const { error: insertError } = await supabase
            .from("products")
            .insert(productPayload);

        if (insertError) {
            console.error("Error creating product:", insertError);
            return { error: "No se pudo crear el producto." };
        }
    }

    revalidatePath("/admin/products");
    revalidatePath("/menu");
    revalidatePath("/");
    
    return { success: true };
}

// Delete product
export async function deleteProduct(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting product:", error);
        return { error: "No se pudo eliminar el producto." };
    }

    revalidatePath("/admin/products");
    revalidatePath("/menu");
    revalidatePath("/");

    return { success: true };
}
