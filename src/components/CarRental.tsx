"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";
import { X, Plane, MapPin, Compass, Clock, ChevronRight } from "lucide-react";

/* ─── Data ─── */

interface ServiceDetail {
    label: string;
    price: string;
    type: "transfer" | "pickdrop" | "excursion";
    modalContent: {
        title: string;
        description: string;
        items: { name: string; detail?: string; price?: string }[];
    };
}

const cars = [
    {
        id: 1,
        name: "City Car",
        category: "Standard",
        image: "/images/16_suv_5-7.webp",
        features: ["With or Without Chauffeur", "A/C", "4 - 6 Seats"],
        details: ["Unlimited Mileage", "Passenger Insurance", "Airport Reception"],
        services: [
            {
                label: "Airport Transfers",
                price: "MUR 2,500+",
                type: "transfer" as const,
                modalContent: {
                    title: "Airport Transfers — Standard",
                    description: "Reliable point-to-point transfers in a comfortable family car.",
                    items: [
                        { name: "Airport → Hotel", price: "MUR 2,500" },
                        { name: "Hotel → Airport", price: "MUR 2,500" },
                        { name: "Inter-Hotel Transfer", price: "MUR 2,500" },
                    ],
                },
            },
            {
                label: "Pick & Drop",
                price: "MUR 4,000+",
                type: "pickdrop" as const,
                modalContent: {
                    title: "Pick & Drop — Standard",
                    description: "Book your vehicle for activity drop-offs and pickups across the island.",
                    items: [
                        { name: "Full Day", detail: "Casela · Boat Trips · Vallée Des Couleurs · Domaine Frederica · Big Foot · Marine Sub Scooter · Catamaran", price: "MUR 5,000" },
                        { name: "Half Day", detail: "Helicopter · Sky Dive", price: "MUR 4,000" },
                    ],
                },
            },
            {
                label: "Trips & Excursions",
                price: "MUR 4,000+",
                type: "excursion" as const,
                modalContent: {
                    title: "Trips & Excursions — Standard",
                    description: "Full-day and half-day guided tours with your private chauffeur.",
                    items: [
                        { name: "North Tour — Full Day (8hr)", detail: "La Citadelle · Port Louis Market · Caudan Waterfront · Botanical Garden · Beau Plan Sugar Factory · Cap Malheureux", price: "MUR 5,000" },
                        { name: "North Tour — Half Day (4hr)", detail: "Quick highlights of North regional attractions", price: "MUR 4,000" },
                        { name: "South Tour Package 1 (8hr)", detail: "Volcano · Grand Bassin · Bois Chéri Tea Factory · Gorges · Chamarel · Curious Corner · View Point", price: "MUR 5,000" },
                        { name: "South Tour Package 2 (8hr)", detail: "La Vanille Crocodile Park · St Aubin Rhum Factory · Gris-gris · Ile Aux Sancho · Rochester Fall · Maconde", price: "MUR 5,000" },
                        { name: "South Tour — Half Day (5hr)", detail: "Quick highlights of South regional attractions", price: "MUR 4,000" },
                    ],
                },
            },
        ],
    },
    {
        id: 2,
        name: "Executive Sedan",
        category: "Premium",
        image: "/images/16_exec_5-7.webp",
        features: ["With or Without Chauffeur", "A/C", "5 - 7 Seats"],
        details: ["Premium Interior", "VIP Fast Track", "Priority Booking"],
        services: [
            {
                label: "Airport Transfers",
                price: "MUR 7,000+",
                type: "transfer" as const,
                modalContent: {
                    title: "Airport Transfers — Executive",
                    description: "VIP arrival experience with fast-track and luxury sedan.",
                    items: [
                        { name: "Airport → Hotel", price: "MUR 7,000" },
                        { name: "Hotel → Airport", price: "MUR 7,000" },
                        { name: "Inter-Hotel Transfer", price: "MUR 7,000" },
                    ],
                },
            },
            {
                label: "Pick & Drop",
                price: "MUR 10,000+",
                type: "pickdrop" as const,
                modalContent: {
                    title: "Pick & Drop — Executive",
                    description: "Premium vehicle for all your activity transfers across Mauritius.",
                    items: [
                        { name: "Full Day", detail: "Casela · Boat Trips · Vallée Des Couleurs · Domaine Frederica · Big Foot · Marine Sub Scooter · Catamaran", price: "MUR 12,000" },
                        { name: "Half Day", detail: "Helicopter · Sky Dive", price: "MUR 10,000" },
                    ],
                },
            },
            {
                label: "Trips & Excursions",
                price: "MUR 10,000+",
                type: "excursion" as const,
                modalContent: {
                    title: "Trips & Excursions — Executive",
                    description: "Discover Mauritius in executive comfort with a private chauffeur.",
                    items: [
                        { name: "North Tour — Full Day (8hr)", detail: "La Citadelle · Port Louis Market · Caudan Waterfront · Botanical Garden · Beau Plan Sugar Factory · Cap Malheureux", price: "MUR 12,000" },
                        { name: "North Tour — Half Day (4hr)", detail: "Quick highlights of North regional attractions", price: "MUR 10,000" },
                        { name: "South Tour Package 1 (8hr)", detail: "Volcano · Grand Bassin · Bois Chéri Tea Factory · Gorges · Chamarel · Curious Corner · View Point", price: "MUR 12,000" },
                        { name: "South Tour Package 2 (8hr)", detail: "La Vanille Crocodile Park · St Aubin Rhum Factory · Gris-gris · Ile Aux Sancho · Rochester Fall · Maconde", price: "MUR 12,000" },
                        { name: "South Tour — Half Day (5hr)", detail: "Quick highlights of South regional attractions", price: "MUR 10,000" },
                    ],
                },
            },
        ],
    },
    {
        id: 3,
        name: "Executive Minivan",
        category: "Extended Luggage Capacity",
        image: "/images/16_minivan.webp",
        features: ["With Chauffeur", "A/C", "4 - 8 Seats"],
        details: ["Extra Luggage Room", "Family Comfort", "Group Tours"],
        services: [
            {
                label: "Airport Transfers",
                price: "MUR 5,000+",
                type: "transfer" as const,
                modalContent: {
                    title: "Airport Transfers — Minivan",
                    description: "Spacious transfers with room for the entire family and luggage.",
                    items: [
                        { name: "Airport → Hotel", price: "MUR 5,000" },
                        { name: "Hotel → Airport", price: "MUR 5,000" },
                        { name: "Inter-Hotel Transfer", price: "MUR 5,000" },
                    ],
                },
            },
            {
                label: "Pick & Drop",
                price: "MUR 5,000+",
                type: "pickdrop" as const,
                modalContent: {
                    title: "Pick & Drop — Minivan",
                    description: "Comfortable group transport for activities and excursion drop-offs.",
                    items: [
                        { name: "Full Day", detail: "Casela · Boat Trips · Vallée Des Couleurs · Domaine Frederica · Big Foot · Marine Sub Scooter · Catamaran", price: "MUR 8,000" },
                        { name: "Half Day", detail: "Helicopter · Sky Dive", price: "MUR 5,000" },
                    ],
                },
            },
            {
                label: "Trips & Excursions",
                price: "MUR 5,000+",
                type: "excursion" as const,
                modalContent: {
                    title: "Trips & Excursions — Minivan",
                    description: "Group-friendly island tours with ample space and comfort.",
                    items: [
                        { name: "North Tour — Full Day (8hr)", detail: "La Citadelle · Port Louis Market · Caudan Waterfront · Botanical Garden · Beau Plan Sugar Factory · Cap Malheureux", price: "MUR 8,000" },
                        { name: "North Tour — Half Day (4hr)", detail: "Quick highlights of North regional attractions", price: "MUR 5,000" },
                        { name: "South Tour Package 1 (8hr)", detail: "Volcano · Grand Bassin · Bois Chéri Tea Factory · Gorges · Chamarel · Curious Corner · View Point", price: "MUR 8,000" },
                        { name: "South Tour Package 2 (8hr)", detail: "La Vanille Crocodile Park · St Aubin Rhum Factory · Gris-gris · Ile Aux Sancho · Rochester Fall · Maconde", price: "MUR 8,000" },
                        { name: "South Tour — Half Day (5hr)", detail: "Quick highlights of South regional attractions", price: "MUR 8,000" },
                    ],
                },
            },
        ],
    },
];

