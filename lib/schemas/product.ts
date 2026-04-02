import { z } from "zod";
import { MENU_CATEGORY } from "@/lib/types";

export const productSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    price: z.number().positive("El precio debe ser un número positivo"),
    image: z.string().url("La URL de la imagen no es válida"),
    category: z.nativeEnum(MENU_CATEGORY as any),
    featured: z.boolean().optional().default(false),
    badge: z.string().optional().nullable(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
