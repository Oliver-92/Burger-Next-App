import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";

export function Footer() {
    return (
        <footer className="bg-surface-dark py-8 px-4 lg:px-40 border-t border-surface-border">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2 text-white">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-background-dark">
                        <Icon name="lunch_dining" size="sm" />
                    </div>
                    <span className="text-lg font-bold">BurgerBrand</span>
                </div>

                {/* Copyright */}
                <p className="text-text-secondary text-sm">
                    © 2023 BurgerBrand. Todos los derechos reservados.
                </p>

                {/* Social Links */}
                <div className="flex gap-4">
                    <Link
                        href="#"
                        className="text-text-secondary hover:text-primary transition-colors"
                        aria-label="Sitio web"
                    >
                        <Icon name="public" size="md" />
                    </Link>
                    <Link
                        href="#"
                        className="text-text-secondary hover:text-primary transition-colors"
                        aria-label="Email"
                    >
                        <Icon name="alternate_email" size="md" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
