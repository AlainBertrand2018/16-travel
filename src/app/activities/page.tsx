"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Waves, Mountain, Wind, Sun } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";

const activities = [
    {
        title: "Le Morne Summit Hike",
        desc: "A spiritual and physical climb to the UNESCO World Heritage site.",
        icon: <Mountain />,
        image: "https://sixteen-travel.vercel.app/images/le_Morne_hiking.avif"
    },
    {
        title: "Private Catamaran Cruise",
        desc: "Sail the crystal lagoons with your personal chef and crew.",
        icon: <Waves />,
        image: "https://sixteen-travel.vercel.app/images/mru-catamaran-ileauxCerfs.webp"
    },
    {
        title: "Eco Forest Exploration",
        desc: "Discover endemic species in the heart of Black River Gorges.",
        icon: <Sun />,
        image: "/images/Ferney-Gardens.webp"
    },
    {
        title: "Kitesurfing Le Morne",
        desc: "World-class conditions for the ultimate adrenaline rush.",
        icon: <Wind />,
        image: "/images/Kitesurfing_in_Mauritius.webp"
    }
];

export default function ActivitiesPage() {
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
                title: "Activities",
                component: (
                    <div className="proportional-section relative overflow-hidden text-center bg-brand-bronze text-white p-12 min-h-screen flex flex-col justify-center">
                        <div className="absolute inset-0 opacity-40">
                             <img src="/images/chamarel-7couleurs.webp" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-10 space-y-8">
                             <span className="inline-block px-4 py-1.5 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                                Essential Island Activities
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display leading-[1.1]">
                                Island <br /> Soul
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                From the heights of Le Morne to the depths of the Indian Ocean.
                            </p>
                        </div>
                    </div>
                )
            },
            ...activities.map((act, i) => ({
                id: `activity-${i}`,
                title: act.title,
                component: (
                    <div className="proportional-section bg-pastel-gold p-10 min-h-screen flex flex-col justify-center space-y-8">
                        <div className="relative aspect-square w-full rounded-[40px] overflow-hidden shadow-2xl">
                            <img src={act.image} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-brand-bronze/20" />
                            <div className="absolute top-6 left-6 w-14 h-14 glass rounded-2xl flex items-center justify-center text-brand-gold">
                                {act.icon}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-display text-brand-bronze">{act.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">{act.desc}</p>
                            <button className="bg-brand-gold text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                More Details
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
            <section id="st-section-activities-header" className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/chamarel-7couleurs.webp')" }}
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
                        Essential Island Activities
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-display mb-8 text-white drop-shadow-2xl whitespace-nowrap"
                    >
                        Island <span>Soul</span>
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white/90 drop-shadow-md">
                        From the heights of Le Morne to the depths of the Indian Ocean.
                    </p>
                </div>
            </section>

            <section id="st-section-activities-grid" className="py-24 px-6 md:px-24 bg-pastel-gold">
                <div className="max-w-7xl mx-auto">
                    <div id="st-child-activities-grid-container" className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {activities.map((act, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-square rounded-[60px] overflow-hidden shadow-2xl"
                            >
                                <img src={act.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-brand-bronze/40 group-hover:bg-brand-bronze/20 transition-colors" />
                                <div className="absolute inset-x-12 bottom-12 text-white">
                                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 text-brand-gold shadow-lg">
                                        {act.icon}
                                    </div>
                                    <h3 className="text-4xl font-display mb-4">{act.title}</h3>
                                    <p className="text-lg opacity-80 max-w-sm">{act.desc}</p>
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
