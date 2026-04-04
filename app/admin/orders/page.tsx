import { getAdminOrders } from "@/app/actions/admin";
import { Icon } from "@/components/atoms/Icon";
import { OrderStatusBadge } from "@/components/atoms/OrderStatusBadge";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function AdminOrdersPage() {
    const orders = await getAdminOrders();

    return (
        <div className="flex-1 flex flex-col pt-32 pb-24">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-10 lg:px-40">

                {/* Breadcrumbs & Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex flex-col gap-3">
                        <Link href="/admin" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">
                            <Icon name="arrow_back" size="sm" /> Volver al Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                            Historial de Pedidos
                        </h1>
                    </div>
                </div>

                {/* Table Container */}
                <div className="rounded-3xl border border-surface-border bg-surface-dark/50 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-surface-border bg-surface-dark font-black text-[10px] text-text-secondary uppercase tracking-[0.2em]">
                                    <th className="px-6 py-5">Orden ID</th>
                                    <th className="px-6 py-5">Fecha</th>
                                    <th className="px-6 py-5">Cliente</th>
                                    <th className="px-6 py-5">Total</th>
                                    <th className="px-6 py-5 text-center">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-border">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-50">
                                                <Icon name="receipt_long" size="lg" />
                                                <p className="text-sm font-bold uppercase tracking-widest">No hay pedidos registrados</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order: any) => (
                                        <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-5">
                                                <span className="font-mono text-xs text-primary font-bold">#{order.id.split("-")[0].toUpperCase()}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-white font-medium">
                                                        {format(new Date(order.created_at), "d 'de' MMMM", { locale: es })}
                                                    </span>
                                                    <span className="text-[10px] text-text-secondary uppercase">
                                                        {format(new Date(order.created_at), "HH:mm 'hs'", { locale: es })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-white font-bold">
                                                        {order.users?.first_name} {order.users?.last_name}
                                                    </span>
                                                    <span className="text-xs text-text-secondary">
                                                        {order.users?.email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 font-black text-white italic tracking-tighter">
                                                ${Number(order.total).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <OrderStatusBadge status={order.status} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 flex items-center justify-between px-6">
                    <p className="text-xs text-text-secondary uppercase font-bold tracking-widest">
                        Mostrando <span className="text-white">{orders.length}</span> pedidos totales
                    </p>
                </div>

            </div>
        </div>
    );
}
