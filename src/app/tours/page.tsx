"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Map } from "lucide-react";

const tours = [
    {
        title: "The South's Hidden Gem",
        desc: "From the Rochester Falls to the Gris Gris cliffs, discover the soulful South.",
        image: "/images/mauritius_south.jpg",
        duration: "8 Hours"
    },
    {
        title: "North Coast Elegance",
        desc: "Vibrant markets in Port Louis followed by the serene Pamplemousses Gardens.",
        image: "/images/port-louis-caudan.webp",
        duration: "7 Hours"
    }
];

export default function ToursPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/mauritius-oberoi-royal.webp')" }}
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
                        Curated Island Adventures
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-display mb-8 text-white drop-shadow-2xl whitespace-nowrap"
                    >
                        Curated <span className="italic">Journeys</span>
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-light italic max-w-2xl mx-auto text-white/90 drop-shadow-md">
                        Every tour is balanced with exploration and moments of profound serenity.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 md:px-24 bg-pastel-warm">
                <div className="max-w-7xl mx-auto">

                    <div className="space-y-32">
                        {tours.map((tour, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-32 items-center`}
                            >
                                <div className="flex-1 relative aspect-video w-full rounded-[60px] overflow-hidden group shadow-2xl">
                                    <img src={tour.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-brand-bronze/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-sm">
                                        <Map className="w-5 h-5" />
                                        <span>{tour.duration} Private Tour</span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-display text-brand-bronze">{tour.title}</h2>
                                    <p className="text-xl text-muted-foreground leading-relaxed">{tour.desc}</p>
                                    <button className="flex items-center gap-4 group text-lg font-bold text-brand-bronze">
                                        View Itinerary
                                        <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
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
