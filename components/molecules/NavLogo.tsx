import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";

export function NavLogo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 dark:text-white hover:opacity-90 transition-opacity"
        >
            <div className="flex items-center justify-center size-10 rounded-full bg-primary text-background-dark">
                <Icon name="lunch_dining" size="lg" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">BurgerBrand</h2>
        </Link>
    );
}
