"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/lib/store/useCart";
import { OrderSummary } from "@/components/molecules/OrderSummary";
import { CheckoutForm } from "@/components/molecules/CheckoutForm";
import { createInitialOrder } from "@/app/actions/orders";
import { executePayment } from "@/app/actions/payments";
import { getCurrentUserProfile } from "@/app/actions/user";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import type { OrderStatus, UserProfile } from "@/lib/types";

export default function CheckoutPage() {
    const items = useCartStore((state) => state.items);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const clearCart = useCartStore((state) => state.clearCart);
    const router = useRouter();

    const [status, setStatus] = useState<OrderStatus | "idle">("idle");
    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthAndProfile = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.push("/login?redirect=/checkout");
                return;
            }

            // Fetch profile data for pre-filling
            const userProfile = await getCurrentUserProfile();
            setProfile(userProfile);
            setIsLoading(false);
        };
        checkAuthAndProfile();
    }, [router]);

    const handleCheckout = async (formData: any) => {
        setError(null);
        setStatus("processing");

        try {
            // 1. Create order in 'pending' status
            const orderRes = await createInitialOrder(items, totalPrice);
            if (!orderRes.success) throw new Error(orderRes.error);

            setOrderId(orderRes.orderId!);

            // 2. Execute Payment Simulation
            const paymentRes = await executePayment(orderRes.orderId!);
            if (!paymentRes.success) throw new Error(paymentRes.error);

            setStatus(paymentRes.status as OrderStatus);

            // 3. If paid, clear local cart
            if (paymentRes.status === "paid") {
                clearCart();
            }
        } catch (err: any) {
            setError(err.message);
            setStatus("failed");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-dark pt-32 pb-12">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-primary font-bold uppercase tracking-widest text-xs">Cargando Checkout...</p>
                </div>
            </div>
        );
    }

    if (items.length === 0 && status === "idle") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-dark pt-32 pb-12 px-4">
                <Icon name="shopping_cart" size="xl" className="text-surface-border mb-6" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 text-center">Tu carrito está vacío</h2>
                <Link href="/menu">
                    <Button variant="primary" className="h-14 px-8 uppercase tracking-widest font-black italic">
                        Ir al Menú
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background-dark pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-40">
                
                {/* Flow Title */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-primary mb-4">
                        <Icon name="verified" size="sm" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Pago Seguro</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Side: Form or Status */}
                    <div className="lg:col-span-7">
                        {(status === "idle" || status === "processing" && !error) ? (
                            <div className="p-8 md:p-10 rounded-3xl border border-surface-border bg-surface-dark shadow-2xl relative overflow-hidden">
                                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                                    Checkout
                                </h1>
                                <CheckoutForm 
                                    onSubmit={handleCheckout} 
                                    isLoading={status === "processing"} 
                                    initialData={profile}
                                />
                                
                                {status === "processing" && (
                                    <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-10 text-center animate-in fade-in duration-500">
                                        <div className="size-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8" />
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Procesando Pago</h3>
                                        <p className="text-text-secondary text-sm max-w-xs">
                                            Estamos validando tu transacción con BurgerBank. Por favor no cierres esta ventana.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <PaymentStatusView status={status} error={error} orderId={orderId} />
                        )}
                    </div>

                    {/* Right Side: Summary */}
                    <div className="lg:col-span-5 sticky top-32">
                        <OrderSummary />
                        {/* Security Badge */}
                        <div className="mt-8 flex items-center justify-center gap-4 opacity-50">
                            <Icon name="shield" size="lg" className="text-white" />
                            <Icon name="lock" size="lg" className="text-white" />
                            <Icon name="credit_card" size="lg" className="text-white" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function PaymentStatusView({ status, error, orderId }: { status: OrderStatus | "idle", error: string | null, orderId: string | null }) {
    
    if (status === "paid") {
        return (
            <div className="p-12 rounded-3xl bg-primary/5 border-2 border-primary flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500">
                <div className="size-24 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-[0_0_50px_rgba(54,226,123,0.5)]">
                    <Icon name="check_circle" size="xl" />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">¡Pago Exitoso!</h2>
                    <p className="text-text-secondary">Tu pedido ha sido confirmado. Estamos preparando el carbón.</p>
                </div>
                <div className="bg-surface-dark px-6 py-4 rounded-2xl border border-surface-border w-full flex justify-between items-center">
                    <span className="text-xs font-bold text-text-secondary uppercase">ID de Orden</span>
                    <span className="text-sm font-mono text-primary">{orderId?.split("-")[0]}...</span>
                </div>
                <Link href="/perfil">
                    <Button variant="primary" className="h-14 px-10 uppercase tracking-widest font-black italic">Ver mis pedidos</Button>
                </Link>
            </div>
        );
    }

    if (status === "failed" || error) {
        return (
            <div className="p-12 rounded-3xl bg-red-500/5 border-2 border-red-500 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500">
                <div className="size-24 rounded-full bg-red-500 flex items-center justify-center text-white shadow-[0_0_50px_rgba(239,68,68,0.5)] font-black">
                    <Icon name="error" size="xl" />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">Pago Fallido</h2>
                    <p className="text-red-400 font-medium">{error || "Hubo un error al procesar tu tarjeta. Por favor intenta de nuevo."}</p>
                </div>
                <Button 
                    onClick={() => window.location.reload()}
                    variant="secondary" 
                    className="h-14 px-10 uppercase tracking-widest font-black italic"
                >
                    Reintentar Pago
                </Button>
            </div>
        );
    }

    if (status === "pending") {
        return (
            <div className="p-12 rounded-3xl bg-amber-500/5 border-2 border-amber-500 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500">
                <div className="size-24 rounded-full bg-amber-500 flex items-center justify-center text-background-dark shadow-[0_0_50px_rgba(245,158,11,0.5)]">
                    <Icon name="history" size="xl" />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">Pago Pendiente</h2>
                    <p className="text-amber-200">Tu banco requiere una verificación adicional. Revisaremos el estado en unos minutos.</p>
                </div>
                <Link href="/menu">
                    <Button variant="secondary" className="h-14 px-10 uppercase tracking-widest font-black italic">Seguir comprando</Button>
                </Link>
            </div>
        );
    }

    return null;
}
