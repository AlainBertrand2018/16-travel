"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { X, Navigation, Check, Map, Clock, Compass, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { RequestBar } from "@/components/RequestBar";

const bentoItems = [
    {
        id: "le-morne-hiking",
        title: "Le Morne Hiking",
        duration: "4–5 hours",
        detail: "Hotel Pick-up · Le Morne Heritage Trail · Summit Ascent · UNESCO Viewpoint · Panoramic Photo Stop · Descent & Refreshments · Hotel Drop-off",
        price: "MUR 4,500",
        priceLabel: "Pick & Drop",
        image: "/images/leMorne_hiking.avif",
        className: "md:col-span-2 lg:col-span-8 md:row-span-2 min-h-[400px] lg:min-h-[600px]",
        featured: true,
        gallery: [
            { img: "/images/le_Morne.webp", title: "Le Morne Brabant", desc: "A UNESCO World Heritage site, Le Morne Brabant towers 556 metres above the Indian Ocean — a monument to resilience and breathtaking natural beauty." },
            { img: "/images/le_morne_hiking 01.webp", title: "Le Morne Hiking Trail", desc: "Climb the iconic Le Morne Brabant, where rugged trails, history, and panoramic ocean views reward every step with unforgettable island majesty." },
            { img: "/images/le_morne_hiking 02.webp", title: "Heritage Trail", desc: "Walk the path of history through lush tropical vegetation, past ancient caves, and along dramatic cliff edges." }
        ]
    },
    {
        id: "dolphin-sighting",
        title: "Dolphin and Whales Watching",
        duration: "3 hours",
        detail: "Hotel Pick-up · Tamarin Bay Departure · Open Ocean Dolphin Encounter · Snorkelling Stop · Return to Shore · Hotel Drop-off",
        price: "MUR 3,500",
        priceLabel: "Pick & Drop",
        image: "/images/whales-mauritius.webp",
        className: "md:col-span-1 lg:col-span-4 md:row-span-1 min-h-[300px]",
        featured: false,
        gallery: [
            { img: "/images/dolphins_01.avif", title: "Tamarin Bay", desc: "Depart from the legendary Tamarin Bay at sunrise, where spinner and bottlenose dolphins gather in the warm Indian Ocean waters." },
            { img: "/images/dolphin_02.webp", title: "Swimming with Dolphins", desc: "Slip into the crystal-clear waters for an unforgettable, respectful encounter with wild dolphins in their natural habitat." },
            { img: "/images/dolphin_01.webp", title: "Coastal Return", desc: "Feel your heart race as dolphins dance and whales rise, offering a rare, magical encounter with Mauritius’ wild, untamed ocean soul." }
        ]
    },
    {
        id: "skydiving",
        title: "Skydiving",
        duration: "Half Day",
        detail: "Hotel Pick-up · Safety Briefing · Tandem Harness Fitting · Scenic Flight to 10,000ft · Freefall & Canopy Ride · Beach Landing · Hotel Drop-off",
        price: "MUR 4,000",
        priceLabel: "Pick & Drop",
        image: "/images/skydiving-mauritius.webp",
        className: "md:col-span-1 lg:col-span-4 md:row-span-1 min-h-[300px]",
        featured: false,
        gallery: [
            { img: "/images/tandem_Skydive.webp", title: "Free to Fall", desc: "Board a scenic flight climbing to 10,000 feet, with the entire island of Mauritius unfolding below — lagoons, mountains, and sugar cane fields." },
            { img: "/images/mauritius_Skydive.webp", title: "Freefall Rush", desc: "Experience 60 seconds of pure adrenaline as you freefall at 200 km/h, the turquoise ocean and emerald peaks rushing towards you." },
            { img: "/images/mauritius_skydive_01.webp", title: "The Glide", desc: "Float under the parachute canopy for five serene minutes, absorbing a bird's-eye panorama of the island before a soft beach landing." }
        ]
    },
    {
        id: "helicopter-tours",
        title: "Helicopter Tours",
        duration: "30–60 min",
        detail: "Hotel Pick-up · Helipad Arrival · Safety Briefing · Aerial Tour over Lagoons, Mountains & Waterfalls · Exclusive Flyover of Underwater Waterfall · Hotel Drop-off",
        price: "MUR 5,000",
        priceLabel: "Pick & Drop",
        image: "/images/helico-Moris_01.webp",
        className: "md:col-span-1 lg:col-span-6 md:row-span-1 min-h-[300px] lg:min-h-[400px]",
        featured: false,
        gallery: [
            { img: "/images/helico-Moris_04.webp", title: "Above The Underwater Waterfall", desc: "Witness the world-famous optical illusion of the 'Underwater Waterfall' near Le Morne — an experience only possible from the air." },
            { img: "/images/helico-Moris_05.webp", title: "The Lagoon from Above", desc: "Soar over the iconic Le Morne Brabant and its turquoise lagoon, revealing coral gardens and sandbanks impossible to see from shore." },
            { img: "/images/helico-Moris_02.webp", title: "On the Helipad", desc: "Take off from the helipad and ascend into the Mauritian sky, where panoramic views await." }
        ]
    },
    {
        id: "casela",
        title: "Casela",
        duration: "3–4 hours",
        detail: "Hotel Pick-up · Casela World of Adventures · Safari · Zipline · Quad Biking · Segway · Hotel Drop-off",
        price: "MUR 3,500",
        priceLabel: "Pick & Drop",
        image: "/images/casela01.webp",
        className: "md:col-span-1 lg:col-span-6 md:row-span-1 min-h-[300px] lg:min-h-[400px]",
        featured: false,
        gallery: [
            { img: "/images/caselaQuad.webp", title: "Casela Quad Biking", desc: "Roar through wild trails at Casela Nature Parks, where quad biking blends adrenaline, dust, and untamed landscapes into an exhilarating island adventure." },
            { img: "/images/casela06.webp", title: "Casela Safari", desc: "Embark on a wild journey at Casela Nature Parks, where African wildlife roams freely across breathtaking Mauritian landscapes and open safaris thrill." },
            { img: "/images/casela03.webp", title: "Casela Zipline", desc: "Soar through the treetops on Casela's zipline, offering a bird's-eye view of the park's stunning landscapes and wildlife." }
        ]
    }
];

