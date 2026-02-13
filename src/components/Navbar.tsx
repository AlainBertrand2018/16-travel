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
        const handleScroll = () => setScrolled(window.scrollY > 50);
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
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                scrolled || !isHome ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent text-brand-bronze"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-display font-bold tracking-tighter">
                    SIXTEEN<span className="text-brand-gold">.</span>TRAVEL
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium hover:text-brand-gold transition-colors",
                                pathname === item.href ? "text-brand-gold" : ""
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button className="flex items-center space-x-1 text-sm font-medium border border-current opacity-50 hover:opacity-100 hover:text-brand-gold py-2 px-4 rounded-full transition-all">
                        <Globe className="w-4 h-4" />
                        <span>EN</span>
                    </button>
                </div>


                {/* Mobile Toggle */}
                <button
                    className="md:hidden"
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
                        className="md:hidden bg-background border-t mt-4 overflow-hidden text-foreground"
                    >
                        <div className="flex flex-col space-y-4 p-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "text-lg font-display",
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
        </nav>
    );
}
