"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Ship, Wind, Compass, Map, Globe, Camera } from "lucide-react";
import { useRef } from "react";

export function GoldenTrace() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Advance drawing: line reveals 20% faster than the user scrolls
    const advanceProgress = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 1]);

    const pathLength = useSpring(advanceProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden text-brand-gold">
            {/* The Winding Path SVG with Mask for Dotted + Drawing effect */}
            <svg
                viewBox="0 0 100 1200"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full opacity-60"
            >
                <defs>
                    <mask id="path-mask">
                        <motion.path
                            d="M 50 0 Q 80 150 20 250 T 50 450 Q 90 600 10 750 T 50 900 Q 80 1050 30 1150 T 50 1200"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            style={{ pathLength }}
                        />
                    </mask>
                </defs>
                <path
                    d="M 50 0 Q 80 150 20 250 T 50 450 Q 90 600 10 750 T 50 900 Q 80 1050 30 1150 T 50 1200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    strokeDasharray="4 8"
                    mask="url(#path-mask)"
                />
            </svg>

            {/* Scroll-Linked Icons (Landmarks) */}
            <LandmarkIcon
                Icon={Ship}
                top="8%"
                left="75%"
                threshold={0.08}
                progress={scrollYProgress}
            />
            <LandmarkIcon
                Icon={Compass}
                top="24%"
                left="20%"
                threshold={0.24}
                progress={scrollYProgress}
            />
            <LandmarkIcon
                Icon={Wind}
                top="40%"
                left="85%"
                threshold={0.40}
                progress={scrollYProgress}
            />
            <LandmarkIcon
                Icon={Map}
                top="58%"
                left="12%"
                threshold={0.58}
                progress={scrollYProgress}
            />
            <LandmarkIcon
                Icon={Globe}
                top="75%"
                left="82%"
                threshold={0.75}
                progress={scrollYProgress}
            />
            <LandmarkIcon
                Icon={Camera}
                top="92%"
                left="18%"
                threshold={0.92}
                progress={scrollYProgress}
            />
        </div>
    );
}

function LandmarkIcon({ Icon, top, left, threshold, progress }: { Icon: any, top: string, left: string, threshold: number, progress: any }) {
    // Extreme persistence window [threshold - 0.4, threshold + 0.4] 
    // This ensures icons in upper sections are visible almost immediately.
    const start = Math.max(0, threshold - 0.4);
    const center = Math.max(0, Math.min(1, threshold));
    const end = Math.min(1, threshold + 0.4);

    const input = [start, center, end];
    if (start === center) input[0] = Math.max(0, center - 0.01);
    if (end === center) input[2] = Math.min(1, center + 0.01);

    const opacity = useTransform(progress, input, [0, 0.9, 0]);
    const scale = useTransform(progress, input, [0.8, 1.2, 0.8]);
    const yValue = useTransform(progress, input, [40, 0, -40]);

    return (
        <motion.div
            style={{
                top,
                left,
                opacity,
                scale,
                y: yValue,
                zIndex: 10
            }}
            className="absolute flex flex-col items-center gap-2 pointer-events-none"
        >
            <div className="p-2">
                <Icon size={72} strokeWidth={0.2} className="text-brand-gold" />
            </div>
        </motion.div>
    );
}
