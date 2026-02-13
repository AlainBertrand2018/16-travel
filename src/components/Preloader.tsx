"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsComplete(true), 800);
                    return 100;
                }
                const next = prev + Math.floor(Math.random() * 10) + 1;
                return Math.min(next, 100);
            });
        }, 120);

        return () => clearInterval(timer);
    }, []);

    const dotVariants = {
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
                        transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
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
                                    <mask id="sixteen-mask-v2">
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

                                <g mask="url(#sixteen-mask-v2)">
                                    {/* Background State */}
                                    <rect width="200" height="150" fill="#C5A059" opacity="0.08" />

                                    {/* Progress Fill State */}
                                    <motion.rect
                                        x="0"
                                        y={150 - (progress * 1.5)}
                                        width="200"
                                        height="150"
                                        fill="#C5A059"
                                        transition={{ duration: 0.4 }}
                                    />
                                </g>

                                {/* Fine Definition Outline */}
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

                        {/* 2. Percentage Counter with Elegant Spacing */}
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

                        {/* 3. Sixteen Travel Loading... (Animated Dots) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-baseline gap-1"
                        >
                            <p className="text-xs md:text-sm uppercase tracking-[0.6em] font-bold text-brand-gold/60">
                                Sixteen Travel Loading
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
                        </motion.div>
                    </div>

                    {/* Subtle Ambient Pulse Background */}
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
