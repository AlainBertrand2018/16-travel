"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-8 left-8 right-8 md:left-auto md:w-[400px] z-[90]"
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-8 shadow-2xl border border-brand-gold/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold" />
                        
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-display text-xl text-brand-bronze">GDPR & Cookies</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    We use cookies to enhance your experience and analyze our traffic in accordance with our Privacy Policy.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={handleAccept}
                                className="flex-1 bg-brand-gold text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-bronze transition-all shadow-lg"
                            >
                                Accept All
                            </button>
                            <button 
                                onClick={() => setIsVisible(false)}
                                className="px-6 py-3 rounded-xl border border-brand-gold/20 text-brand-bronze font-bold text-xs uppercase tracking-widest hover:bg-brand-gold/5 transition-all outline-none"
                            >
                                Decline
                            </button>
                        </div>

                        <button 
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-brand-bronze transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
