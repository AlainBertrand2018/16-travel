"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { X, Navigation, Check, Map, ChevronLeft, ChevronRight } from "lucide-react";
import { RequestBar } from "@/components/RequestBar";

const bentoItems = [
    {
        id: "north-full",
        title: "North Tour — Full Day",
        duration: "8 hours",
        detail: "La Citadelle · Port Louis Market · Caudan Waterfront · Botanical Garden · Beau Plan Sugar Factory · Cap Malheureux",
        price: "MUR 12,000",
        image: "/images/marche_PL.webp",
        className: "md:col-span-2 lg:col-span-8 md:row-span-2 min-h-[400px] lg:min-h-[600px]",
        featured: true,
        gallery: [
            { img: "/images/pamplemousse-garden.webp", title: "Pamplemousse Garden", desc: "Discover the island's rich and unique botanical heritage." },
            { img: "/images/cheminee-aventureDuSucre.webp", title: "L'Aventure du Sucre", desc: "Discover the history of sugar and its importance to Mauritian culture." },
            { img: "/images/cap-malheureux.webp", title: "Cap Malheureux", desc: "All the beauty of our northern coastlines revealed." }
        ]
    },
    {
        id: "south-1",
        title: "Wild South - Full Day",
        duration: "8 hours",
        detail: "Grand Bassin · Bois Chéri Tea Factory · Gorges · Chamarel · Curious Corner · View Point",
        price: "MUR 12,000",
        image: "/images/mauritius_south.jpg",
        className: "md:col-span-1 lg:col-span-4 md:row-span-1 min-h-[300px]",
        featured: false,
        gallery: [
            { img: "/images/grandBassin.webp", title: "Grand Bassin", desc: "When Scenery reflects the fervor of the islanders." },
            { img: "/images/Bois Cheri.webp", title: "Bois Cheri Tea Estate", desc: "Discover the stunning story behind the unique Mauritius Tea." },
            { img: "/images/chamarel-7couleurs.webp", title: "Chamarel 7 Coloured Earth", desc: "Geological rarity in the middle of a green forest... Discover Chamarel." },
        ]
    },
    {
        id: "south-2",
        title: "Wild Wild South - Full Day",
        duration: "8 hours",
        detail: "La Vanille Crocodile Park · St Aubin Rhum Factory · Gris-gris · Ile Aux Sancho · Rochester Fall · Maconde",
        price: "MUR 12,000",
        image: "/images/grisGris.webp",
        className: "md:col-span-1 lg:col-span-4 md:row-span-1 min-h-[300px]",
        featured: false,
        gallery: [
            { img: "/images/rochester.webp", title: "Rochester Falls", desc: "Where sculpted basalt columns meet cascading waters, Rochester Falls offers a raw, poetic escape into nature’s artistry." },
            { img: "/images/laVanilleCrocodilePark.webp", title: "La Vanille Crocodile Park", desc: "Step into a world where giants roam free. La Vanille Reserve is a lush sanctuary where crocodiles bask, giant tortoises wander, and nature’s most ancient creatures command your attention." },
            { img: "/images/stAubin.avif", title: "St. Aubin Rum Distillery", desc: "Discover the secrets of rum production and enjoy a tasting session at one of the island's most iconic distilleries." },
        ]
    },
    {
        id: "north-half",
        title: "North Tour — Half Day",
        duration: "4 hours",
        detail: "Quick highlights of North regional attractions",
        price: "MUR 10,000",
        image: "/images/odysseo.webp",
        className: "md:col-span-1 lg:col-span-6 md:row-span-1 min-h-[300px] lg:min-h-[400px]",
        featured: false,
        gallery: [
            { img: "/images/odysseo.webp", title: "Odysseo Oceanarium", desc: "Discover the wonders of the Indian Ocean at Odysseo, the largest aquarium in the Southern Hemisphere. A mesmerizing journey through vibrant coral reefs, mysterious deep-sea trenches, and captivating marine life." },
            { img: "/images/champ_de_Mars_Racecourse.webp", title: "Champ de Mars Racecourse", desc: "Where history thunders alive... The Champs de Mars Racecourse, one of the oldest of the World (est. 1812)ignites passion, elegance, and island spirit nestled within a dramatic mountain skyline." },
            { img: "/images/caudan_CraftMarket.webp", title: "The Caudan Craft Market", desc: "Discover the vibrant heart of Mauritian craftsmanship at The Caudan Craft Market. A bustling hub where local artisans showcase their talents, offering a colorful array of handmade souvenirs, intricate textiles, and unique treasures." }
        ]
    },
    {
        id: "south-half",
        title: "South Tour — Half Day",
        duration: "5 hours",
        detail: "Quick highlights of South regional attractions",
        price: "MUR 10,000",
        image: "/images/le-chamarel-restaurant.webp",
        className: "md:col-span-1 lg:col-span-6 md:row-span-1 min-h-[300px] lg:min-h-[400px]",
        featured: false,
        gallery: [
            { img: "/images/mahebourg_Market.webp", title: "Mahébourg Market", desc: "Discover the vibrant heart of Mauritian craftsmanship at The Caudan Craft Market. A bustling hub where local artisans showcase their talents, offering a colorful array of handmade souvenirs, intricate textiles, and unique treasures." },
            { img: "/images/mouchoir-rouge.webp", title: "Mouchoir Rouge", desc: "A solitary jewel adrift in turquoise lagoons, Île au Mouchoir Rouge captivates with wild beauty, mystery, and untouched serenity." },
            { img: "/images/maconde.webp", title: "Maconde", desc: "Perched above crashing waves, Maconde Belvedere unveils dramatic coastal curves, endless ocean horizons, and breathtaking, wind-swept Mauritian vistas." },
        ]
    }
];

