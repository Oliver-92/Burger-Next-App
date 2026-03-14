interface MenuHeroBannerProps {
    imageUrl: string;
}

export function MenuHeroBanner({ imageUrl }: MenuHeroBannerProps) {
    return (
        <div className="w-full px-4 md:px-10 py-6 max-w-[1280px] mx-auto">
            <div className="relative w-full overflow-hidden rounded-xl bg-surface-dark min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                {/* Background Image with gradient overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(17,33,23,0.7) 0%, rgba(17,33,23,0.4) 100%), url('${imageUrl}')`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center p-6 gap-4 max-w-2xl">
                    <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/30 uppercase tracking-wider">
                        Artesanal &amp; Premium
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                        Sabor hecho para el{" "}
                        <span className="text-primary">Alma Urbana</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl font-normal max-w-lg mx-auto">
                        Las mejores hamburguesas artesanales de la ciudad. Elaboradas con
                        ingredientes locales y mucha pasión.
                    </p>
                </div>
            </div>
        </div>
    );
}
