import { cn } from "@/lib/utils";

const BUTTON_VARIANT = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    GHOST: "ghost",
    ICON: "icon",
    LIGHT: "light",
} as const;

type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
    className?: string;
}

export function Button({
    variant = "primary",
    children,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "transition-all font-bold cursor-pointer",
                variant === "primary" &&
                "h-14 px-8 rounded-full bg-primary text-background-dark hover:bg-primary/90 hover:scale-105 shadow-[0_4px_20px_rgba(54,226,123,0.4)] flex items-center gap-2",
                variant === "secondary" &&
                "h-14 px-8 rounded-full border border-slate-300 dark:border-surface-border text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-surface-border",
                variant === "ghost" &&
                "h-10 px-4 rounded-full bg-gray-200 dark:bg-surface-border text-slate-900 dark:text-white hover:bg-gray-300 dark:hover:opacity-80 text-sm",
                variant === "icon" &&
                "size-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-surface-border text-slate-900 dark:text-white hover:bg-gray-300 dark:hover:opacity-80",
                variant === "light" &&
                "h-12 px-8 rounded-full bg-white text-background-dark hover:bg-primary active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-primary/20",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
