import Image from "next/image";
import { ValueCard } from "@/components/molecules/ValueCard";
import { AboutContent } from "@/lib/types";

interface AboutStoryProps {
    content: AboutContent;
}

export function AboutStory({ content }: AboutStoryProps) {
    return (
        <section className="py-24 px-4 md:px-10 lg:px-40 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image side */}
                <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-slate-200 dark:border-surface-border">
                    <Image
                        src={content.storyImage}
                        alt="BurgerBrand Story"
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background-dark/60 to-transparent" />
                    <div className="absolute bottom-10 left-10">
                        <p className="text-primary font-black text-6xl md:text-8xl opacity-20 uppercase">Est. 2023</p>
                    </div>
                </div>

                {/* Text side */}
                <div>
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Desde las calles</p>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter leading-none">
                        {content.storyTitle}
                    </h2>
                    <div className="space-y-6">
                        {content.storyContent.map((paragraph, idx) => (
                            <p key={idx} className="text-slate-500 dark:text-text-secondary text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values subsection */}
            <div className="mt-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
                        {content.valuesTitle}
                    </h2>
                    <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.values.map((value) => (
                        <ValueCard key={value.id} value={value} />
                    ))}
                </div>
            </div>
        </section>
    );
}
