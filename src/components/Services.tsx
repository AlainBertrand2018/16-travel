"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Mountain, Waves, Utensils, Car } from "lucide-react";
import Image from "next/image";

const services = [
    {
        id: 1,
        title: "Transfers & Rentals",
        description: "Premium fleet of vehicles for your island exploration and your transfers from and to the airport.",
        icon: <Car />,
        color: "bg-blue-500/10",
        image: "/images/Vitz_logo_1.webp"
    },
    {
        id: 2,
        title: "Pick & Drop",
        description: "Need to go a day activity or a night out? We've got you covered.",
        icon: <Mountain />,
        color: "bg-green-500/10",
        image: "/images/kitesurfing_in_Mauritius.webp"
    },
    {
        id: 3,
        title: "Trips & Excursions",
        description: "Let us be your private guide around the island, in a comfortable and safe way.",
        icon: <Waves />,
        color: "bg-cyan-500/10",
        image: "/images/port-louis-caudan.webp"
    },
    {
        id: 4,
        title: "Special Activity Bookings",
        description: "Should it be the crystal-clear depths and vibrant marine life of the Mauritian lagoons, or for an outing on a catamaran.",
        icon: <Waves />,
        color: "bg-orange-500/10",
        image: "/images/underwater_16.webp"
    }
];

export function Services() {
    return (
        <section id="st-offers" className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden">
            {/* Layer 1: Background Plate */}
            <div className="absolute inset-0 bg-pastel-cream -z-20" />

            <div className="relative z-20 max-w-7xl mx-auto w-full">
                <div id="st-child-home-services-header">
                    <SectionHeader
                        id="st-child-home-services-header"
                        title="Our Offers"
                        subtitle="Discover a side of Mauritius few ever get to see with our curated selection of ultra-luxury services."
                    />
                </div>

                <div id="st-child-home-services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
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
