"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Ship, Mountain, Waves, Utensils, Car } from "lucide-react";

const services = [
    {
        id: 1,
        title: "Bespoke Car Rental",
        description: "Premium fleet of luxury vehicles for your island exploration.",
        icon: <Car />,
        color: "bg-blue-500/10",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2017"
    },
    {
        id: 2,
        title: "Hiking Adventures",
        description: "Hike the iconic Le Morne Brabant and discover hidden waterfalls.",
        icon: <Mountain />,
        color: "bg-green-500/10",
        image: "https://sixteen-travel.vercel.app/images/le_Morne_hiking.avif"
    },
    {
        id: 3,
        title: "Sea Expeditions",
        description: "Private catamarans and turquoise lagoon explorations.",
        icon: <Waves />,
        color: "bg-cyan-500/10",
        image: "https://sixteen-travel.vercel.app/images/mru-catamaran-ileauxCerfs.webp"
    },
    {
        id: 4,
        title: "Dolphin Swim",
        description: "Magical encounters with wild dolphins in their natural habitat.",
        icon: <Utensils />,
        color: "bg-orange-500/10",
        image: "https://sixteen-travel.vercel.app/images/dauphins.jpg"
    }
];

export function Services() {
    return (
        <section className="relative py-24 px-6 overflow-hidden" id="activities">
            {/* Layer 1: Background Plate */}
            <div className="absolute inset-0 bg-pastel-cream -z-20" />

            <div className="relative z-20 max-w-7xl mx-auto">
                <SectionHeader
                    title="Bespoke Experiences"
                    subtitle="Discover a side of Mauritius few ever get to see with our curated selection of ultra-luxury services."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
                        >
                            {/* Background Image / Placeholder */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${service.image})` }}
                            >
                                <div className="absolute inset-0 bg-brand-bronze/20 group-hover:bg-brand-bronze/10 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="mb-4 w-12 h-12 rounded-full glass flex items-center justify-center text-brand-gold transition-transform duration-500 group-hover:rotate-[360deg]">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-display mb-2">{service.title}</h3>
                                <p className="text-sm text-white/90 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {service.description}
                                </p>
                                <div className="mt-4 h-[2px] w-0 bg-brand-gold transition-all duration-500 group-hover:w-full" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
