"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useRef } from "react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
            {/* Cinematic Background (Lens Bloom Reveal) */}
            <motion.div
                initial={{ scale: 1.2, filter: "blur(10px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 3, ease: "easeOut" }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), opacity: useTransform(scrollYProgress, [0, 1], [1, 0]) }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-brand-bronze/10 z-10" />
                <div className="w-full h-full bg-[url('https://sixteen-travel.vercel.app/images/hero-Background.jpg')] bg-cover bg-center" />
            </motion.div>

            {/* Environmental Sun Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 30%, rgba(197, 160, 89, 0.15) 0%, transparent 70%)"
                }}
            />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 100,
                        delay: 0.8
                    }}
                >
                    <p className="uppercase tracking-[0.4em] text-[10px] md:text-xs mb-10 font-bold text-white bg-brand-gold px-8 py-3 rounded-full shadow-2xl border border-white/20">
                        Exclusive Mauritius Experience
                    </p>
                </motion.div>

                <div className="space-y-4 mb-14">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-display tracking-tight text-white drop-shadow-2xl leading-none"
                        >
                            Travel in
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-display tracking-tight text-white drop-shadow-2xl"
                        >
                            <span className="italic font-light">Sublime</span> Style
                        </motion.h1>
                    </div>
                </div>

                {/* Floating Search Bar (Blur-to-Clear Reveal) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 2 }}
                    className="w-full max-w-4xl glass p-2 rounded-2xl md:rounded-full hidden md:flex items-center shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border border-white/20"
                >
                    <div className="flex-1 flex items-center px-6 border-r border-brand-gold/10 group cursor-pointer">
                        <MapPin className="w-5 h-5 mr-3 text-brand-gold group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Destination</p>
                            <p className="text-sm font-medium text-brand-bronze">Where to go?</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-6 border-r border-brand-gold/10 group cursor-pointer">
                        <Calendar className="w-5 h-5 mr-3 text-brand-gold group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Travel Date</p>
                            <p className="text-sm font-medium text-brand-bronze">Add dates</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-6 group cursor-pointer text-brand-bronze">
                        <Users className="w-5 h-5 mr-3 text-brand-gold group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Guests</p>
                            <p className="text-sm font-medium text-brand-bronze">Add guests</p>
                        </div>
                    </div>

                    <button className="bg-brand-gold hover:bg-brand-bronze text-white p-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
                        <Search className="w-6 h-6" />
                    </button>
                </motion.div>
            </div>

            {/* Decorative Scroll Line */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 80 }}
                    transition={{ duration: 1.5, delay: 2.5 }}
                    className="relative"
                >
                    <div className="w-px h-full bg-gradient-to-b from-brand-gold to-transparent" />
                    <motion.div
                        animate={{ y: [0, 40, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]"
                    />
                </motion.div>
            </div>
        </section>
    );
}
