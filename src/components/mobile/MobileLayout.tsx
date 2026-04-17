"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Compass, Car, Star, Menu, X, ArrowLeft, ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { RequestBar } from "../RequestBar";

interface MobileLayoutProps {
    children?: React.ReactNode;
    sections?: { id: string; title: string; component: React.ReactNode }[];
}

export function MobileLayout({ children, sections }: MobileLayoutProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [direction, setDirection] = useState(0);
    const [scrollState, setScrollState] = useState({ isAtTop: true, isAtBottom: false });
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // Sensitivity thresholds
        const atTop = scrollTop < 40;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 100;
        setScrollState({ isAtTop: atTop, isAtBottom: atBottom });
    };

    const scrollTo = (dir: 'up' | 'down') => {
        if (!scrollContainerRef.current) return;
        const move = dir === 'up' ? -window.innerHeight * 0.7 : window.innerHeight * 0.7;
        scrollContainerRef.current.scrollBy({ top: move, behavior: 'smooth' });
    };

    // Reset scroll state on section change
    useEffect(() => {
        setScrollState({ isAtTop: true, isAtBottom: false });
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }, [activeIndex]);

    // Handle hash links for mobile section switching
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && sections) {
                const index = sections.findIndex(s => s.id === hash);
                if (index !== -1 && index !== activeIndex) {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                }
            }
        };

        handleHashChange(); // Initial check
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [sections, activeIndex]);

    const navItems = [
        { name: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
        { name: "Tours", icon: <Compass className="w-5 h-5" />, href: "/tours" },
        { name: "Activities", icon: <Star className="w-5 h-5" />, href: "/activities" },
        { name: "Transfers", icon: <Car className="w-5 h-5" />, href: "/#transfers" },
    ];

    const handleNext = () => {
        if (sections && activeIndex < sections.length - 1) {
            setDirection(1);
            setActiveIndex(activeIndex + 1);
        }
    };

    const handleBack = () => {
        if (sections && activeIndex > 0) {
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
        <div className="fixed inset-0 bg-white overflow-hidden flex flex-col font-sans select-none z-[100]">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-brand-gold/10 z-[100]">
                {pathname !== "/" ? (
                    <button onClick={() => router.back()} className="text-brand-bronze p-2 -ml-2">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                ) : (
                    <div className="text-lg font-display font-bold tracking-tighter text-brand-bronze">
                        SIXTEEN<span className="text-brand-gold">.</span>TRAVEL
                    </div>
                )}
                
                <div className="flex items-center gap-2">
                     {pathname !== "/" && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                            {pathname.replace("/", "").replace(/-/g, " ")}
                        </span>
                     )}
                     <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="p-2 text-brand-bronze hover:text-brand-gold transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Content Scroller */}
            <main className="flex-1 relative overflow-hidden bg-white">
                {sections ? (
                    <>
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={activeIndex}
                                ref={scrollContainerRef}
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
                                    if (swipe < -swipeConfidenceThreshold) handleNext();
                                    else if (swipe > swipeConfidenceThreshold) handleBack();
                                }}
                                onScroll={handleScroll}
                                className="absolute inset-0 overflow-y-auto overflow-x-hidden touch-pan-y h-full scroll-smooth"
                            >
                                <div className="min-h-full pb-32">
                                    {sections[activeIndex].component}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* HIGH-VISIBILITY NAVIGATION OVERLAYS */}
                        
                        {/* Top Overlay: Swipe Left or Scroll Up */}
                        <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none z-[120]">
                            <AnimatePresence mode="wait">
                                {scrollState.isAtTop ? (
                                    activeIndex > 0 && (
                                        <motion.button 
                                            key="nav-previous"
                                            onClick={handleBack}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="bg-brand-gold text-white px-5 py-2 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(196,160,82,0.4)] pointer-events-auto active:scale-95 transition-transform"
                                        >
                                            <ChevronLeft className="w-5 h-5 animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Previous</span>
                                        </motion.button>
                                    )
                                ) : null}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Overlay: Swipe Right or Scroll Down */}
                        <div className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none z-[120]">
                            <AnimatePresence mode="wait">
                                {scrollState.isAtBottom ? (
                                    activeIndex < sections.length - 1 && (
                                        <motion.button 
                                            key="nav-next"
                                            onClick={handleNext}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="bg-brand-gold text-white px-5 py-2 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(196,160,82,0.4)] pointer-events-auto active:scale-95 transition-transform"
                                        >
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Next</span>
                                            <ChevronRight className="w-5 h-5 animate-pulse" />
                                        </motion.button>
                                    )
                                ) : null}
                            </AnimatePresence>
                        </div>
                    </>
                ) : (
                    <div className="h-full overflow-y-auto p-6 scroll-smooth">
                        {children}
                        <div className="h-20" /> {/* Spacer */}
                    </div>
                )}
            </main>

            {/* Menu Drawer */}
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
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        router.push(item.href);
                                        setIsMenuOpen(false);
                                    }}
                                    className="block text-4xl font-display text-left hover:text-brand-gold transition-colors w-full"
                                >
                                    {item.name}
                                </button>
                            ))}
                            <div className="h-px bg-white/10 my-10" />
                            <div className="space-y-6">
                                <button onClick={() => { setIsMenuOpen(false); window.dispatchEvent(new CustomEvent('open-contact')); }} className="block text-2xl font-display opacity-70 text-left">Contact Us</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <style jsx global>{`
                ::-webkit-scrollbar { display: none; }
                .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
                @media (max-width: 768px) {
                    h1 { font-size: 10vw !important; }
                    h2 { font-size: 8vw !important; line-height: 1.1 !important; }
                    p { font-size: 3.8vw !important; }
                    .proportional-section {
                        min-height: calc(100vh - 144px) !important;
                        padding: 2rem !important;
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: center !important;
                        min-height: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}
