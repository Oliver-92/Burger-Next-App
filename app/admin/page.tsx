import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";

const ADMIN_LINKS = [
    {
        title: "Productos",
        description: "Gestiona el catálogo, precios y categorías.",
        href: "/admin/products",
        icon: "inventory_2",
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
    {
        title: "Usuarios",
        description: "Visualiza y gestiona la comunidad de clientes.",
        href: "/admin/users",
        icon: "group",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
    },
];

export default function AdminDashboard() {
    return (
        <div className="flex-1 flex flex-col pt-32 pb-12">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-10 lg:px-40">

                {/* Header */}
                <div className="mb-12 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-primary">
                        <div className="size-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Panel de Control</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-display leading-none">
                        Dashboard Administrativo
                    </h1>
                    <p className="text-text-secondary text-base md:text-lg max-w-2xl">
                        Bienvenido de nuevo. Aquí puedes gestionar todos los aspectos clave de BurgerBrand.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {ADMIN_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative p-8 rounded-2xl border border-surface-border bg-surface-dark hover:bg-background-dark transition-all duration-300 overflow-hidden"
                        >
                            {/* Hover effect background glow */}
                            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />

                            <div className="relative flex flex-col gap-6">
                                <div className={`size-14 rounded-xl ${link.bgColor} flex items-center justify-center ${link.color} border border-white/5`}>
                                    <Icon name={link.icon} size="lg" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        {link.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        {link.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest pt-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    Acceder <Icon name="arrow_forward" size="sm" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}