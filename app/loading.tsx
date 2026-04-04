import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";

/**
 * Loading page for Next.js Suspense.
 * Uses the LoadingSpinner atom to maintain UI consistency.
 */
export default function Loading() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] bg-background-light dark:bg-background-dark transition-colors duration-500">
            <LoadingSpinner message="Preparando tu experiencia urbana..." />
        </div>
    );
}