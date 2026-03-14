import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import { CustomerAvatars } from "@/components/molecules/CustomerAvatars";
import { HERO_BANNER_IMAGE, CUSTOMER_AVATARS } from "@/lib/data";

export function HeroSection() {
    return (
        <section className="relative px-4 py-8 lg:px-40 lg:py-12 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute -left-20 top-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="flex flex-col gap-6 lg:gap-8 z-10 order-2 lg:order-1">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit">
                        <Icon name="local_fire_department" className="text-primary text-sm" size="sm" />
                        <span className="text-primary text-xs font-bold uppercase tracking-wider">
                            Nuevo Lanzamiento
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                        Sabor Urbano <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">
                            Real.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-slate-600 dark:text-text-secondary max-w-md font-medium">
                        Carne 100% Angus premium, queso Gouda ahumado y pan brioche horneado
                        hoy. La hamburguesa definitiva ha llegado a la ciudad.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <Button variant="primary">
                            <span>PEDIR AHORA</span>
                            <Icon name="arrow_forward" size="md" />
                        </Button>
                        <Link href="/menu">
                            <Button variant="secondary">Ver Menú Completo</Button>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <CustomerAvatars
                        avatars={CUSTOMER_AVATARS}
                        totalCount="+2k"
                        rating={5}
                        label="Clientes satisfechos"
                    />
                </div>

                {/* Hero Image */}
                <div className="relative z-10 flex justify-center order-1 lg:order-2">
                    <div className="relative group cursor-pointer">
                        {/* Price tag */}
                        <div className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl z-20 shadow-xl animate-float">
                            <div className="flex flex-col items-center">
                                <span className="text-xs font-bold text-primary uppercase">
                                    Sólo hoy
                                </span>
                                <span className="text-2xl font-black text-white">$12.99</span>
                            </div>
                        </div>

                        {/* Burger Image */}
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJFhNiPI-xilHvyT-WN6fY5YEO3d4MzsW_sIga39uvS3T09Ix4dw8Yk4X8fScTZg7bVWy9HjSqK5oXcg_ul5vtQGu-K_HFyNRl59lpQHAzwHusDBtLug8b8vghsmW1a4sLR3_6pK5UI_-yXoXpaA8IUdjTv4sEtlsPpqDV7TpqVPnd8hEwKG9-E3eZcwTPrJxhr7bSPBATaTc6cEhxztO4tvVm1qaurfBtbM53VR3T4jcdkGlO5IcS6OZglx3nEHldny4T4So7RCIX"
                            alt="Hamburguesa con queso derretido, lechuga fresca y doble carne"
                            width={500}
                            height={500}
                            className="w-full max-w-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 hover:scale-105 hover:rotate-2"
                            priority
                        />

                        {/* Floating Ingredient Tags */}
                        <div className="absolute top-[20%] left-0 -translate-x-4 bg-surface-dark/90 backdrop-blur border border-primary/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                            <div className="size-2 rounded-full bg-primary" />
                            <span className="text-xs font-bold text-white">100% Angus</span>
                        </div>

                        <div className="absolute bottom-[20%] right-0 translate-x-4 bg-surface-dark/90 backdrop-blur border border-primary/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                            <div className="size-2 rounded-full bg-yellow-400" />
                            <span className="text-xs font-bold text-white">Queso Gouda</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
