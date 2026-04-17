"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, CreditCard, Check, Copy, ChevronLeft } from "lucide-react";
import Image from "next/image";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        title: string;
        price: number;
        category: string;
        image: string;
    };
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, product }) => {
    const [step, setStep] = useState<"details" | "payment">("details");
    const [date, setDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [copied, setCopied] = useState(false);

    const totalGuests = adults + children;
    const isMinivan = totalGuests > 7;
    
    // Mocking Minivan Price: using a logic like +50% or +100 EUR, 
    // for now let's just do a clean mock as requested.
    const minivanPriceMock = product.price + 80; 
    const currentPrice = isMinivan ? minivanPriceMock : product.price;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
                >
                    <div 
                        className="absolute inset-0 bg-brand-bronze/80 backdrop-blur-xl"
                        onClick={onClose}
                    />
                    
                        <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-[40px] shadow-3xl overflow-hidden border border-brand-gold/20 flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="shrink-0 p-8 pb-6 border-b border-brand-gold/5 flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">
                                    {step === "details" ? "Secure your spot" : "Finalize Payment"}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-display text-brand-bronze leading-tight">{product.title}</h2>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2.5 bg-pastel-gold rounded-full text-brand-bronze hover:bg-brand-bronze hover:text-white transition-all shadow-inner"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            {step === "details" ? (
                                <div className="space-y-6">
                                    <div className="space-y-6">
                                        <div className="space-y-2 text-left">
                                            <label className="text-[10px] font-black text-brand-bronze uppercase tracking-widest flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                                                Preferred Date
                                            </label>
                                            <input 
                                                type="date" 
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full p-4 bg-pastel-gold/30 border border-brand-gold/10 rounded-2xl font-bold text-brand-bronze focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-left">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-brand-bronze uppercase tracking-widest block">
                                                    Adults
                                                </label>
                                                <div className="flex items-center justify-between bg-pastel-gold/30 border border-brand-gold/10 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-brand-gold/20 transition-all">
                                                    <button 
                                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                                        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg font-bold text-brand-bronze hover:bg-brand-gold hover:text-white transition-all"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-black text-brand-bronze">{adults}</span>
                                                    <button 
                                                        onClick={() => totalGuests < 15 && setAdults(adults + 1)}
                                                        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg font-bold text-brand-bronze hover:bg-brand-gold hover:text-white transition-all"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-brand-bronze uppercase tracking-widest block">
                                                    Children
                                                </label>
                                                <div className="flex items-center justify-between bg-pastel-gold/30 border border-brand-gold/10 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-brand-gold/20 transition-all">
                                                    <button 
                                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                                        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg font-bold text-brand-bronze hover:bg-brand-gold hover:text-white transition-all"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-black text-brand-bronze">{children}</span>
                                                    <button 
                                                        onClick={() => totalGuests < 15 && setChildren(children + 1)}
                                                        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg font-bold text-brand-bronze hover:bg-brand-gold hover:text-white transition-all"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vehicle Info Card */}
                                    <div className={`p-4 rounded-2xl border transition-all duration-500 flex items-center gap-4 text-left ${isMinivan ? 'bg-brand-bronze text-white border-brand-gold shadow-lg shadow-brand-bronze/20' : 'bg-pastel-gold/20 border-brand-gold/10 text-brand-bronze'}`}>
                                        <div className="p-3 bg-brand-gold/20 rounded-xl">
                                            <Users className="w-5 h-5 text-brand-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest">Selected Vehicle</p>
                                            <p className="font-display text-lg">{isMinivan ? 'Private Minivan (Up to 15)' : 'Private Car/SUV (Up to 7)'}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-center bg-pastel-gold/20 p-6 rounded-[32px] border border-brand-gold/10 text-left">
                                        <div className="relative w-40 h-40 bg-white p-4 rounded-2xl shadow-xl border border-brand-gold/10">
                                            <Image 
                                                src="/images/barcode_mock.webp" 
                                                alt="Payment QR" 
                                                fill 
                                                className="object-contain p-4"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <h4 className="text-xs font-black text-brand-gold uppercase tracking-widest">Bank Details</h4>
                                            <div className="space-y-3">
                                                <div className="group cursor-pointer" onClick={() => handleCopy("SIXTEEN TRAVEL LTD")}>
                                                    <p className="text-[8px] font-black text-brand-bronze/40 uppercase">Company</p>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-brand-bronze">SIXTEEN TRAVEL LTD</p>
                                                        <Copy className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                                <div className="group cursor-pointer" onClick={() => handleCopy("MU12 ABC 3456 7890 1234 5678")}>
                                                    <p className="text-[8px] font-black text-brand-bronze/40 uppercase">Account Number (MCB)</p>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-mono font-bold text-brand-bronze">MU12 1234 5678 9012</p>
                                                        <Copy className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                            </div>
                                            {copied && (
                                                <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 animate-pulse">
                                                    <Check className="w-3 h-3" /> Copied to clipboard
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-center">
                                        <p className="text-xs text-brand-bronze/60 leading-relaxed italic">
                                            Please scan the QR code to pay via your Banking app, or use the bank details provided to wire your reservation. <br />
                                            Email your proof of payment to admin@sixteen.travel
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        <div className="shrink-0 p-8 border-t border-brand-gold/10 bg-white">
                            {step === "details" ? (
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Group Total</p>
                                        <p className="text-3xl font-display text-brand-bronze font-bold">€{currentPrice}</p>
                                    </div>
                                    <button 
                                        onClick={() => setStep("payment")}
                                        disabled={!date}
                                        className="bg-brand-bronze text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-bronze/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
                                    >
                                        Proceed to Pay
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <button 
                                        onClick={onClose}
                                        className="w-full py-5 bg-brand-gold text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-brand-bronze transition-all"
                                    >
                                        I've Completed Payment
                                    </button>
                                    <button 
                                        onClick={() => setStep("details")}
                                        className="text-[10px] font-bold text-brand-gold uppercase tracking-widest hover:text-brand-bronze transition-colors flex items-center justify-center gap-2 w-full"
                                    >
                                        <ChevronLeft className="w-3 h-3" /> Go Back to Details
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
