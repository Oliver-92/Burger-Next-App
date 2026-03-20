import Link from "next/link";
import { NavLogo } from "@/components/molecules/NavLogo";
import { NavActions } from "@/components/molecules/NavActions";
import { MobileMenu } from "@/components/molecules/MobileMenu";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full px-4 py-4 md:px-10 lg:px-40 bg-background-light/80 dark:bg-background-dark/80 border-b border-surface-border">
            <div className="flex items-center justify-between gap-4">
                <NavLogo />

                <div className="flex items-center gap-2 md:gap-4">
                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8 mr-8">
                        <Link
                            href="/menu"
                            className="text-slate-600 dark:text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
                        >
                            Menú
                        </Link>
                        <Link
                            href="/ubicaciones"
                            className="text-slate-600 dark:text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
                        >
                            Ubicaciones
                        </Link>
                        <Link
                            href="/nosotros"
                            className="text-slate-600 dark:text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
                        >
                            Nosotros
                        </Link>
                    </nav>

                    <NavActions />
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
}
