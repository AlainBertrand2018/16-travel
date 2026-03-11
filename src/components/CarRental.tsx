"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";

const cars = [
    {
        id: 1,
        name: "Private Car",
        type: "Family SUV",
        image: "/images/16_suv_5-7.webp",
        features: ["with or without Chauffeur", "A/C", "5-7 Seats"]
    },
    {
        id: 2,
        name: "Executive Car",
        type: "Fully Executive",
        image: "/images/16_exec_5-7.webp",
        features: ["with or without Chauffeur", "A/C", "5-7 Seats"]
    },
    {
        id: 3,
        name: "Executive Minivan",
        type: "Extended Luggage Capacity",
        image: "/images/16_minivan.webp",
        features: ["with Chauffeur", "A/C", "7-15 Seats"]
    }
];

export function CarRental() {
    return (
        <section id="st-section-home-cars" className="relative py-24 px-6 md:px-24">
            {/* Layer 1: Background Plate */}
            <div className="absolute inset-0 bg-white -z-20" />

            <div className="relative z-20 max-w-7xl mx-auto">
                <SectionHeader
                    id="st-child-home-cars-header"
                    title="Airport Transfer"
                    subtitle="Reliable, premium transportation from SSR International Airport to your destination, ensuring a seamless start to your Mauritian journey."
                    centered
                />

                <div id="st-child-home-cars-grid" className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {cars.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-xl">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={car.image}
                                        alt={car.name}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-brand-gold text-xs font-bold uppercase tracking-widest leading-none mb-2">{car.type}</p>
                                        <h3 className="text-2xl font-display text-brand-bronze">{car.name}</h3>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    {car.features.map(f => (
                                        <span key={f} className="text-[10px] uppercase font-bold text-muted-foreground border border-brand-gold/10 px-3 py-1 rounded-full">
                                            {f}
                                        </span>
                                    ))}
                                </div>

                                <button className="w-full py-4 border border-brand-gold/20 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-brand-gold hover:text-white transition-all group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-white text-brand-bronze">
                                    Reserve Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
