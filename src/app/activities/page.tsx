"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Waves, Mountain, Wind, Sun } from "lucide-react";

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
    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
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
                        Island <span className="italic">Soul</span>
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-light italic max-w-3xl mx-auto text-white/90 drop-shadow-md">
                        From the heights of Le Morne to the depths of the Indian Ocean.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 md:px-24 bg-pastel-gold">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
