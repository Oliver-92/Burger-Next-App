import { z } from "zod";

export const checkoutSchema = z.object({
    cardholderName: z.string().min(3, "El nombre del titular es requerido"),
    cardNumber: z.string().regex(/^\d{16}$/, "El número de tarjeta debe tener 16 dígitos"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/YY)"),
    cvv: z.string().regex(/^\d{3,4}$/, "CVV inválido (3 o 4 dígitos)"),
    address: z.string().min(10, "La dirección de entrega es requerida (mín. 10 caracteres)"),
    phone: z.string().min(8, "Número de teléfono inválido"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
