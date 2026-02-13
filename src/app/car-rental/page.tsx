"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Car, Shield, Gauge, Key } from "lucide-react";

const cars = [
    {
        id: 1,
        name: "Suzuki Jimny",
        type: "Rugged 4x4",
        price: "€20",
        image: "/images/Jimny_Mau.webp",
        features: ["Manual", "4x4", "4 Seats"],
        desc: "The ultimate island crawler. Rugged 4x4 capability to reach the most secluded viewpoints and hidden gems."
    },
    {
        id: 2,
        name: "Toyota Vitz",
        type: "Urban Compact",
        price: "€30",
        image: "/images/Toyota_mau.webp",
        features: ["Automatic", "A/C", "5 Seats"],
        desc: "Exceptional efficiency and urban agility. Perfect for navigating charming villages and crowded coastal markets."
    },
    {
        id: 3,
        name: "BMW i3",
        type: "Electric Luxury",
        price: "€50",
        image: "/images/BMW_Mau.webp",
        features: ["Electric", "A/C", "4 Seats"],
        desc: "Eco-conscious luxury. Experience the island in near-silent electric performance while protecting our paradise."
    }
];

export default function CarRentalPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Page Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070')" }}
                >
                    <div className="absolute inset-0 bg-brand-bronze/50" />
                </div>
                <div className="relative z-10 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-display text-white mb-6">Car Rental</h1>
                        <p className="text-xl md:text-2xl text-white/90 italic font-light max-w-2xl mx-auto">
                            The keys to the island are in your hands.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Perks */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-display font-bold">Premium Insurance</h3>
                        <p className="text-muted-foreground text-sm">Full comprehensive coverage included for complete peace of mind.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                            <Gauge className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-display font-bold">Unlimited Mileage</h3>
                        <p className="text-muted-foreground text-sm">Explore every hidden corner of the island without any limits.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                            <Key className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-display font-bold">VIP Delivery</h3>
                        <p className="text-muted-foreground text-sm">We deliver your vehicle to your airport arrival or villa door.</p>
                    </div>
                </div>
            </section>

            {/* Fleet Grid */}
            <section className="py-24 px-6 md:px-24 bg-pastel-cream">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Our Exclusive Fleet"
                        subtitle="Meticulously maintained vehicles for the discerning traveler."
                        centered
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                        {cars.map((car, i) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-[40px] overflow-hidden shadow-xl"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img src={car.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full font-bold text-brand-bronze shadow-lg">
                                        {car.price} <span className="text-xs font-normal opacity-70">/day</span>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div>
                                        <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">{car.type}</p>
                                        <h3 className="text-3xl font-display text-brand-bronze">{car.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{car.desc}</p>
                                    <div className="flex gap-3">
                                        {car.features.map(f => (
                                            <span key={f} className="text-[10px] uppercase font-bold text-brand-bronze/60 bg-brand-gold/5 px-3 py-1 rounded-full">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-5 bg-brand-gold text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-bronze transition-all shadow-lg hover:shadow-brand-gold/20">
                                        Book This Vehicle
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
