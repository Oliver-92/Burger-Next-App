import { Icon } from "@/components/atoms/Icon";
import { Value } from "@/lib/types";

interface ValueCardProps {
    value: Value;
}

export function ValueCard({ value }: ValueCardProps) {
    return (
        <article className="p-8 rounded-3xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border hover:border-primary transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Icon name={value.icon} className="text-primary group-hover:text-background-dark transition-colors" size="md" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                {value.title}
            </h3>
            <p className="text-slate-500 dark:text-text-secondary leading-relaxed">
                {value.description}
            </p>
        </article>
    );
}
