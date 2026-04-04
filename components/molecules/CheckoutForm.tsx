"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormValues, checkoutSchema } from "@/lib/schemas/checkout";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import type { UserProfile } from "@/lib/types";

interface CheckoutFormProps {
    onSubmit: (data: CheckoutFormValues) => void;
    isLoading: boolean;
    initialData?: UserProfile | null;
}

export function CheckoutForm({ onSubmit, isLoading, initialData }: CheckoutFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            cardholderName: initialData ? `${initialData.first_name} ${initialData.last_name}`.toUpperCase() : "",
            address: initialData?.address || "",
            phone: initialData?.phone || "",
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

            {/* Delivery Info */}
            <div className="flex flex-col gap-6">
                <h3 className="text-sm font-black text-primary uppercase tracking-widest border-b border-surface-border pb-2 inline-flex items-center gap-2">
                    <Icon name="delivery_dining" size="sm" /> 1. Entrega
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-text-secondary uppercase">Dirección completa</label>
                        <input
                            {...register("address")}
                            className={`h-12 px-4 rounded-xl bg-surface-dark border ${errors.address ? "border-red-500" : "border-surface-border"} text-white focus:border-primary outline-none transition-all`}
                            placeholder="Av. Principal 123, Depto 4B"
                        />
                        {errors.address && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.address.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-text-secondary uppercase">Teléfono de contacto</label>
                        <input
                            {...register("phone")}
                            className={`h-12 px-4 rounded-xl bg-surface-dark border ${errors.phone ? "border-red-500" : "border-surface-border"} text-white focus:border-primary outline-none transition-all`}
                            placeholder="+54 9 11 1234-5678"
                        />
                        {errors.phone && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.phone.message}</p>}
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="flex flex-col gap-6">
                <h3 className="text-sm font-black text-primary uppercase tracking-widest border-b border-surface-border pb-2 inline-flex items-center gap-2">
                    <Icon name="payments" size="sm" /> 2. Pago
                </h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-text-secondary uppercase">Nombre en la tarjeta</label>
                        <input
                            {...register("cardholderName")}
                            className={`h-12 px-4 rounded-xl bg-surface-dark border ${errors.cardholderName ? "border-red-500" : "border-surface-border"} text-white focus:border-primary outline-none transition-all`}
                            placeholder="JUAN PEREZ"
                        />
                        {errors.cardholderName && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.cardholderName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-text-secondary uppercase">Número de tarjeta</label>
                        <input
                            {...register("cardNumber")}
                            maxLength={16}
                            className={`h-12 px-4 rounded-xl bg-surface-dark border ${errors.cardNumber ? "border-red-500" : "border-surface-border"} text-white focus:border-primary outline-none transition-all tracking-widest`}
                            placeholder="0000 0000 0000 0000"
                        />
                        {errors.cardNumber && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.cardNumber.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text-secondary uppercase">Vencimiento</label>
                            <input
                                {...register("expiryDate")}
                                className={`h-12 px-4 rounded-xl bg-surface-dark border ${errors.expiryDate ? "border-red-500" : "border-surface-border"} text-white focus:border-primary outline-none transition-all`}
                                placeholder="MM/YY"
                            />
                            {errors.expiryDate && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.expiryDate.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text-secondary uppercase">CVV</label>
                            <input
                                {...register("cvv")}
                                maxLength={4}
                                className={`h-12 px-4 rounded-xl bg-surface-dark border ${errors.cvv ? "border-red-500" : "border-surface-border"} text-white focus:border-primary outline-none transition-all`}
                                placeholder="123"
                            />
                            {errors.cvv && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.cvv.message}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                className="h-16 text-lg flex items-center justify-center uppercase tracking-widest mt-4 font-black italic shadow-2xl"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="size-4 border-2 border-background-dark border-t-transparent rounded-full animate-spin" />
                        Procesando...
                    </div>
                ) : (
                    "Confirmar Pago"
                )}
            </Button>

            <p className="text-[10px] text-text-secondary text-center uppercase tracking-wider">
                Certificado por <span className="text-primary font-bold">BurgerSecurity SSL</span>
            </p>
        </form>
    );
}
