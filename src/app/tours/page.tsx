"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Map } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";

const tours = [
    {
        title: "The South's Hidden Gem",
        desc: "From the Rochester Falls to the Gris Gris cliffs, discover the soulful South.",
        image: "/images/mauritius_south.jpg",
        duration: "8 Hours"
    },
    {
        title: "North Coast Elegance",
        desc: "Vibrant markets in Port Louis followed by the serene Pamplemousses Gardens.",
        image: "/images/port-louis-caudan.webp",
        duration: "7 Hours"
    }
];

export default function ToursPage() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile === null) return null;

    if (isMobile) {
        const mobileSections = [
            {
                id: "header",
                title: "Tours",
                component: (
                    <div className="proportional-section relative overflow-hidden text-center bg-brand-bronze text-white p-12 min-h-screen flex flex-col justify-center">
                        <div className="absolute inset-0 opacity-40">
                             <img src="/images/mauritius-oberoi-royal.webp" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-10 space-y-8">
                             <span className="inline-block px-4 py-1.5 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                                Curated Island Adventures
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display leading-[1.1]">
                                Curated <br /> Journeys
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Every tour is balanced with exploration and moments of profound serenity.
                            </p>
                        </div>
                    </div>
                )
            },
            ...tours.map((tour, i) => ({
                id: `tour-${i}`,
                title: tour.title,
                component: (
                    <div className="proportional-section bg-white p-10 min-h-screen flex flex-col justify-center space-y-8">
                        <div className="relative aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl">
                            <img src={tour.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest text-[10px]">
                                <Map className="w-4 h-4" />
                                <span>{tour.duration} Private Tour</span>
                            </div>
                            <h3 className="text-3xl font-display text-brand-bronze">{tour.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">{tour.desc}</p>
                            <button className="bg-brand-gold text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                View Itinerary
                            </button>
                        </div>
                    </div>
                )
            }))
        ];

        return <MobileLayout sections={mobileSections} />;
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <section id="st-section-tours-header" className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/mauritius-oberoi-royal.webp')" }}
                >
                    <div className="absolute inset-0 bg-brand-bronze/40" />
                </div>
                <div className="relative z-10 px-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8 font-bold text-white bg-brand-gold px-6 py-2 rounded-full shadow-lg inline-block"
                    >
                        Curated Island Adventures
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-display mb-8 text-white drop-shadow-2xl whitespace-nowrap"
                    >
                        Curated <span>Journeys</span>
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/90 drop-shadow-md">
                        Every tour is balanced with exploration and moments of profound serenity.
                    </p>
                </div>
            </section>

            <section id="st-section-tours-list" className="py-24 px-6 md:px-24 bg-pastel-warm">
                <div className="max-w-7xl mx-auto">
                    <div id="st-child-tours-list-container" className="space-y-32">
                        {tours.map((tour, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-32 items-center`}
                            >
                                <div className="flex-1 relative aspect-video w-full rounded-[60px] overflow-hidden group shadow-2xl">
                                    <img src={tour.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-brand-bronze/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-sm">
                                        <Map className="w-5 h-5" />
                                        <span>{tour.duration} Private Tour</span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-display text-brand-bronze">{tour.title}</h2>
                                    <p className="text-xl text-muted-foreground leading-relaxed">{tour.desc}</p>
                                    <button className="flex items-center gap-4 group text-lg font-bold text-brand-bronze">
                                        View Itinerary
                                        <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
