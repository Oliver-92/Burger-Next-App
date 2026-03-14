"use client";

interface FloatingCartProps {
    itemCount: number;
    total: number;
}

export function FloatingCart({ itemCount, total }: FloatingCartProps) {
    const formattedTotal = `$${total.toFixed(2)}`;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:hidden z-50">
            <button className="flex w-full items-center justify-between overflow-hidden rounded-full h-14 px-6 bg-primary text-background-dark shadow-xl hover:bg-primary/90 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 font-bold">
                    <div className="bg-background-dark text-primary size-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {itemCount}
                    </div>
                    <span>Ver carrito</span>
                </div>
                <span className="font-bold text-lg">{formattedTotal}</span>
            </button>
        </div>
    );
}
