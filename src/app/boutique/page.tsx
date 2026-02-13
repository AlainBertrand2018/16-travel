"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingBag, Star, Heart } from "lucide-react";

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
    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center mb-16">
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
                        The <span className="italic">Boutique</span>
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-light italic max-w-2xl mx-auto text-white/90 drop-shadow-md">
                        A curated selection of island lifestyle essentials.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 md:px-24 bg-pastel-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="flex items-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-sm">
                            <ShoppingBag className="w-6 h-6" />
                            <span>Worldwide Shipping Available</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
