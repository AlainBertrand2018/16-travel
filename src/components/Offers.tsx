"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const packages = [
    {
        order: "01",
        title: "Le Sud-Ouest Sauvage",
        category: "Adventure & Nature",
        description: "Explore the wild south-west. From the Seven Colored Earths to the hidden waterfalls of Chamarel, experience the untamed beauty of the island.",
        image: "https://sixteen-travel.vercel.app/images/7couleurs.jpg"
    },
    {
        order: "02",
        title: "L'Est Turquoise",
        category: "Luxe & Serenity",
        description: "Sail towards the sunrise. Private island picnics at Île aux Cerfs and exclusive snorkeling in the crystal clear lagoons of the East.",
        image: "https://sixteen-travel.vercel.app/images/south-east.jpg"
    }
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0], index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 100 : -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <div ref={ref} className="relative mb-32 last:mb-0">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
                {/* Large Image with parallax */}
                <motion.div
                    style={{ y, scale }}
                    className="flex-1 relative aspect-[4/5] w-full rounded-[40px] overflow-hidden shadow-2xl"
                >
                    <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-bronze/10 hover:bg-transparent transition-colors duration-500" />
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 text-left space-y-6">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-6xl md:text-9xl font-display font-bold block leading-none opacity-20 text-brand-gold"
                    >
                        {pkg.order}
                    </motion.span>
                    <div className="space-y-4">
                        <p className="uppercase tracking-widest font-bold text-sm text-brand-gold">{pkg.category}</p>
                        <h3 className="text-4xl md:text-6xl font-display text-brand-bronze">{pkg.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                            {pkg.description}
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-4 text-lg font-medium group text-brand-bronze"
                    >
                        Explore Package
                        <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export function Offers() {
    return (
        <section className="relative py-24 px-6 md:px-24" id="tours">
            {/* Layer 1: Background Plate */}
            <div className="absolute inset-0 bg-pastel-warm -z-20" />

            <div className="relative z-20 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-display mb-6 italic text-brand-bronze">Signature <br /> Collections</h2>
                        <p className="text-muted-foreground text-xl">
                            Hand-picked journeys designed by our destination specialists for the most discerning travelers.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <button className="text-brand-gold border-b-2 border-brand-gold/20 hover:border-brand-gold pb-1 font-bold text-sm uppercase tracking-widest transition-all">
                            View All Packages
                        </button>
                    </div>
                </div>

                <div>
                    {packages.map((pkg, index) => (
                        <PackageCard key={pkg.order} pkg={pkg} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
