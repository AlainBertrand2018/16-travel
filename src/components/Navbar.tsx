"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            // Trigger morph a bit later for better visual impact
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Car Rental", href: "/car-rental" },
        { name: "Tours", href: "/tours" },
        { name: "Activities", href: "/activities" },
        { name: "Boutique", href: "/boutique" },
        { name: "Blog", href: "/blog" },
    ];

    const isHome = pathname === "/";

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 md:pt-6">
            <motion.nav
                id="st-section-global-navbar"
                initial={false}
                animate={{
                    width: scrolled ? "auto" : "100%",
                    maxWidth: scrolled ? "800px" : "100%",
                    borderRadius: scrolled ? "100px" : "0px",
                    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : (isHome ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.9)"),
                    paddingLeft: scrolled ? "32px" : "24px",
                    paddingRight: scrolled ? "12px" : "24px",
                    y: 0,
                    boxShadow: scrolled ? "0 20px 40px rgba(0,0,0,0.1)" : "0 0px 0px rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className={cn(
                    "relative z-50 transition-all duration-300 pointer-events-auto backdrop-blur-md flex items-center h-16 md:h-20",
                    !scrolled && isHome ? "text-brand-bronze" : "text-brand-bronze"
                )}
            >
                <div className={cn(
                    "flex items-center justify-between w-full mx-auto max-w-7xl",
                    scrolled ? "gap-8" : ""
                )}>
                    <Link id="st-child-global-navbar-logo" href="/" className="text-xl md:text-2xl font-display font-bold tracking-tighter whitespace-nowrap">
                        SIXTEEN<span className="text-brand-gold">.</span>TRAVEL
                    </Link>

                    {/* Desktop Nav */}
                    <div id="st-child-global-navbar-links" className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-xs lg:text-sm font-bold uppercase tracking-widest hover:text-brand-gold transition-colors whitespace-nowrap",
                                    pathname === item.href ? "text-brand-gold" : ""
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="flex items-center gap-3">
                            <button id="st-child-global-navbar-action" className="flex items-center space-x-1 text-[10px] font-bold border border-brand-gold/20 hover:border-brand-gold hover:text-brand-gold py-2 px-3 lg:px-4 rounded-full transition-all">
                                <Globe className="w-3 h-3 lg:w-4 lg:h-4" />
                                <span>EN</span>
                            </button>

                            {/* CTA button inside navbar when scrolled */}
                            <AnimatePresence>
                                {scrolled && (
                                    <motion.button
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-brand-gold text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-gold/20 hover:scale-105 active:scale-95 transition-transform"
                                    >
                                        Inquire
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 right-0 md:hidden bg-white/95 backdrop-blur-xl border-t mt-2 overflow-hidden rounded-3xl shadow-2xl"
                        >
                            <div className="flex flex-col space-y-4 p-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "text-2xl font-display",
                                            pathname === item.href ? "text-brand-gold" : ""
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}
