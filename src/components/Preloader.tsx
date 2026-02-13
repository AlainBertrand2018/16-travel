"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES_TO_PRELOAD = [
    "https://sixteen-travel.vercel.app/images/hero-Background.jpg",
    "/images/Vitz_logo_1.webp",
    "https://sixteen-travel.vercel.app/images/le_Morne_hiking.avif",
    "https://sixteen-travel.vercel.app/images/mru-catamaran-ileauxCerfs.webp",
    "https://sixteen-travel.vercel.app/images/dauphins.jpg",
    "https://sixteen-travel.vercel.app/images/7couleurs.jpg",
    "https://sixteen-travel.vercel.app/images/south-east.jpg",
    "/images/Jimny_Mau.webp",
    "/images/Toyota_mau.webp",
    "/images/BMW_Mau.webp",
    "/images/leMorne_hiking.avif",
];

export function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);

    useEffect(() => {
        let mounted = true;

        const preloadImage = (src: string) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve; // Continue even if one fails
            });
        };

        const loadAll = async () => {
            const total = IMAGES_TO_PRELOAD.length;
            let currentLoaded = 0;

            // Preload critical images in parallel but track individual completion
            const promises = IMAGES_TO_PRELOAD.map(async (src) => {
                await preloadImage(src);
                if (mounted) {
                    currentLoaded++;
                    setLoadedCount(currentLoaded);
                    // Standard progress calculation based on actual loading
                    const actualProgress = Math.floor((currentLoaded / total) * 100);
                    setProgress(actualProgress);
                }
            });

            await Promise.all(promises);

            if (mounted) {
                // Short hover at 100% for aesthetic closure
                setTimeout(() => setIsComplete(true), 1200);
            }
        };

        loadAll();

        return () => {
            mounted = false;
        };
    }, []);

    const dotVariants: any = {
        animate: (i: number) => ({
            opacity: [0, 1, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
            }
        })
    };

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-pastel-gold flex flex-col items-center justify-center overflow-hidden"
                    exit={{
                        opacity: 0,
                        backgroundColor: "#FFFBF0",
                        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                >
                    <div className="relative flex flex-col items-center gap-16">
                        {/* 1. The stylized "16" Monogram (SVG) */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64">
                            <svg
                                viewBox="0 0 200 150"
                                className="w-full h-full drop-shadow-sm"
                            >
                                <defs>
                                    <mask id="sixteen-mask-v3">
                                        <text
                                            x="40" y="110" fontSize="130"
                                            fontFamily="Playfair Display, serif" fontWeight="600" fill="white"
                                        >1</text>
                                        <text
                                            x="85" y="110" fontSize="130"
                                            fontFamily="Playfair Display, serif" fontWeight="600" fill="white"
                                        >6</text>
                                    </mask>
                                </defs>

                                <g mask="url(#sixteen-mask-v3)">
                                    <rect width="200" height="150" fill="#C5A059" opacity="0.08" />
                                    <motion.rect
                                        x="0"
                                        y={150 - (progress * 1.5)}
                                        width="200"
                                        height="150"
                                        fill="#C5A059"
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </g>

                                <text
                                    x="40" y="110" fontSize="130" fontFamily="Playfair Display, serif"
                                    fontWeight="600" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4"
                                >1</text>
                                <text
                                    x="85" y="110" fontSize="130" fontFamily="Playfair Display, serif"
                                    fontWeight="600" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4"
                                >6</text>
                            </svg>
                        </div>

                        {/* 2. Percentage Counter Linked to Actual Asset Loading */}
                        <div className="flex flex-col items-center gap-2">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-4xl md:text-5xl font-display font-light text-brand-bronze tracking-widest"
                            >
                                {progress}
                                <span className="text-sm align-top ml-1 text-brand-gold font-sans font-bold">%</span>
                            </motion.div>
                            <div className="w-12 h-[1px] bg-brand-gold/30 mt-2" />
                        </div>

                        {/* 3. Sixteen Travel Status Signature */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="flex items-baseline gap-1">
                                <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold text-brand-gold/60">
                                    Initializing Journey
                                </p>
                                <div className="flex gap-1 ml-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={dotVariants}
                                            animate="animate"
                                            className="w-1 h-1 rounded-full bg-brand-gold/60"
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[8px] uppercase tracking-[0.3em] font-medium text-brand-gold/40">
                                Optimizing assets for high-fidelity experience
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            background: "radial-gradient(circle at center, #C5A059 0%, transparent 80%)"
                        }}
                        animate={{ opacity: [0.02, 0.05, 0.02] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
