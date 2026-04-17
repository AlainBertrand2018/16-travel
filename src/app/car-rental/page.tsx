"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Car, Shield, Gauge, Key, X, Check } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { BookingModal } from "@/components/BookingModal";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

const cars = [
    {
        id: 1,
        name: "Private Car",
        type: "Premium SUV",
        price: "€20",
        image: "/images/16_suv.webp",
        features: ["with or without Chauffeur", "Premium SUV", "5-7 Seats"],
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

const perks = [
    { icon: <Shield />, title: "Premium Insurance", desc: "Full comprehensive coverage included for complete peace of mind." },
    { icon: <Gauge />, title: "Unlimited Mileage", desc: "Explore every hidden corner of the island without any limits." },
    { icon: <Key />, title: "VIP Delivery", desc: "We deliver your vehicle to your airport arrival or villa door." }
];

export default function CarRentalPage() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [selectedCar, setSelectedCar] = useState<any | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

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
                title: "Rental",
                component: (
                    <div className="proportional-section relative overflow-hidden text-center bg-brand-bronze text-white p-12 min-h-screen flex flex-col justify-center">
                        <div className="absolute inset-0 opacity-50">
                             <Image 
                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070" 
                                alt="Car Rental Header"
                                fill 
                                className="object-cover"
                                priority
                             />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <h1 className="text-4xl md:text-6xl font-display leading-[1.1]">
                                Car Rental
                            </h1>
                            <p className="text-white/80 text-xl font-light">
                                The keys to the island are in your hands.
                            </p>
                        </div>
                    </div>
                )
            },
            {
                id: "perks",
                title: "Perks",
                component: (
                    <div className="proportional-section bg-white p-10 min-h-screen flex flex-col justify-center space-y-12">
                        {perks.map((perk, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                                    {perk.icon}
                                </div>
                                <h3 className="text-xl font-display font-bold">{perk.title}</h3>
                                <p className="text-muted-foreground text-sm">{perk.desc}</p>
                            </div>
                        ))}
                    </div>
                )
            },
            ...cars.map((car, i) => ({
                id: `car-${i}`,
                title: car.name,
                component: (
                    <div className="proportional-section bg-pastel-gold p-10 min-h-screen flex flex-col justify-center space-y-10">
                        <div className="relative aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl">
                             <Image 
                                src={car.image} 
                                alt={car.name}
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                             />
                             <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full font-bold text-xs text-brand-bronze">
                                {car.price} /day
                             </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-2">{car.type}</p>
                                <h3 className="text-3xl font-display text-brand-bronze">{car.name}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">{car.desc}</p>
                            <button 
                                onClick={() => setSelectedCar(car)}
                                className="w-full py-4 bg-brand-bronze text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg"
                            >
                                Book This Vehicle
                            </button>
                        </div>
                    </div>
                )
            }))
        ];
        return (
            <>
                <MobileLayout sections={mobileSections} />
                <AnimatePresence>
                    {selectedCar && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-end justify-center"
                        >
                            <div 
                                className="absolute inset-0 bg-brand-bronze/60 backdrop-blur-md"
                                onClick={() => setSelectedCar(null)}
                            />
                            <motion.div 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="relative w-full max-h-[85vh] bg-pastel-gold rounded-t-[40px] shadow-2xl overflow-y-auto"
                            >
                                <button 
                                    onClick={() => setSelectedCar(null)}
                                    className="absolute top-6 right-6 z-50 p-2 bg-white/20 rounded-full text-brand-bronze"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                
                                <div className="p-8 space-y-10">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-1.5 border border-brand-gold/30 px-3 py-1.5 rounded-full text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                                            <Shield className="w-3.5 h-3.5" />
                                            <span>Premium Vehicle</span>
                                        </div>
                                        <h2 className="text-4xl font-display text-brand-bronze leading-[1.1]">
                                            {selectedCar.name}
                                        </h2>
                                    </div>

                                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl">
                                        <Image 
                                            src={selectedCar.image} 
                                            alt={selectedCar.name}
                                            fill 
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-white/50 p-6 rounded-3xl border border-brand-gold/10">
                                            <p className="text-brand-bronze/80 leading-relaxed text-sm">
                                                {selectedCar.desc}
                                            </p>
                                        </div>
                                        
                                        <div className="flex justify-between items-center py-4 border-t border-brand-bronze/10">
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-brand-gold">Price /day</p>
                                                <p className="text-3xl font-display text-brand-bronze font-bold">{selectedCar.price}</p>
                                            </div>
                                            <button 
                                                onClick={() => setIsBookingOpen(true)}
                                                className="bg-brand-bronze text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {selectedCar && (
                    <BookingModal 
                        isOpen={isBookingOpen} 
                        onClose={() => setIsBookingOpen(false)} 
                        product={{
                            ...selectedCar,
                            title: selectedCar.name,
                            price: parseInt(selectedCar.price.replace("€", ""))
                        }} 
                    />
                )}
            </>
        );
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <section id="st-section-cars-header" className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                >
                    <Image 
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070"
                        alt="Car Rental Header"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-brand-bronze/50" />
                </div>
                <div className="relative z-10 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-display text-white mb-6">Car Rental</h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                            The keys to the island are in your hands.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section id="st-section-cars-perks" className="py-20 bg-white">
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

            <section id="st-section-cars-fleet" className="py-24 px-6 md:px-24 bg-pastel-cream">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Our Exclusive Fleet"
                        subtitle="Meticulously maintained vehicles for the discerning traveler."
                        centered
                    />

                    <div id="st-child-cars-fleet-grid" className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
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
                                    <Image 
                                        src={car.image} 
                                        alt={car.name}
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
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
                                    <button 
                                        onClick={() => { setSelectedCar(car); setIsBookingOpen(true); }}
                                        className="w-full py-5 bg-brand-gold text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-bronze transition-all shadow-lg hover:shadow-brand-gold/20"
                                    >
                                        Book This Vehicle
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedCar && (
                <BookingModal 
                    isOpen={isBookingOpen} 
                    onClose={() => setIsBookingOpen(false)} 
                    product={{
                        ...selectedCar,
                        title: selectedCar.name,
                        price: parseInt(selectedCar.price.replace("€", ""))
                    }} 
                />
            )}

            <Footer />
        </main>
    );
}
