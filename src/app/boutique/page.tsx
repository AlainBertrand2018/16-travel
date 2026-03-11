"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";

const products = [
    {
        name: "Artisanal Beach Tote",
        price: "€120",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2070",
        category: "Accessories"
    },
    {
        name: "Pure Island Essence",
        price: "€85",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2070",
        category: "Fragrance"
    },
    {
        name: "Linen Escape Set",
        price: "€210",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2072",
        category: "Apparel"
    },
    {
        name: "Hand-Woven Sun Hat",
        price: "€95",
        image: "/images/Chapeau_paille.webp",
        category: "Accessories"
    }
];

export default function BoutiquePage() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

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
                title: "Boutique",
                component: (
                    <div className="proportional-section relative overflow-hidden text-center bg-brand-bronze text-white p-12 min-h-screen flex flex-col justify-center">
                        <div className="absolute inset-0 opacity-40">
                             <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2070" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-10 space-y-8">
                             <span className="inline-block px-4 py-1.5 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                                Exclusive Island Living
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display leading-[1.1]">
                                The <br /> Boutique
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                A curated selection of island lifestyle essentials.
                            </p>
                        </div>
                    </div>
                )
            },
            ...products.map((prod, i) => ({
                id: `product-${i}`,
                title: prod.name,
                component: (
                    <div className="proportional-section bg-pastel-cream p-10 min-h-screen flex flex-col justify-center space-y-8">
                        <div className="relative aspect-[3/4] w-full rounded-[40px] overflow-hidden shadow-2xl">
                            <img src={prod.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-4 text-center">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gold mb-2">{prod.category}</p>
                            <h3 className="text-2xl font-display text-brand-bronze">{prod.name}</h3>
                            <p className="font-bold text-brand-gold text-lg">{prod.price}</p>
                            <button className="bg-brand-gold text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg mt-6">
                                Add to Quote
                            </button>
                        </div>
                    </div>
                )
            }))
        ];

        return <MobileLayout sections={mobileSections} />;
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <section id="st-section-boutique-header" className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center mb-16">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2070')" }}
                >
                    <div className="absolute inset-0 bg-brand-bronze/40" />
                </div>
                <div className="relative z-10 px-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8 font-bold text-white bg-brand-gold px-6 py-2 rounded-full shadow-lg inline-block"
                    >
                        Exclusive Island Living
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, x: -30, y: 30 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-display mb-8 text-white drop-shadow-2xl whitespace-nowrap"
                    >
                        The <span>Boutique</span>
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/90 drop-shadow-md">
                        A curated selection of island lifestyle essentials.
                    </p>
                </div>
            </section>

            <section id="st-section-boutique-products" className="py-24 px-6 md:px-24 bg-pastel-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="flex items-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-sm">
                            <ShoppingBag className="w-6 h-6" />
                            <span>Worldwide Shipping Available</span>
                        </div>
                    </div>

                    <div id="st-child-boutique-products-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((prod, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden mb-6 shadow-xl">
                                    <img src={prod.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-brand-gold">
                                            <Heart className="w-5 h-5 fill-current" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gold mb-2">{prod.category}</p>
                                <h3 className="text-2xl font-display mb-2 text-brand-bronze">{prod.name}</h3>
                                <p className="font-bold text-brand-gold">{prod.price}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
