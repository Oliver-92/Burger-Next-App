import { cn } from "@/lib/utils";

interface IconProps {
    name: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
};

export function Icon({ name, className, size = "md" }: IconProps) {
    return (
        <span
            className={cn("material-symbols-outlined", sizeMap[size], className)}
        >
            {name}
        </span>
    );
}
