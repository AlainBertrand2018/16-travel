"use client";
import { motion } from "framer-motion";
import { Plane, Sun, Compass, Palmtree, Luggage, Camera, Anchor, MapPin, Coffee, Wine, Sailboat, Umbrella, Waves, Ship, Map, Shirt, Glasses, Heart, Star, Trees as TreePalm, Car } from "lucide-react";

interface TravelBackgroundProps {
    opacity?: number;
    color?: string;
    className?: string;
}

export function TravelBackground({ 
    opacity = 0.4, 
    color = "#8E7031", // Using a darker gold for better visibility at low opacity
    className = "" 
}: TravelBackgroundProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`} style={{ opacity }}>
            {/* Elegant Background Grid / Lines - ALWAYS ANIMATED */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1500 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M-100,200 C300,100 500,400 800,200 S1200,300 1600,100"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    strokeDasharray="10 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, pathOffset: [0, 1] }}
                    transition={{ 
                        pathLength: { duration: 5, ease: "easeInOut" },
                        pathOffset: { duration: 40, ease: "linear", repeat: Infinity }
                    }}
                />
                <motion.path
                    d="M-100,800 C400,900 700,600 1000,800 S1300,700 1600,900"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.8"
                    strokeDasharray="6 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, pathOffset: [0, -1] }}
                    transition={{ 
                        pathLength: { duration: 6, ease: "easeInOut", delay: 1 },
                        pathOffset: { duration: 50, ease: "linear", repeat: Infinity }
                    }}
                />
            </svg>

            {/* ULTRA HIGH DENSITY ICONS - MASSIVE, DIVERSE, MULTI-DIRECTIONAL */}
            
            {/* SUNS - Radiant Tropics */}
            <FloatingIcon icon={<Sun strokeWidth={0.6} />} initial={{ top: "5%", right: "5%" }} animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} size="w-40 h-40" />
            <FloatingIcon icon={<Sun strokeWidth={0.6} />} initial={{ top: "20%", left: "10%" }} animate={{ rotate: -360, scale: [0.8, 1, 0.8] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} size="w-24 h-24" />
            <FloatingIcon icon={<Sun strokeWidth={0.6} />} initial={{ bottom: "10%", right: "20%" }} animate={{ rotate: 360, opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} size="w-32 h-32" />

            {/* PALM TREES - Scattered Paradise */}
            <FloatingIcon icon={<TreePalm strokeWidth={0.5} />} initial={{ bottom: "-5%", left: "-5%" }} animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 15, repeat: Infinity }} size="w-96 h-96 opacity-40" />
            <FloatingIcon icon={<TreePalm strokeWidth={0.5} />} flipped initial={{ bottom: "8%", right: "-8%" }} animate={{ rotate: [5, -5, 5] }} transition={{ duration: 18, repeat: Infinity }} size="w-80 h-80 opacity-30" />
            <FloatingIcon icon={<Palmtree strokeWidth={0.6} />} initial={{ top: "15%", left: "50%" }} animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 12, repeat: Infinity }} size="w-20 h-20" />
            <FloatingIcon icon={<Palmtree strokeWidth={0.6} />} flipped initial={{ bottom: "30%", left: "5%" }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} size="w-24 h-24" />
            <FloatingIcon icon={<Palmtree strokeWidth={0.6} />} initial={{ top: "45%", right: "15%" }} animate={{ skewX: [0, 5, -5, 0] }} transition={{ duration: 14, repeat: Infinity }} size="w-16 h-16" />

            {/* BOATS - Nautical Activity */}
            <FloatingIcon icon={<Sailboat strokeWidth={0.6} />} flipped initial={{ bottom: "15%", right: "-15%" }} animate={{ x: "-130vw", y: [0, 30, 0] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} size="w-24 h-24" />
            <FloatingIcon icon={<Sailboat strokeWidth={0.6} />} initial={{ bottom: "5%", left: "-15%" }} animate={{ x: "130vw", y: [0, -20, 0] }} transition={{ duration: 40, repeat: Infinity, ease: "linear", delay: 5 }} size="w-20 h-20" />
            <FloatingIcon icon={<Ship strokeWidth={0.6} />} flipped initial={{ bottom: "28%", right: "-20%" }} animate={{ x: "-140vw", rotate: [0, 2, -2, 0] }} transition={{ duration: 50, repeat: Infinity, ease: "linear", delay: 8 }} size="w-32 h-32" />
            <FloatingIcon icon={<Ship strokeWidth={0.6} />} initial={{ bottom: "40%", left: "-20%" }} animate={{ x: "140vw", scale: [1, 1.1, 1] }} transition={{ duration: 55, repeat: Infinity, ease: "linear", delay: 12 }} size="w-28 h-28" />
            <FloatingIcon icon={<Sailboat strokeWidth={0.6} />} flipped initial={{ top: "50%", right: "-15%" }} animate={{ x: "-130vw", y: [0, 40, -40, 0] }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} size="w-18 h-18" />

            {/* CARS - Rental/Transfer */}
            <FloatingIcon icon={<Car strokeWidth={0.6} />} flipped initial={{ top: "30%", right: "-15%" }} animate={{ x: "-130vw", y: [0, 20, -20, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} size="w-16 h-16" />
            <FloatingIcon icon={<Car strokeWidth={0.6} />} initial={{ bottom: "20%", left: "-15%" }} animate={{ x: "130vw", y: [0, -30, 30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 10 }} size="w-14 h-14" />
            <FloatingIcon icon={<Car strokeWidth={0.6} />} initial={{ top: "60%", right: "15%" }} animate={{ y: [0, -40, 40, 0], x: [0, 100, -100, 0] }} transition={{ duration: 15, repeat: Infinity }} size="w-12 h-12" />

            {/* PLANES - Airspace */}
            <FloatingIcon icon={<Plane strokeWidth={0.6} />} initial={{ top: "12%", left: "-15%" }} animate={{ x: "130vw", y: [0, 80, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} size="w-20 h-20" />
            <FloatingIcon icon={<Plane strokeWidth={0.6} />} initial={{ top: "38%", left: "-15%" }} animate={{ x: "130vw", y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }} size="w-14 h-14" />
            <FloatingIcon icon={<Plane strokeWidth={0.6} />} flipped initial={{ top: "68%", right: "-15%" }} animate={{ x: "-130vw", y: [0, 100, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 12 }} size="w-16 h-16" />

            {/* ACCESSORIES - Detail */}
            <FloatingIcon icon={<Anchor strokeWidth={1} />} flipped initial={{ top: "22%", right: "12%" }} animate={{ y: [0, 60, 0], rotate: 360 }} transition={{ duration: 20, repeat: Infinity }} size="w-12 h-12" />
            <FloatingIcon icon={<Luggage strokeWidth={0.6} />} initial={{ top: "-15%", left: "30%" }} animate={{ y: "115vh", x: [0, 200, -200, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} size="w-16 h-16" />
            <FloatingIcon icon={<MapPin strokeWidth={1.5} />} initial={{ top: "-10%", left: "70%" }} animate={{ y: "110vh", scale: [1, 1.4, 1] }} transition={{ duration: 26, repeat: Infinity, ease: "linear", delay: 4 }} size="w-14 h-14" />
            <FloatingIcon icon={<Camera strokeWidth={0.6} />} initial={{ bottom: "-15%", right: "40%" }} animate={{ y: "-115vh", rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} size="w-14 h-14" />
            <FloatingIcon icon={<Wine strokeWidth={0.6} />} initial={{ top: "60%", right: "20%" }} animate={{ rotate: [0, 20, -20, 0], y: [0, -30, 0] }} transition={{ duration: 9, repeat: Infinity }} size="w-14 h-14" />
            <FloatingIcon icon={<Coffee strokeWidth={0.6} />} initial={{ bottom: "45%", left: "8%" }} animate={{ rotate: [-15, 15, -15], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} size="w-12 h-12" />
            <FloatingIcon icon={<Star strokeWidth={0.8} />} initial={{ top: "25%", left: "20%" }} animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 3.5, repeat: Infinity }} size="w-12 h-12" />
            <FloatingIcon icon={<Waves strokeWidth={0.6} />} initial={{ bottom: "5%", left: "50%" }} animate={{ x: [-60, 60, -60] }} transition={{ duration: 25, repeat: Infinity }} size="w-64 h-12" />
        </div>
    );
}


function FloatingIcon({ 
    icon, 
    initial, 
    animate, 
    transition,
    flipped = false,
    size = "w-10 h-10"
}: { 
    icon: React.ReactNode, 
    initial: any, 
    animate: any, 
    transition: any,
    flipped?: boolean,
    size?: string
}) {
    return (
        <motion.div
            className={`absolute flex items-center justify-center select-none ${size}`}
            style={{ color: "inherit" }}
            initial={initial}
            animate={animate}
            transition={transition}
        >
            <div className={`w-full h-full transform scale-[2.5] ${flipped ? "-scale-x-[2.5]" : ""}`}>
                {icon}
            </div>
        </motion.div>
    );
}
