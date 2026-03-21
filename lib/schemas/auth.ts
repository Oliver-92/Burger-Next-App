import { z } from "zod";

export const loginSchema = z.object({
    email: z.email({ error: "El email no es válido" }),
    password: z.string().min(1, { error: "La contraseña es requerida" }),
});

export const registerSchema = z
    .object({
        name: z.string().min(2, { error: "El nombre debe tener al menos 2 caracteres" }),
        email: z.email({ error: "El email no es válido" }),
        password: z
            .string()
            .min(8, { error: "La contraseña debe tener al menos 8 caracteres" })
            .refine((val) => /[A-Z]/.test(val), {
                message: "Debe contener al menos una letra mayúscula",
            })
            .refine((val) => /[0-9]/.test(val), {
                message: "Debe contener al menos un número",
            }),
        confirmPassword: z.string().min(1, { error: "Confirma tu contraseña" }),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Las contraseñas no coinciden",
                path: ["confirmPassword"],
            });
        }
    });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
