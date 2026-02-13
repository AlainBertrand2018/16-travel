"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const cars = [
    {
        id: 1,
        name: "Suzuki Jimny",
        type: "Rugged 4x4",
        price: "€20",
        image: "/images/Jimny_Mau.webp",
        features: ["Manual", "4x4", "4 Seats"]
    },
    {
        id: 2,
        name: "Toyota Vitz",
        type: "Urban Compact",
        price: "€30",
        image: "/images/Toyota_mau.webp",
        features: ["Automatic", "A/C", "5 Seats"]
    },
    {
        id: 3,
        name: "BMW i3",
        type: "Electric Luxury",
        price: "€50",
        image: "/images/BMW_Mau.webp",
        features: ["Electric", "A/C", "4 Seats"]
    }
];

export function CarRental() {
    return (
        <section className="relative py-24 px-6 md:px-24" id="cars">
            {/* Layer 1: Background Plate */}
            <div className="absolute inset-0 bg-pastel-gold -z-20" />

            <div className="relative z-20 max-w-7xl mx-auto">
                <SectionHeader
                    title="Exclusive Fleet"
                    subtitle="Experience the freedom of Mauritius with our hand-picked collection of premium vehicles."
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${car.image})` }}
                                />
                                <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full font-bold text-brand-bronze">
                                    {car.price} <span className="text-xs font-normal opacity-70">/day</span>
                                </div>
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
