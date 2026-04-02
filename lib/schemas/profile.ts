import { z } from "zod";

export const profileSchema = z.object({
    first_name: z
        .string()
        .min(1, { error: "El nombre es requerido" })
        .max(50, { error: "El nombre no puede superar los 50 caracteres" }),
    last_name: z
        .string()
        .min(1, { error: "El apellido es requerido" })
        .max(50, { error: "El apellido no puede superar los 50 caracteres" }),
    age: z
        .coerce.number({ error: "La edad debe ser un número" })
        .int({ error: "La edad debe ser un número entero" })
        .min(1, { error: "La edad debe ser mayor a 0" })
        .max(120, { error: "La edad no puede superar los 120 años" }),
    phone: z
        .string()
        .min(6, { error: "El teléfono debe tener al menos 6 dígitos" })
        .max(20, { error: "El teléfono no puede superar los 20 caracteres" })
        .regex(/^[+\d\s\-()]+$/, { message: "El teléfono solo puede contener números, +, -, () y espacios" }),
    address: z
        .string()
        .min(5, { error: "La dirección debe tener al menos 5 caracteres" })
        .max(150, { error: "La dirección no puede superar los 150 caracteres" }),
});

export type ProfileFormData = z.input<typeof profileSchema>;
export type ProfileOutput = z.output<typeof profileSchema>;
