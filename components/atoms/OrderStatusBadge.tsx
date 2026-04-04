import { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; classes: string }> = {
    pending: {
        label: "Pendiente",
        classes: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    },
    processing: {
        label: "Procesando",
        classes: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    },
    paid: {
        label: "Pagado",
        classes: "bg-primary/10 text-primary border-primary/20",
    },
    failed: {
        label: "Fallido",
        classes: "bg-red-400/10 text-red-400 border-red-400/20",
    },
};

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={cn(
            "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border",
            config.classes,
            className
        )}>
            {config.label}
        </span>
    );
}
