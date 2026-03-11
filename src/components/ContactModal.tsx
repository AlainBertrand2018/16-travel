"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, Facebook } from "lucide-react";
import Image from "next/image";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const WHATSAPP_NUMBER = "23058191502";
    
    const handleWhatsapp = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
    };

    const handleEmail = () => {
        window.location.href = "mailto:contact@sixteentravel.com";
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 md:p-12">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand-bronze/60 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-brand-gold/20"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-pastel-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all z-50 shadow-sm"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Side: Visual/Branding */}
                        <div className="hidden md:block md:w-2/5 relative bg-brand-bronze overflow-hidden">
                            <Image 
                                src="https://sixteen-travel.vercel.app/images/hero-Background.jpg"
                                alt="Contact Sixteen Travel"
                                fill
                                className="object-cover opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                                <h3 className="text-4xl font-display mb-4">Let's Connect</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Our destination specialists are ready to curate your next extraordinary journey in Mauritius.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Contact Info */}
                        <div className="flex-1 p-8 md:p-16">
                            <span className="inline-block px-4 py-1.5 bg-pastel-gold text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                                Get In Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display text-brand-bronze mb-10 leading-tight">
                                How can we <br /> help you?
                            </h2>

                            <div className="space-y-8">
                                <button 
                                    onClick={handleWhatsapp}
                                    className="w-full flex items-center gap-6 p-6 rounded-3xl bg-pastel-gold/30 border border-brand-gold/10 hover:border-brand-gold transition-all text-left"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-gold shadow-sm">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">WhatsApp & Phone</p>
                                        <p className="text-xl font-medium text-brand-bronze">+230 5819 1502</p>
                                    </div>
                                </button>

                                <button 
                                    onClick={handleEmail}
                                    className="w-full flex items-center gap-6 p-6 rounded-3xl bg-pastel-gold/30 border border-brand-gold/10 hover:border-brand-gold transition-all text-left"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-gold shadow-sm">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Email Inquiry</p>
                                        <p className="text-xl font-medium text-brand-bronze">contact@sixteentravel.com</p>
                                    </div>
                                </button>

                                <div className="flex items-center gap-6 p-6 rounded-3xl border border-brand-gold/5 text-left opacity-60">
                                    <div className="w-14 h-14 rounded-2xl bg-pastel-gold/10 flex items-center justify-center text-brand-gold">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Our Office</p>
                                        <p className="text-sm font-medium text-brand-bronze">Belvédère, Mauritius</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center gap-4">
                                <a 
                                    href="https://www.facebook.com/profile.php?id=61562025393976" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Follow our journey</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
