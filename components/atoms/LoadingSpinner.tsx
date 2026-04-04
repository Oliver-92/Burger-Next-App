import { cn } from "@/lib/utils";

/**
 * LoadingSpinner – presentational component.
 * Displays a centered animated spinner while async operations are in progress.
 * @param {string} [message] - Optional text displayed below the spinner.
 * @param {string} [className] - Additional classes for the container.
 */
export function LoadingSpinner({ 
    message = "Cargando...", 
    className 
}: { 
    message?: string; 
    className?: string;
}) {

    return (
        <div className={cn("flex flex-col items-center justify-center w-full flex-1 gap-5", className)}>

            {/* Spinner stack */}
            <div className="relative flex items-center justify-center">

                {/* Outer ring – slow, clockwise */}
                <div
                    className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-primary border-r-primary opacity-80 animate-spin"
                    style={{ animationDuration: "1.2s" }}
                />

                {/* Middle ring – faster, counter-clockwise */}
                <div
                    className="absolute w-16 h-16 rounded-full border-4 border-transparent border-b-background-light border-l-background-light opacity-50 animate-spin"
                    style={{ animationDuration: "0.8s", animationDirection: "reverse" }}
                />

                {/* Pulsing center dot */}
                <div
                    className="w-4 h-4 rounded-full bg-primary animate-ping opacity-75"
                    style={{ animationDuration: "1s" }}
                />
            </div>

            {/* Optional message */}
            {message && (
                <p className="text-sm text-text-secondary mt-5 font-bold uppercase tracking-widest animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );
}
