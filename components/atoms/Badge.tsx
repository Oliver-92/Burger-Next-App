import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

interface BadgeProps {
    label: string;
    icon?: string;
    variant?: "primary" | "dark" | "green" | "spicy" | "vegan";
    className?: string;
}

export function Badge({
    label,
    icon,
    variant = "primary",
    className,
}: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold",
                variant === "primary" &&
                "border border-primary/30 bg-primary/10 text-primary",
                variant === "dark" && "bg-background-dark/80 backdrop-blur text-white",
                variant === "green" && "bg-green-600/90 backdrop-blur text-white",
                variant === "spicy" && "bg-orange-600/90 backdrop-blur text-white shadow-[0_0_10px_rgba(234,88,12,0.4)]",
                variant === "vegan" && "bg-green-500/90 backdrop-blur text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]",
                className
            )}
        >
            {icon && (
                <Icon name={icon} size="sm" className="text-[12px]!" />
            )}
            {label}
        </div>
    );
}
