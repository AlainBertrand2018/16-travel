"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Wind, X, Calendar, Users, ArrowRight } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { BookingModal } from "@/components/BookingModal";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ActivitiesPage() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const q = query(
                    collection(db, "products"), 
                    where("category", "==", "Activity"),
                    limit(12)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        title: docData.name || "Unknown Activity",
                        desc: docData.description || "No description available.",
                        duration: docData.duration ? `${docData.duration} Hours` : "Varied Duration",
                        image: docData.image || "/images/placeholder.jpg",
                        price: docData.price || 0
                    };
                });
                setActivities(data);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();

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
                             <Image 
                                src="/images/chamarel-7couleurs.webp" 
                                alt="Activities Header"
                                fill 
                                className="object-cover"
                                priority
                             />
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
                id: `activity-${act.id || i}`,
                title: act.title,
                component: (
                    <div className="proportional-section bg-pastel-gold p-10 min-h-screen flex flex-col justify-center space-y-10">
                        <div className="relative aspect-square w-full rounded-[40px] overflow-hidden shadow-2xl">
                            <Image 
                                src={act.image} 
                                alt={act.title}
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            
                            {/* Price Tag */}
                            <div className="absolute top-6 right-6">
                                <div className="bg-brand-gold px-4 py-2 rounded-xl shadow-2xl">
                                    <span className="text-[10px] font-black text-brand-bronze uppercase tracking-widest leading-none block">
                                        €{act.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Duration Tag */}
                            <div className="bg-brand-gold px-3 py-1.5 rounded-md shadow-md inline-block">
                                <span className="text-[9px] font-black text-brand-bronze uppercase tracking-tighter leading-none block">
                                    {act.duration}
                                </span>
                            </div>
                            
                            <h3 className="text-4xl font-display text-brand-bronze leading-tight">{act.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-4">{act.desc}</p>
                            
                            <button 
                                onClick={() => setSelectedActivity(act)}
                                className="w-full bg-brand-bronze text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                            >
                                Experience Details
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
                    {selectedActivity && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-end justify-center"
                        >
                            <div 
                                className="absolute inset-0 bg-brand-bronze/60 backdrop-blur-md"
                                onClick={() => setSelectedActivity(null)}
                            />
                            <motion.div 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="relative w-full max-h-[85vh] bg-pastel-gold rounded-t-[40px] shadow-2xl overflow-y-auto"
                            >
                                <button 
                                    onClick={() => setSelectedActivity(null)}
                                    className="absolute top-6 right-6 z-50 p-2 glass-dark rounded-full text-brand-bronze"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="relative w-full h-64">
                                    <Image 
                                        src={selectedActivity.image} 
                                        alt={selectedActivity.title}
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="inline-flex items-center gap-1.5 border border-brand-gold/30 px-3 py-1.5 rounded-full text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                                        <Wind className="w-3.5 h-3.5" />
                                        <span>{selectedActivity.duration}</span>
                                    </div>
                                    <h2 className="text-4xl font-display text-brand-bronze leading-[1.1]">
                                        {selectedActivity.title}
                                    </h2>
                                    <p className="text-brand-bronze/80 leading-relaxed text-sm whitespace-pre-line">
                                        {selectedActivity.desc}
                                    </p>
                                    <div className="pt-6 border-t border-brand-bronze/10 flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Pricing</span>
                                            <span className="text-3xl font-display text-brand-bronze font-bold">€{selectedActivity.price}</span>
                                        </div>
                                        <button 
                                            onClick={() => setIsBookingOpen(true)}
                                            className="w-full bg-brand-bronze text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {selectedActivity && (
                    <BookingModal 
                        isOpen={isBookingOpen} 
                        onClose={() => setIsBookingOpen(false)} 
                        product={selectedActivity} 
                    />
                )}
            </>
        );
    }

    return (
        <main className="min-h-screen bg-pastel-gold">
            <Navbar />
            <section id="st-section-activities-header" className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
                <div
                    className="absolute inset-0"
                >
                    <Image 
                        src="/images/chamarel-7couleurs.webp"
                        alt="Activities Header"
                        fill
                        className="object-cover"
                        priority
                    />
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

            <section id="st-section-activities-grid" className="py-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                    {activities.length === 0 ? (
                        <div className="flex justify-center items-center py-24 text-brand-bronze/50 font-display text-2xl">
                            Loading experiences...
                        </div>
                    ) : (
                        <div id="st-child-activities-grid-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {activities.map((act, i) => (
                                <motion.div
                                    key={act.id || i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    onClick={() => setSelectedActivity(act)}
                                    transition={{ delay: (i % 4) * 0.1 }}
                                    className="group relative aspect-square rounded-[40px] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 cursor-pointer"
                                >
                                     <Image 
                                        src={act.image} 
                                        alt={act.title}
                                        fill 
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
                                    
                                    {/* Price Tag (Top Right) */}
                                    <div className="absolute top-5 right-5 z-20">
                                        <div className="bg-brand-gold px-4 py-2 rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                                            <span className="text-[10px] font-black text-brand-bronze uppercase tracking-widest leading-none block">
                                                From €{act.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content Area */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 pt-0 flex flex-col items-center text-center">
                                        {/* Duration Label - Fixed Alignment */}
                                        <div className="absolute bottom-[120px] left-8">
                                            <div className="bg-white px-2.5 py-1.5 rounded-md shadow-lg transform group-hover:-translate-y-1 transition-transform duration-500">
                                                <span className="text-[9px] font-black text-brand-bronze uppercase tracking-tighter leading-none block">
                                                    {act.duration}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Title area with fixed height to prevent vertical shifting if needed, 
                                            but since pills are absolute now, we just need space. */}
                                        <div className="h-20 flex items-center justify-center">
                                            <h3 className="text-3xl lg:text-4xl font-display text-white leading-tight drop-shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-500">
                                                {act.title}
                                            </h3>
                                        </div>
                                    </div>
                                    
                                    {/* Selection Glow (Mobile feedback) */}
                                    <div className="absolute inset-0 border-2 border-brand-gold/0 group-active:border-brand-gold/40 rounded-[40px] transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {selectedActivity && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
                    >
                        <div 
                            className="absolute inset-0 bg-brand-bronze/60 backdrop-blur-md"
                            onClick={() => setSelectedActivity(null)}
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-pastel-gold rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[600px] border border-brand-gold/20"
                        >
                            <button 
                                onClick={() => setSelectedActivity(null)}
                                className="absolute top-6 right-6 z-50 p-2 lg:p-3 glass-dark rounded-full text-brand-bronze hover:bg-brand-bronze hover:text-white transition-all shadow-xl hover:rotate-90"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-full md:w-5/12 h-64 md:h-full relative shrink-0">
                                <Image 
                                    src={selectedActivity.image} 
                                    alt={selectedActivity.title}
                                    fill 
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-bronze/50 md:bg-gradient-to-r md:from-transparent md:to-brand-bronze/20 to-transparent" />
                            </div>

                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-start md:justify-center overflow-y-auto">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                                        <div className="flex items-center gap-1.5 border border-brand-gold/30 px-4 py-2 rounded-full bg-brand-gold/5">
                                            <Wind className="w-3.5 h-3.5" />
                                            <span>{selectedActivity.duration}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-display text-brand-bronze leading-[1.1]">
                                        {selectedActivity.title}
                                    </h2>
                                    <div className="py-6 border-y border-brand-bronze/10">
                                        <p className="text-brand-bronze/80 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                            {selectedActivity.desc}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
                                        <div>
                                            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1.5">Starting From</p>
                                            <p className="text-3xl font-display text-brand-bronze font-bold">
                                                €{selectedActivity.price}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => setIsBookingOpen(true)}
                                            className="w-full sm:w-auto bg-brand-bronze text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-brand-gold hover:-translate-y-1 transition-all"
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

            {selectedActivity && (
                <BookingModal 
                    isOpen={isBookingOpen} 
                    onClose={() => setIsBookingOpen(false)} 
                    product={selectedActivity} 
                />
            )}

            <Footer />
        </main>
    );
}
