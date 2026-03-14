import { Icon } from "@/components/atoms/Icon";
import type { Feature } from "@/lib/types";

interface FeatureCardProps {
    feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
    return (
        <div className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border hover:border-primary/50 transition-colors">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Icon name={feature.icon} size="md" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-text-secondary leading-relaxed">
                {feature.description}
            </p>
        </div>
    );
}