const typeIcons: Record<string, typeof Plane> = {
    transfer: Plane,
    pickdrop: MapPin,
    excursion: Compass,
};

/* ─── Component ─── */

export function CarRental() {
    const [activeModal, setActiveModal] = useState<{
        vehicleName: string;
        serviceType: string;
        content: ServiceDetail["modalContent"];
    } | null>(null);
    const [selectedItemIndices, setSelectedItemIndices] = useState<number[]>([]);

    const handleReserve = (vehicleType: string, serviceType?: string, selectedOptions?: any[]) => {
        window.dispatchEvent(new CustomEvent('open-booking', {
            detail: { vehicleType, serviceType, selectedOptions }
        }));
    };

    return (
        <>
            <section id="st-transfers" className="relative min-h-screen flex items-center py-24 px-6 md:px-24">
                {/* Layer 1: Background Plate */}
                <div className="absolute inset-0 bg-white -z-20" />

                <div className="relative z-20 max-w-7xl mx-auto w-full">
                    <SectionHeader
                        id="st-child-home-cars-header"
                        title="Transfers & Excursions"
                        subtitle={
                            <>
                                • Book your private airport transfer to and from your Hotel •
                                <br />
                                • Reserve your trips, outings and excursions •
                                <br />
                                • No advance payment / Cash settlement •
                            </>
                        }
                        centered
                    />

                    <div id="st-child-home-cars-grid" className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {cars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-xl">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-full h-full relative"
                                    >
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </div>

                                <div className="space-y-6">
                                    <div className="text-center">
                                        <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-2">{car.category}</p>
                                        <h3 className="text-3xl font-display text-brand-bronze mb-4">{car.name}</h3>

                                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                                            {car.features.map(f => (
                                                <span key={f} className="text-[9px] uppercase font-black text-brand-bronze/60 bg-brand-gold/5 border border-brand-gold/10 px-3 py-1.5 rounded-full tracking-wider">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Pricing Structure — Clickable */}
                                        <div className="bg-brand-gold/5 rounded-[32px] p-6 mb-8 border border-brand-gold/10">
                                            <div className="space-y-3 mb-5">
                                                {car.services.map((svc) => {
                                                    const Icon = typeIcons[svc.type] || ChevronRight;
                                                    return (
                                                        <button
                                                            key={svc.label}
                                                            onClick={() => {
                                                                setActiveModal({
                                                                    vehicleName: car.name,
                                                                    serviceType: svc.label,
                                                                    content: svc.modalContent
                                                                });
                                                                setSelectedItemIndices([]);
                                                            }}
                                                            className="w-full flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-brand-gold/10 transition-all duration-300 group/svc cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2.5">
                                                                <Icon className="w-3.5 h-3.5 text-brand-gold group-hover/svc:scale-110 transition-transform" />
                                                                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest group-hover/svc:text-brand-bronze transition-colors">{svc.label}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] uppercase font-black text-brand-bronze tracking-widest">{svc.price}</span>
                                                                <ChevronRight className="w-3 h-3 text-brand-gold opacity-0 group-hover/svc:opacity-100 transition-opacity" />
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <div className="pt-4 border-t border-brand-gold/10 flex flex-wrap justify-center gap-x-4 gap-y-2">
                                                {car.details.map(d => (
                                                    <div key={d} className="flex items-center gap-1.5">
                                                        <div className="w-1 h-1 rounded-full bg-brand-gold" />
                                                        <span className="text-[8px] font-black uppercase text-brand-bronze/80 tracking-widest">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleReserve(car.name)}
                                            className="w-full py-5 border border-brand-gold/30 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:bg-brand-gold hover:text-white text-brand-bronze shadow-lg shadow-brand-gold/5"
                                        >
                                            Reserve Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Detail Modal ─── */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setActiveModal(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="relative bg-white rounded-[40px] shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Header */}
                            <div className="p-8 pb-6 border-b border-brand-gold/10">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-display text-brand-bronze mb-2">{activeModal.content.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{activeModal.content.description}</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveModal(null)}
                                        className="p-2 rounded-full hover:bg-brand-gold/10 transition-colors -mt-1 -mr-1"
                                    >
                                        <X className="w-5 h-5 text-brand-bronze/60" />
                                    </button>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="p-8 space-y-4 overflow-y-auto max-h-[55vh]">
                                {activeModal.content.items.map((item, i) => {
                                    const isSelected = selectedItemIndices.includes(i);
                                    return (
                                        <motion.button
                                            key={i}
                                            onClick={() => setSelectedItemIndices(prev => prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i])}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className={`w-full text-left rounded-3xl border p-5 transition-all outline-none ${
                                                isSelected 
                                                    ? 'border-brand-gold bg-brand-gold/10' 
                                                    : 'border-brand-gold/10 bg-brand-gold/5 hover:border-brand-gold/30'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-full border flex flex-shrink-0 items-center justify-center ${isSelected ? 'border-brand-gold bg-brand-gold' : 'border-brand-gold/30'}`}>
                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                    </div>
                                                    <span className="text-sm font-bold text-brand-bronze">{item.name}</span>
                                                </div>
                                                {item.price && (
                                                    <span className="text-sm font-black text-brand-gold">{item.price}</span>
                                                )}
                                            </div>
                                            {item.detail && (
                                                <p className="text-xs text-muted-foreground leading-relaxed ml-7">{item.detail}</p>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="p-8 pt-4 border-t border-brand-gold/10">
                                <button
                                    onClick={() => {
                                        if (selectedItemIndices.length > 0) {
                                            const options = selectedItemIndices.map(i => activeModal.content.items[i]);
                                            handleReserve(
                                                activeModal.vehicleName, 
                                                activeModal.serviceType, 
                                                options
                                            );
                                            setActiveModal(null);
                                        }
                                    }}
                                    disabled={selectedItemIndices.length === 0}
                                    className={`w-full py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 shadow-lg ${
                                        selectedItemIndices.length > 0
                                            ? 'bg-brand-gold text-white hover:bg-brand-bronze shadow-brand-gold/20'
                                            : 'bg-brand-gold/20 text-brand-bronze/40 cursor-not-allowed'
                                    }`}
                                >
                                    {selectedItemIndices.length > 0 ? `Request Booking (${selectedItemIndices.length} Selected)` : 'Select Options'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
