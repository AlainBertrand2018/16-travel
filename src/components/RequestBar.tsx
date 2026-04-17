"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Users, Car, MessageCircle, X, Mail, Phone, ChevronDown, Minus, Plus, Languages, ArrowRight } from "lucide-react";

interface RequestData {
    service: string;
    vehicleType: string;
    arrivalDate: string;
    departureDate: string;
    adults: number;
    children: number;
    language: "English" | "French";
    selectedOptions?: Array<{
        name: string;
        price?: string;
        detail?: string;
        date: string;
    }>;
}

interface RequestBarProps {
    modalOnly?: boolean;
}

export function RequestBar({ modalOnly = false }: RequestBarProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState<"selection" | "finalize">("finalize");
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [requestData, setRequestData] = useState<RequestData>({
        service: "Airport to Hotel",
        vehicleType: "Private Car",
        arrivalDate: new Date().toISOString().split('T')[0],
        departureDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        adults: 2,
        children: 0,
        language: "English"
    });

    const [form, setForm] = useState({ name: "", email: "" });
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
        
        const handleExternalOpen = (e: any) => {
            if (e.detail?.vehicleType) {
                const options = e.detail.selectedOptions?.map((o: any) => ({
                    ...o,
                    date: new Date().toISOString().split('T')[0] // Default date
                }));
                setRequestData(prev => ({ 
                    ...prev, 
                    vehicleType: e.detail.vehicleType,
                    service: e.detail.serviceType || "Custom Selection",
                    selectedOptions: options?.length ? options : undefined
                }));
                setStep("selection");
            } else {
                setStep("finalize");
            }
            setIsModalOpen(true);
        };

        window.addEventListener('open-booking', handleExternalOpen);

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener('open-booking', handleExternalOpen);
        };
    }, []);

    const services = [
        "Airport to Hotel",
        "Hotel to Airport",
        "Round Trip (Airport - Hotel - Airport)"
    ];

    const vehicles = ["Private Car", "Executive Car", "Executive Minivan"];

    const WHATSAPP_NUMBER = "23058191502";

    const handleWhatsapp = () => {
        if (!form.name || !form.email) return alert("Please fill in your name and email.");
        let optionsText = "";
        if (requestData.selectedOptions?.length) {
            optionsText = "\n*Selected Options:*\n" + requestData.selectedOptions.map(opt => `- ${opt.name} on ${opt.date}`).join("\n");
        }
        const text = `*New Request from ${form.name}*\n\n*Service:* ${requestData.service}\n*Vehicle:* ${requestData.vehicleType}${optionsText}\n*Arrival:* ${requestData.arrivalDate}\n*Departure:* ${requestData.departureDate}\n*Guests:* ${requestData.adults} Adults, ${requestData.children} Children\n*Preferred Language:* ${requestData.language}\n*Email:* ${form.email}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    };

    const handleEmail = () => {
        if (!form.name || !form.email) return alert("Please fill in your name and email.");
        let optionsText = "";
        if (requestData.selectedOptions?.length) {
            optionsText = "\nSelected Options:\n" + requestData.selectedOptions.map(opt => `- ${opt.name} on ${opt.date}`).join("\n");
        }
        const subject = `Booking Request: ${requestData.service}`;
        const body = `Name: ${form.name}\nEmail: ${form.email}\nLanguage: ${requestData.language}\n\nRequest Details:\n- Service: ${requestData.service}\n- Vehicle: ${requestData.vehicleType}${optionsText}\n- Arrival: ${requestData.arrivalDate}\n- Departure: ${requestData.departureDate}\n- Guests: ${requestData.adults} Adults, ${requestData.children} Children`;
        window.location.href = `mailto:contact@sixteentravel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const modalContent = (
        <AnimatePresence mode="wait">
            {isModalOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 sm:p-12">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand-bronze/40 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <motion.div 
                        key={step}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden border border-brand-gold/20 flex flex-col max-h-[90vh]"
                    >
                        {/* Static Header & Close Button */}
                        <div className="shrink-0 p-6 md:px-10 md:pt-10 md:pb-6 border-b border-brand-gold/5 flex justify-between items-start relative">
                            <div className="text-left pr-8">
                                <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                    {step === "selection" ? "Step 1 of 2" : "Step 2 of 2"}
                                </p>
                                <h3 className="text-2xl md:text-3xl font-display text-brand-bronze leading-tight">
                                    {step === "selection" ? "Booking Details" : "Finalize Your Request"}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 rounded-full bg-pastel-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all shadow-sm shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                            {step === "selection" ? (
                                <div className="space-y-6">
                                    <div className="space-y-4 text-left">
                                        {requestData.selectedOptions && requestData.selectedOptions.length > 0 ? (
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-2 px-1">Selected Tours & Transfers</label>
                                                <div className="space-y-3">
                                                    {requestData.selectedOptions.map((opt, idx) => (
                                                        <div key={idx} className="bg-pastel-gold/50 border border-brand-gold/20 rounded-2xl p-4">
                                                            <div className="flex justify-between items-start mb-3">
                                                                <div>
                                                                    <p className="text-sm font-bold text-brand-bronze">{opt.name}</p>
                                                                    {opt.price && <p className="text-[10px] text-brand-gold font-bold">{opt.price}</p>}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-1">Date</label>
                                                                <input 
                                                                    type="date" 
                                                                    className="w-full bg-white border border-brand-gold/10 rounded-xl px-3 py-2 text-sm text-brand-bronze focus:ring-2 focus:ring-brand-gold outline-none"
                                                                    value={opt.date}
                                                                    onChange={(e) => {
                                                                        const newOpts = [...(requestData.selectedOptions || [])];
                                                                        newOpts[idx] = { ...newOpts[idx], date: e.target.value };
                                                                        setRequestData({ ...requestData, selectedOptions: newOpts });
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-2 px-1">Route & Service</label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {services.map(s => (
                                                        <button 
                                                            key={s}
                                                            onClick={() => setRequestData({...requestData, service: s})}
                                                            className={`text-left px-5 py-3 rounded-2xl text-sm transition-all border ${requestData.service === s ? 'bg-brand-gold text-white border-brand-gold shadow-md' : 'bg-pastel-gold/50 border-brand-gold/10 text-brand-bronze hover:border-brand-gold/30'}`}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4 text-left">
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-2 px-1">Arrival</label>
                                                <input 
                                                    type="date" 
                                                    className="w-full bg-pastel-gold/50 border border-brand-gold/10 rounded-xl px-4 py-3 text-sm text-brand-bronze focus:ring-2 focus:ring-brand-gold outline-none"
                                                    value={requestData.arrivalDate}
                                                    onChange={e => setRequestData({...requestData, arrivalDate: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-2 px-1">Departure</label>
                                                <input 
                                                    type="date" 
                                                    className="w-full bg-pastel-gold/50 border border-brand-gold/10 rounded-xl px-4 py-3 text-sm text-brand-bronze focus:ring-2 focus:ring-brand-gold outline-none"
                                                    value={requestData.departureDate}
                                                    onChange={e => setRequestData({...requestData, departureDate: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-pastel-gold/30 rounded-2xl p-4 border border-brand-gold/10 text-left">
                                            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">Passengers</p>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-sm font-bold text-brand-bronze">Adults</span>
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => setRequestData({...requestData, adults: Math.max(1, requestData.adults - 1)})} className="w-8 h-8 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all"><Minus className="w-3 h-3"/></button>
                                                    <span className="text-sm font-bold w-4 text-center">{requestData.adults}</span>
                                                    <button onClick={() => setRequestData({...requestData, adults: requestData.adults + 1})} className="w-8 h-8 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all"><Plus className="w-3 h-3"/></button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-brand-bronze">Children</span>
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => setRequestData({...requestData, children: Math.max(0, requestData.children - 1)})} className="w-8 h-8 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all"><Minus className="w-3 h-3"/></button>
                                                    <span className="text-sm font-bold w-4 text-center">{requestData.children}</span>
                                                    <button onClick={() => setRequestData({...requestData, children: requestData.children + 1})} className="w-8 h-8 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all"><Plus className="w-3 h-3"/></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Request Summary */}
                                    <div className="bg-pastel-gold rounded-2xl p-4 border border-brand-gold/10 text-left">
                                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">Trip Overview</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2 text-[13px] font-medium text-brand-bronze">
                                            <div className="col-span-1 sm:col-span-2">
                                                <p className="text-[10px] text-muted-foreground uppercase opacity-60">Service & Vehicle</p>
                                                <p className="truncate">{requestData.service} • {requestData.vehicleType}</p>
                                                {requestData.selectedOptions?.length ? (
                                                    <div className="mt-2 space-y-1">
                                                        {requestData.selectedOptions.map((o, idx) => (
                                                            <p key={idx} className="text-xs text-brand-bronze/80">• {o.name} ({o.date})</p>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase opacity-60">Arrival</p>
                                                <p>{requestData.arrivalDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase opacity-60">Departure</p>
                                                <p>{requestData.departureDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase opacity-60">Guests</p>
                                                <p>{requestData.adults} Adults, {requestData.children} Children</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-left">
                                        <div>
                                            <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-1.5 px-1">Full Name *</label>
                                            <input 
                                                type="text" 
                                                className="w-full bg-pastel-gold/50 border border-brand-gold/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all placeholder:text-brand-gold/30 text-brand-bronze"
                                                placeholder="Enter your name"
                                                value={form.name}
                                                onChange={e => setForm({...form, name: e.target.value})}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-1.5 px-1">Email *</label>
                                                <input 
                                                    type="email" 
                                                    className="w-full bg-pastel-gold/50 border border-brand-gold/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all placeholder:text-brand-gold/30 text-brand-bronze"
                                                    placeholder="your@email.com"
                                                    value={form.email}
                                                    onChange={e => setForm({...form, email: e.target.value})}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block mb-1.5 px-1">Language</label>
                                                <div className="relative">
                                                    <select 
                                                        className="w-full bg-pastel-gold/50 border border-brand-gold/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold outline-none appearance-none text-brand-bronze"
                                                        value={requestData.language}
                                                        onChange={e => setRequestData({...requestData, language: e.target.value as any})}
                                                    >
                                                        <option value="English">English</option>
                                                        <option value="French">French</option>
                                                    </select>
                                                    <Languages className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        <div className="shrink-0 p-6 md:p-10 border-t border-brand-gold/5 bg-white space-y-4">
                            {step === "selection" ? (
                                <button 
                                    onClick={() => setStep("finalize")}
                                    className="w-full bg-brand-gold text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-brand-bronze transition-all shadow-lg"
                                >
                                    Proceed to Contact
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button 
                                            onClick={handleWhatsapp}
                                            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-[#25D366]/20"
                                        >
                                            <Phone className="w-4 h-4" />
                                            WhatsApp
                                        </button>
                                        <button 
                                            onClick={handleEmail}
                                            className="flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-bronze text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-brand-gold/20"
                                        >
                                            <Mail className="w-4 h-4" />
                                            Email
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => setStep("selection")}
                                        className="text-[10px] uppercase font-bold text-brand-gold tracking-widest hover:text-brand-bronze transition-colors flex items-center justify-center gap-2 w-full pt-2"
                                    >
                                        <ChevronLeft className="w-3 h-3" /> Back to Trip Details
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative w-full max-w-6xl mx-auto" ref={dropdownRef}>
            <motion.div 
                className="glass rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center shadow-2xl border border-white/20 relative z-[60]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {/* Service Selector */}
                <div 
                    className="flex-[1.2] flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-brand-gold/10 group cursor-pointer relative"
                    onClick={() => setActiveDropdown(activeDropdown === 'service' ? null : 'service')}
                >
                    <Car className="w-5 h-5 mr-3 text-brand-gold shrink-0" />
                    <div className="text-left flex-1 min-w-0">
                        <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest leading-none mb-1">Services</p>
                        <p className="text-sm font-medium text-brand-bronze truncate">{requestData.service}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform shrink-0 ml-2 ${activeDropdown === 'service' ? 'rotate-180' : ''}`} />
                    
                    <AnimatePresence>
                        {activeDropdown === 'service' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl mt-4 rounded-2xl shadow-2xl p-4 z-[100] border border-brand-gold/10 overflow-visible"
                            >
                                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-3 text-left">Select Route</p>
                                {services.map(s => (
                                    <div 
                                        key={s} 
                                        className="py-2.5 px-3 hover:bg-brand-gold/10 rounded-xl text-sm text-brand-bronze transition-colors cursor-pointer text-left"
                                        onClick={() => setRequestData({...requestData, service: s})}
                                    >
                                        {s}
                                    </div>
                                ))}
                                <div className="h-px bg-brand-gold/10 my-3" />
                                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-3 text-left">Vehicle Type</p>
                                {vehicles.map(v => (
                                    <div 
                                        key={v} 
                                        className={`py-2 px-3 rounded-xl text-sm transition-colors cursor-pointer text-left ${requestData.vehicleType === v ? 'bg-brand-gold text-white' : 'hover:bg-brand-gold/10 text-brand-bronze'}`}
                                        onClick={() => setRequestData({...requestData, vehicleType: v})}
                                    >
                                        {v}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Arrival Date */}
                <div className="flex-1 min-w-0 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-brand-gold/10 group cursor-pointer relative">
                    <CalendarIcon className="w-5 h-5 mr-3 text-brand-gold shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                        <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest leading-none mb-1">Arrival</p>
                        <input 
                            type="date" 
                            className="text-[13px] font-medium text-brand-bronze bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none w-full"
                            value={requestData.arrivalDate}
                            onChange={(e) => setRequestData({...requestData, arrivalDate: e.target.value})}
                        />
                    </div>
                </div>

                {/* Departure Date */}
                <div className="flex-1 min-w-0 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-brand-gold/10 group cursor-pointer relative">
                    <CalendarIcon className="w-5 h-5 mr-3 text-brand-gold shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                        <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest leading-none mb-1">Departure</p>
                        <input 
                            type="date" 
                            className="text-[13px] font-medium text-brand-bronze bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none w-full"
                            value={requestData.departureDate}
                            onChange={(e) => setRequestData({...requestData, departureDate: e.target.value})}
                        />
                    </div>
                </div>

                {/* Guests Selector */}
                <div 
                    className="flex-1 min-w-0 flex items-center px-6 py-3 group cursor-pointer relative"
                    onClick={() => setActiveDropdown(activeDropdown === 'guests' ? null : 'guests')}
                >
                    <Users className="w-5 h-5 mr-3 text-brand-gold shrink-0" />
                    <div className="text-left flex-1 min-w-0">
                        <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest leading-none mb-1">Guests</p>
                        <p className="text-sm font-medium text-brand-bronze truncate">{requestData.adults}A, {requestData.children}C</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform shrink-0 ml-2 ${activeDropdown === 'guests' ? 'rotate-180' : ''}`} />

                    <AnimatePresence>
                        {activeDropdown === 'guests' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full right-0 w-64 bg-white/95 backdrop-blur-xl mt-4 rounded-2xl shadow-2xl p-5 z-[100] border border-brand-gold/10"
                            >
                                <div className="flex justify-between items-center mb-4 text-left">
                                    <div>
                                        <p className="text-sm font-bold text-brand-bronze">Adults</p>
                                        <p className="text-[10px] text-muted-foreground">Ages 13+</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={(e) => {e.stopPropagation(); setRequestData({...requestData, adults: Math.max(1, requestData.adults - 1)})}} className="w-7 h-7 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-colors"><Minus className="w-3 h-3"/></button>
                                        <span className="text-sm font-bold w-4 text-center">{requestData.adults}</span>
                                        <button onClick={(e) => {e.stopPropagation(); setRequestData({...requestData, adults: requestData.adults + 1})}} className="w-7 h-7 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-colors"><Plus className="w-3 h-3"/></button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-left">
                                    <div>
                                        <p className="text-sm font-bold text-brand-bronze">Children</p>
                                        <p className="text-[10px] text-muted-foreground">Ages 2-12</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={(e) => {e.stopPropagation(); setRequestData({...requestData, children: Math.max(0, requestData.children - 1)})}} className="w-7 h-7 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-colors"><Minus className="w-3 h-3"/></button>
                                        <span className="text-sm font-bold w-4 text-center">{requestData.children}</span>
                                        <button onClick={(e) => {e.stopPropagation(); setRequestData({...requestData, children: requestData.children + 1})}} className="w-7 h-7 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-colors"><Plus className="w-3 h-3"/></button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Submit Button */}
                <button 
                    onClick={() => {
                        setStep("finalize");
                        setIsModalOpen(true);
                    }}
                    className="bg-brand-gold hover:bg-brand-bronze text-white p-4.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center m-1 shrink-0"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            </motion.div>

            {isMounted && createPortal(modalContent, document.body)}
        </div>
    );
}