export default function ToursPage() {
    const [activeItem, setActiveItem] = useState<any>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
    const galleryItem = (galleryIndex !== null && activeItem?.gallery) ? activeItem.gallery[galleryIndex] : null;

    // Stop body scroll when modal open
    useEffect(() => {
        if (activeItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [activeItem]);

    const handleReserve = (tour: any) => {
        setActiveItem(null);
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('open-booking', {
                detail: {
                    vehicleType: "Private Executive Vehicle",
                    serviceType: "Trips & Excursions",
                    selectedOptions: [{ name: tour.title, price: tour.price }]
                }
            }));
        }, 300);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section id="st-section-tours-header" className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden text-center mb-16">
                <div className="absolute inset-0">
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

            <section className="pb-32 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="text-center pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28 max-w-3xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-brand-gold mb-6"
                    >
                        Handpicked Experiences
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display text-brand-bronze leading-[1.1] mb-6"
                    >
                        Our Signature Tours
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base md:text-lg text-brand-bronze/60 font-light leading-relaxed max-w-xl mx-auto"
                    >
                        From volcanic highlands to turquoise lagoons — each itinerary is crafted to reveal the soul of Mauritius.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                    {bentoItems.map((item) => (
                        <motion.div
                            layoutId={`card-${item.id}`}
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
                                layoutId={`content-${item.id}`}
                            >
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/30">
                                        <Map className="w-3 h-3" />
                                        {item.duration}
                                    </span>
                                </div>
                                <motion.h3
                                    layoutId={`title-${item.id}`}
                                    className={`${item.featured ? 'text-4xl lg:text-6xl text-brand-gold' : 'text-2xl lg:text-3xl'} font-display leading-tight mb-2`}
                                >
                                    {item.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`desc-${item.id}`}
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
                            layoutId={`card-${activeItem.id}`}
                            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        >
                            <button
                                onClick={() => setActiveItem(null)}
                                className="absolute top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-brand-bronze/20 rounded-full text-brand-bronze lg:text-brand-bronze lg:bg-brand-bronze/5 hover:bg-brand-gold hover:text-white transition-all shadow-lg hidden lg:block"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Side */}
                            <div className="w-full lg:w-1/2 flex flex-col h-auto lg:h-full shrink-0 border-b lg:border-b-0 lg:border-r border-brand-bronze/10">
                                <div className="relative flex-1 min-h-[300px] lg:min-h-0 overflow-hidden">
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
                                            <Map className="w-3 h-3" />
                                            {activeItem.duration}
                                        </span>
                                        <motion.h3
                                            layoutId={`title-${activeItem.id}`}
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
                            <div className="w-full lg:w-1/2 flex flex-col h-full">
                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto p-8 lg:p-16 pb-4 custom-scrollbar">
                                    <div className="hidden lg:block mb-8">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-gold rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4 border border-brand-gold/20">
                                            <Map className="w-3 h-3" />
                                            {activeItem.duration}
                                        </span>
                                        <motion.h3
                                            layoutId={`title-desk-${activeItem.id}`}
                                            className="text-5xl font-display leading-tight text-brand-bronze"
                                        >
                                            {activeItem.title}
                                        </motion.h3>
                                    </div>

                                    <div className="space-y-10">
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-3">Itinerary Route</h4>
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
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-4">Included in Package</h4>
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
                                    </div>
                                </div>

                                {/* Pinned Price + CTA — always visible */}
                                <div className="shrink-0 p-8 lg:px-16 lg:pb-12 pt-6 border-t border-brand-bronze/10 bg-white flex flex-col gap-4">
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] font-black uppercase text-brand-gold tracking-widest">Base Rate</span>
                                        <span className="text-3xl font-display text-brand-bronze font-bold">{activeItem.price}</span>
                                    </div>
                                    <button
                                        onClick={() => handleReserve(activeItem)}
                                        className="w-full bg-brand-gold text-white py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-bronze hover:shadow-brand-bronze/20 transition-all duration-300"
                                    >
                                        Reserve This Tour
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
        </main>
    );
}
