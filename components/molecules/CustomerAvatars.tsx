import Image from "next/image";
import type { CustomerAvatar } from "@/lib/types";
import { Icon } from "@/components/atoms/Icon";

interface CustomerAvatarsProps {
    avatars: CustomerAvatar[];
    totalCount: string;
    rating: number;
    label: string;
}

export function CustomerAvatars({
    avatars,
    totalCount,
    rating,
    label,
}: CustomerAvatarsProps) {
    return (
        <div className="flex items-center gap-6 pt-6 border-t border-slate-200 dark:border-surface-border mt-2">
            {/* Stacked avatars */}
            <div className="flex -space-x-3">
                {avatars.map((avatar) => (
                    <Image
                        key={avatar.src}
                        src={avatar.src}
                        alt={avatar.alt}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover"
                    />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-surface-dark flex items-center justify-center text-xs font-bold text-white">
                    {totalCount}
                </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: rating }).map((_, i) => (
                        <Icon key={i} name="star" size="sm" />
                    ))}
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-text-secondary">
                    {label}
                </span>
            </div>
        </div>
    );
}
