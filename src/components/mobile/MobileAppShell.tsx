"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Compass, Car, Star, MessageSquare, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Hero } from "../Hero";
import { WhatWeDo } from "../WhatWeDo";
import { AboutSixteen } from "../AboutSixteen";
import { Services } from "../Services";
import { CarRental } from "../CarRental";
import { Offers } from "../Offers";

const sections = [
    { id: "hero", title: "Welcome", icon: <Home className="w-5 h-5" />, component: Hero },
    { id: "what-we-do", title: "Experience", icon: <Compass className="w-5 h-5" />, component: WhatWeDo },
    { id: "about", title: "Our Story", icon: <Star className="w-5 h-5" />, component: AboutSixteen },
    { id: "offers", title: "Offers", icon: <Star className="w-5 h-5" />, component: Services },
    { id: "transfers", title: "Transfers", icon: <Car className="w-5 h-5" />, component: CarRental },
    { id: "cherry-picks", title: "Signature", icon: <Star className="w-5 h-5" />, component: Offers },
];

export function MobileAppShell() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        if (activeIndex < sections.length - 1) {
            setDirection(1);
            setActiveIndex(activeIndex + 1);
        }
    };

    const handleBack = () => {
        if (activeIndex > 0) {
            setDirection(-1);
            setActiveIndex(activeIndex - 1);
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0
        })
    };

    return (
        <div className="fixed inset-0 bg-white overflow-hidden flex flex-col font-sans select-none">
            {/* iOS Top Bar */}
            <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-brand-gold/10 z-[100]">
                <div className="text-lg font-display font-bold tracking-tighter text-brand-bronze">
                    SIXTEEN<span className="text-brand-gold">.</span>TRAVEL
                </div>
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="p-2 text-brand-bronze hover:text-brand-gold transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Horizontal Section Track */}
            <main className="flex-1 relative overflow-hidden bg-pastel-cream">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                handleNext();
                            } else if (swipe > swipeConfidenceThreshold) {
                                handleBack();
                            }
                        }}
                        className="absolute inset-0 overflow-y-auto overflow-x-hidden touch-pan-y"
                    >
                        <div className="min-h-full w-full">
                            {(() => {
                                const Component = sections[activeIndex].component;
                                return <Component />;
                            })()}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* iOS Bottom Navigation Tab Bar */}
            <nav className="h-20 bg-white/90 backdrop-blur-xl border-t border-brand-gold/10 flex items-center justify-around px-2 z-[100] pb-safe">
                {sections.slice(0, 5).map((section, index) => (
                    <button
                        key={section.id}
                        onClick={() => {
                            setDirection(index > activeIndex ? 1 : -1);
                            setActiveIndex(index);
                        }}
                        className={cn(
                            "flex flex-col items-center gap-1.5 transition-all duration-300 px-3 py-2 rounded-2xl",
                            activeIndex === index ? "text-brand-gold" : "text-brand-bronze/40"
                        )}
                    >
                        <motion.div
                            animate={{ scale: activeIndex === index ? 1.1 : 1 }}
                            className={cn(
                                "p-1.5 rounded-xl transition-colors",
                                activeIndex === index ? "bg-brand-gold/10" : "bg-transparent"
                            )}
                        >
                            {section.icon}
                        </motion.div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{section.title}</span>
                    </button>
                ))}
            </nav>

            {/* Full Screen iOS Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-[200] bg-brand-bronze text-white p-8 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-xl font-display font-bold">Menu</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setDirection(index > activeIndex ? 1 : -1);
                                        setActiveIndex(index);
                                        setIsMenuOpen(false);
                                    }}
                                    className="block text-4xl font-display text-left hover:text-brand-gold transition-colors w-full"
                                >
                                    {section.title}
                                </button>
                            ))}
                            
                            <div className="h-px bg-white/10 my-10" />
                            
                            <div className="space-y-6">
                                <a href="/tours" className="block text-2xl font-display opacity-70">Tours</a>
                                <a href="/activities" className="block text-2xl font-display opacity-70">Activities</a>
                                <a href="/blog" className="block text-2xl font-display opacity-70">Blog</a>
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        window.dispatchEvent(new CustomEvent('open-contact'));
                                    }}
                                    className="block text-2xl font-display opacity-70"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                /* Hide scrollbars for the main section tracking but allow vertical scrolling */
                ::-webkit-scrollbar {
                    display: none;
                }
                .pb-safe {
                    padding-bottom: env(safe-area-inset-bottom);
                }
                
                /* Force full viewport sections and proportional fonts in mobile */
                @media (max-width: 768px) {
                    html, body {
                        overscroll-behavior: none;
                        background: #fff;
                    }
                    
                    /* Proportional font sizing for mobile */
                    h1 { font-size: 12vw !important; }
                    h2 { font-size: 10vw !important; line-height: 1.1 !important; }
                    h3 { font-size: 7vw !important; }
                    p { font-size: 4vw !important; }
                    
                    /* Modal constraints for mobile APP view */
                    .fixed.inset-0.z-\[10000\], 
                    .fixed.inset-0.z-\[10001\] {
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                    }
                    
                    .fixed.inset-0.z-\[10000\] > div:last-child,
                    .fixed.inset-0.z-\[10001\] > div:last-child {
                        width: 90vw !important;
                        height: 80vh !important;
                        max-width: 90vw !important;
                        max-height: 80vh !important;
                        overflow-y: auto !important;
                        border-radius: 32px !important;
                    }
                    
                    /* Adjust specific sections for the full-screen story mode */
                    #st-hero, #st-what-we-do, #st-about, #st-offers, #st-transfers, #st-cherry-picks {
                        min-height: calc(100vh - 144px) !important; /* Viewport minus header and footer */
                        padding-top: 2rem !important;
                        padding-bottom: 2rem !important;
                    }

                    /* Ensure background images fill properly in story mode */
                    #st-hero img, #st-about img {
                        opacity: 0.6;
                    }
                }
            `}</style>
        </div>
    );
}
