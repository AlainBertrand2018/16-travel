"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Map, X, Clock, Navigation, Check, Calendar, Users } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { BookingModal } from "@/components/BookingModal";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ToursPage() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [tours, setTours] = useState<any[]>([]);
    const [selectedTour, setSelectedTour] = useState<any | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const q = query(
                    collection(db, "products"), 
                    where("category", "==", "Outing Package"),
                    limit(10)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        title: docData.name || "Unknown Tour",
                        desc: docData.description || "No description available.",
                        duration: docData.duration ? `${docData.duration} Hours` : "Varied Duration",
                        image: docData.image || "/images/placeholder.jpg",
                        price: docData.price || 0,
                        itineraryImages: docData.itineraryImages || []
                    };
                });
                setTours(data);
            } catch (error) {
                console.error("Error fetching tours:", error);
            }
        };

        fetchTours();

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
                             <Image 
                                src="/images/mauritius-oberoi-royal.webp" 
                                alt="Tours Header"
                                fill 
                                className="object-cover"
                                priority
                             />
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
                id: `tour-${tour.id || i}`,
                title: tour.title,
                component: (
                    <div className="proportional-section bg-pastel-gold p-10 min-h-screen flex flex-col justify-center space-y-10">
                        <div className="relative aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl">
                            <Image 
                                src={tour.image} 
                                alt={tour.title}
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest text-[10px]">
                                <Map className="w-4 h-4" />
                                <span>{tour.duration} Private Tour</span>
                            </div>
                            <h3 className="text-3xl font-display text-brand-bronze leading-tight">{tour.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-4">{tour.desc}</p>
                            <button 
                                onClick={() => setSelectedTour(tour)}
                                className="w-full bg-brand-gold text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
                            >
                                View Itinerary
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
                    {selectedTour && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-end justify-center"
                        >
                            <div 
                                className="absolute inset-0 bg-brand-bronze/60 backdrop-blur-md"
                                onClick={() => setSelectedTour(null)}
                            />
                            <motion.div 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="relative w-full max-h-[85vh] bg-pastel-gold rounded-t-[40px] shadow-2xl overflow-y-auto"
                            >
                                <button 
                                    onClick={() => setSelectedTour(null)}
                                    className="absolute top-6 right-6 z-50 p-2 glass-dark rounded-full text-brand-bronze"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                
                                <div className="p-8 space-y-10">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-1.5 border border-brand-gold/30 px-3 py-1.5 rounded-full text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                                            <Navigation className="w-3.5 h-3.5" />
                                            <span>Private Journey</span>
                                        </div>
                                        <h2 className="text-4xl font-display text-brand-bronze leading-[1.1]">
                                            {selectedTour.title}
                                        </h2>
                                    </div>

                                    {/* Mobile Gallery */}
                                    {selectedTour.itineraryImages?.length > 0 && (
                                        <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8 no-scrollbar">
                                            {selectedTour.itineraryImages.filter(Boolean).map((img: string, idx: number) => (
                                                <div key={idx} className="relative aspect-[4/5] w-48 shrink-0 rounded-3xl overflow-hidden shadow-lg">
                                                    <Image 
                                                        src={img} 
                                                        alt={`${selectedTour.title} itinerary ${idx}`}
                                                        fill 
                                                        className="object-cover"
                                                        sizes="200px"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        <div className="bg-pastel-warm/50 p-6 rounded-3xl border border-brand-gold/10">
                                            <p className="text-brand-bronze/80 leading-relaxed text-sm whitespace-pre-line">
                                                {selectedTour.desc}
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center px-4">
                                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Pricing From</span>
                                                <span className="text-3xl font-display text-brand-bronze font-bold">€{selectedTour.price}</span>
                                            </div>
                                            <button 
                                                onClick={() => setIsBookingOpen(true)}
                                                className="w-full bg-brand-bronze text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
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

                {selectedTour && (
                    <BookingModal 
                        isOpen={isBookingOpen} 
                        onClose={() => setIsBookingOpen(false)} 
                        product={selectedTour} 
                    />
                )}
            </>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section id="st-section-tours-header" className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
                <div
                    className="absolute inset-0"
                >
                    <Image 
                        src="/images/mauritius-oberoi-royal.webp"
                        alt="Tours Header"
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
                    {tours.length === 0 ? (
                        <div className="flex justify-center items-center py-24 text-brand-bronze/50 font-display text-2xl">
                            Mapping your next journey...
                        </div>
                    ) : (
                        <div id="st-child-tours-list-container" className="space-y-32">
                            {tours.map((tour, i) => (
                                <motion.div
                                    key={tour.id || i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-32 items-center`}
                                >
                                    <div className="flex-1 relative aspect-video w-full rounded-[60px] overflow-hidden group shadow-2xl">
                                        <Image 
                                            src={tour.image} 
                                            alt={tour.title}
                                            fill 
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-brand-bronze/10 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="flex-1 space-y-8">
                                        <div className="flex items-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-sm">
                                            <Map className="w-5 h-5" />
                                            <span>{tour.duration} Private Tour</span>
                                        </div>
                                        <h2 className="text-5xl md:text-7xl font-display text-brand-bronze leading-tight">{tour.title}</h2>
                                        <p className="text-xl text-muted-foreground leading-relaxed">{tour.desc}</p>
                                        <button 
                                            onClick={() => setSelectedTour(tour)}
                                            className="flex items-center gap-4 group text-lg font-bold text-brand-bronze"
                                        >
                                            View Itinerary
                                            <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all shadow-lg">
                                                <ArrowRight className="w-6 h-6" />
                                            </div>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {selectedTour && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
                    >
                        <div 
                            className="absolute inset-0 bg-brand-bronze/60 backdrop-blur-md"
                            onClick={() => setSelectedTour(null)}
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            className="relative w-full max-w-6xl bg-white rounded-[60px] shadow-3xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[750px] border border-brand-gold/10"
                        >
                            <button 
                                onClick={() => setSelectedTour(null)}
                                className="absolute top-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all shadow-2xl hover:rotate-90"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Sidebar / Main Visual */}
                            <div className="w-full md:w-5/12 h-64 md:h-full relative shrink-0 overflow-hidden">
                                <Image 
                                    src={selectedTour.image} 
                                    alt={selectedTour.title}
                                    fill 
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12 text-white">
                                    <div className="flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest text-xs mb-4">
                                        <Navigation className="w-4 h-4" />
                                        <span>Curated Experience</span>
                                    </div>
                                    <h3 className="text-4xl font-display leading-tight">{selectedTour.title}</h3>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-8 md:p-16 flex flex-col justify-start overflow-y-auto">
                                <div className="max-w-2xl space-y-12">
                                    <div className="flex flex-wrap gap-8 items-center border-b border-brand-bronze/10 pb-10">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest">Duration</p>
                                            <p className="text-xl font-display text-brand-bronze">{selectedTour.duration}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest">Pricing</p>
                                            <p className="text-xl font-display text-brand-bronze">From €{selectedTour.price}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest">Category</p>
                                            <p className="text-xl font-display text-brand-bronze">Private Outing</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-gold">Expedition Highlights</h4>
                                        <p className="text-brand-bronze/70 text-lg leading-relaxed font-light italic">
                                            "{selectedTour.desc}"
                                        </p>
                                        
                                        {/* Expedition Gallery */}
                                        {selectedTour.itineraryImages?.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                                                {selectedTour.itineraryImages.filter(Boolean).map((img: string, idx: number) => (
                                                    <motion.div 
                                                        key={idx}
                                                        whileHover={{ y: -5 }}
                                                        className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl"
                                                    >
                                                        <Image 
                                                            src={img} 
                                                            alt={`${selectedTour.title} expedition ${idx}`}
                                                            fill 
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 33vw, 20vw"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-10 border-t border-brand-bronze/10 flex flex-col sm:flex-row items-center justify-between gap-8">
                                        <div className="flex items-center gap-4 text-brand-bronze/60 text-sm">
                                            <Check className="w-5 h-5 text-green-600" />
                                            <span>Secure your private booking for 2026/27</span>
                                        </div>
                                        <button 
                                            onClick={() => setIsBookingOpen(true)}
                                            className="w-full sm:w-auto bg-brand-bronze text-white px-12 py-5 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-brand-gold hover:-translate-y-1 transition-all"
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

            {selectedTour && (
                <BookingModal 
                    isOpen={isBookingOpen} 
                    onClose={() => setIsBookingOpen(false)} 
                    product={selectedTour} 
                />
            )}

            <Footer />
        </main>
    );
}