export default function ActivitiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <ActivitiesPageContent />
        </Suspense>
    );
}

function ActivitiesPageContent() {
    const searchParams = useSearchParams();
    const [activeItem, setActiveItem] = useState<any>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
    const galleryItem = (galleryIndex !== null && activeItem?.gallery) ? activeItem.gallery[galleryIndex] : null;

    // Handle deep links from Offers
    useEffect(() => {
        const pkgId = searchParams.get('package');
        if (pkgId) {
            const pkg = bentoItems.find(item => item.id === pkgId);
            if (pkg) {
                setActiveItem(pkg);
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [searchParams]);

    // Stop body scroll when modal open
    useEffect(() => {
        if (activeItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [activeItem]);

    const handleReserve = (activity: any) => {
        setActiveItem(null);
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('open-booking', {
                detail: {
                    vehicleType: "Private Executive Vehicle",
                    serviceType: "Activities — Pick & Drop",
                    selectedOptions: [{ name: activity.title, price: activity.price }]
                }
            }));
        }, 300);
    };

    return (
        <main className="min-h-screen bg-white pb-24 md:pb-0">
            <Navbar />

            <section id="st-section-activities-header" className="relative h-screen md:h-[70vh] flex flex-col items-center justify-center overflow-hidden text-center mb-16">
                <div className="absolute inset-0">
                    <Image
                        src="/images/kitesurfing_mauritius.webp"
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
                        Thrill & Serenity
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-display mb-8 text-white drop-shadow-2xl leading-tight"
                    >
                        Live <span>Boldly</span>
                    </motion.h1>
                    <p className="text-base sm:text-lg md:text-2xl font-light max-w-2xl mx-auto text-white/90 drop-shadow-md px-4">
                        From the summit to the sea — adventures crafted for those who seek the extraordinary.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
                    onClick={() => document.getElementById('st-section-activities-list')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold group-hover:text-white transition-colors">Explore</span>
                        <ChevronDown className="w-6 h-6 text-white group-hover:text-brand-gold transition-colors" />
                    </motion.div>
                </motion.div>
            </section>

            <section id="st-section-activities-list" className="pb-32 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="text-center pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28 max-w-3xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-brand-gold mb-6"
                    >
                        Unforgettable Moments
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display text-brand-bronze leading-[1.1] mb-6"
                    >
                        Our Signature Activities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base md:text-lg text-brand-bronze/60 font-light leading-relaxed max-w-xl mx-auto"
                    >
                        We handle the journey — you live the moment. Every activity includes private pick-up and drop-off at your hotel.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                    {bentoItems.map((item) => (
                        <motion.div
                            layoutId={`act-card-${item.id}`}
                            key={item.id}
                            onClick={() => setActiveItem(item)}
                            className={`relative rounded-[32px] overflow-hidden cursor-pointer group shadow-lg border border-brand-gold/10 bg-pastel-gold/20 ${item.className}`}
                            whileHover={{ scale: 0.99 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-bronze/90 via-brand-bronze/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <motion.div
                                className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10"
                                layoutId={`act-content-${item.id}`}
                            >
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/30">
                                        <Clock className="w-3 h-3" />
                                        {item.duration}
                                    </span>
                                </div>
                                <motion.h3
                                    layoutId={`act-title-${item.id}`}
                                    className={`${item.featured ? 'text-4xl lg:text-6xl text-brand-gold' : 'text-2xl lg:text-3xl'} font-display leading-tight mb-2`}
                                >
                                    {item.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`act-desc-${item.id}`}
                                    className={`text-white/80 font-light ${item.featured ? 'text-lg line-clamp-3' : 'text-sm line-clamp-2'}`}
                                >
                                    {item.detail}
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Expansion Modal */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        <div
                            className="absolute inset-0 bg-brand-bronze/60 backdrop-blur-md"
                            onClick={() => {
                                if (galleryIndex !== null) setGalleryIndex(null);
                                else setActiveItem(null);
                            }}
                        />

                        <motion.div
                            layoutId={`act-card-${activeItem.id}`}
                            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        >
                            <button
                                onClick={() => setActiveItem(null)}
                                className="absolute top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-brand-bronze/20 rounded-full text-brand-bronze lg:text-brand-bronze lg:bg-brand-bronze/5 hover:bg-brand-gold hover:text-white transition-all shadow-lg hidden lg:block"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Side */}
                            <div className="w-full lg:w-1/2 flex flex-col h-[35vh] lg:h-full shrink-0 border-b lg:border-b-0 lg:border-r border-brand-bronze/10">
                                <div className="relative flex-1 min-h-0 overflow-hidden">
                                    <Image
                                        src={activeItem.image}
                                        alt={activeItem.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bronze/80 via-transparent to-transparent lg:hidden" />

                                    <button
                                        onClick={() => setActiveItem(null)}
                                        className="absolute top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-gold transition-all shadow-lg lg:hidden"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    {/* Mobile Title Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 lg:hidden text-white">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/30 mb-3">
                                            <Clock className="w-3 h-3" />
                                            {activeItem.duration}
                                        </span>
                                        <motion.h3
                                            layoutId={`act-title-${activeItem.id}`}
                                            className="text-3xl font-display leading-tight text-brand-gold"
                                        >
                                            {activeItem.title}
                                        </motion.h3>
                                    </div>
                                </div>

                                {/* Thumbnails Row */}
                                {activeItem.gallery && (
                                    <div className="h-32 p-4 bg-pastel-gold flex gap-3 overflow-x-auto custom-scrollbar shrink-0 items-center justify-center">
                                        {activeItem.gallery.map((g: any, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => setGalleryIndex(i)}
                                                className="relative h-20 aspect-video rounded-xl overflow-hidden shrink-0 border-2 border-transparent hover:border-brand-gold transition-all group"
                                            >
                                                <Image src={g.img} fill className="object-cover group-hover:scale-110 transition-transform duration-500" alt={`Thumbnail ${i}`} />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 flex flex-col flex-1 lg:h-full min-h-0">
                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto p-8 lg:p-16 pb-4 custom-scrollbar">
                                    <div className="hidden lg:block mb-8">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-gold rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4 border border-brand-gold/20">
                                            <Clock className="w-3 h-3" />
                                            {activeItem.duration}
                                        </span>
                                        <motion.h3
                                            layoutId={`act-title-desk-${activeItem.id}`}
                                            className="text-5xl font-display leading-tight text-brand-bronze"
                                        >
                                            {activeItem.title}
                                        </motion.h3>
                                    </div>

                                    <div className="space-y-10">
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-3">Activity Flow</h4>
                                            <p className="text-brand-bronze/80 text-lg leading-relaxed pt-2">
                                                {activeItem.detail.split('·').map((stop: string, i: number) => (
                                                    <span key={i} className="inline-flex items-center">
                                                        <span className="font-semibold">{stop.trim()}</span>
                                                        {i < activeItem.detail.split('·').length - 1 && (
                                                            <span className="mx-2 text-brand-gold/50">→</span>
                                                        )}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>

                                        <div className="bg-pastel-gold/30 p-6 rounded-3xl border border-brand-gold/10">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-4">Included in Pick & Drop</h4>
                                            <ul className="space-y-3">
                                                {["Private Executive Vehicle", "Dedicated Professional Chauffeur", "Hotel Pick-up & Drop-off", "Bottled Water & Refreshments"].map((inc, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-brand-bronze">
                                                        <div className="w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                                                            <Check className="w-3 h-3" />
                                                        </div>
                                                        {inc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-brand-bronze/5 p-5 rounded-2xl border border-brand-bronze/10">
                                            <p className="text-[11px] text-brand-bronze/70 leading-relaxed">
                                                <span className="font-bold text-brand-bronze">Note:</span> The price shown covers your private pick-up and drop-off service. Activity fees are paid directly at the venue.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pinned Price + CTA — always visible */}
                                <div className="shrink-0 p-8 lg:px-16 lg:pb-12 pt-6 border-t border-brand-bronze/10 bg-white flex flex-col gap-4">
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] font-black uppercase text-brand-gold tracking-widest">{activeItem.priceLabel || "Pick & Drop"}</span>
                                        <span className="text-3xl font-display text-brand-bronze font-bold">{activeItem.price}</span>
                                    </div>
                                    <button
                                        onClick={() => handleReserve(activeItem)}
                                        className="w-full bg-brand-gold text-white py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-bronze hover:shadow-brand-bronze/20 transition-all duration-300"
                                    >
                                        Reserve This Activity
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Secondary Gallery Carousel Modal */}
                        <AnimatePresence>
                            {galleryItem && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
                                >
                                    <div
                                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                                        onClick={() => setGalleryIndex(null)}
                                    />
                                    <div className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col z-10">
                                        <button
                                            onClick={() => setGalleryIndex(null)}
                                            className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-gold transition-all"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        {/* Prev / Next Arrows */}
                                        <button
                                            onClick={() => setGalleryIndex((prev) => prev !== null ? (prev - 1 + activeItem.gallery.length) % activeItem.gallery.length : 0)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-gold transition-all shadow-lg"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setGalleryIndex((prev) => prev !== null ? (prev + 1) % activeItem.gallery.length : 0)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-gold transition-all shadow-lg"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={galleryIndex}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -30 }}
                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                            >
                                                <div className="relative w-full aspect-video sm:aspect-[21/9] bg-brand-bronze">
                                                    <Image src={galleryItem.img} fill className="object-cover" alt={galleryItem.title} />
                                                </div>
                                                <div className="p-8 text-center bg-pastel-gold">
                                                    <h3 className="text-3xl font-display text-brand-bronze mb-3">{galleryItem.title}</h3>
                                                    <p className="text-brand-bronze/80 text-sm max-w-lg mx-auto leading-relaxed">{galleryItem.desc}</p>
                                                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mt-4">
                                                        {(galleryIndex ?? 0) + 1} / {activeItem.gallery.length}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
            <RequestBar />
        </main>
    );
}
