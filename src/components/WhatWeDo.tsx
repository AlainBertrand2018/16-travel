"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, Map, ConciergeBell } from "lucide-react";
import { useRef } from "react";

export function WhatWeDo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Content should be fully active and visible until Section 3 starts covering it
    // Section 3 enters when scrollYProgress is 0.5 (since they are in a 200vh container)
    // No, scrollYProgress is relative to THIS section.
    // If it's h-screen, scrollYProgress is 1 when its bottom hits top.
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
    const yTransform = useTransform(scrollYProgress, [0.8, 1], [0, -50]);

    const services = [
        {
            icon: <Plane className="w-8 h-8" />,
            title: "Airport Transfers",
            description: "Reliable and comfortable transportation from SSR International Airport to any location.",
            id: "airport-transfers"
        },
        {
            icon: <Map className="w-8 h-8" />,
            title: "Planned Tours",
            description: "Curated experiences showing you the hidden gems of our beautiful paradise island.",
            id: "planned-tours"
        },
        {
            icon: <ConciergeBell className="w-8 h-8" />,
            title: "Concierge Service",
            description: "Dedicated support to ensure every aspect of your holiday is managed to perfection.",
            id: "concierge-service"
        }
    ];

    return (
        <section ref={containerRef} id="st-section-home-about" className="relative h-[120vh] z-20">
            <div className="sticky top-0 h-screen overflow-hidden bg-white/95 backdrop-blur-sm">
                <motion.div
                    style={{ opacity, scale, y: yTransform }}
                    className="h-full max-w-7xl mx-auto px-6 md:px-24 flex flex-col justify-center relative z-20"
                >
                    <div id="st-child-home-about-header" className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-display mb-6 text-brand-bronze"
                        >
                            What We Do
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed"
                        >
                            Sixteen Travel Mauritius is a government licensed tour operator based in Mauritius. It comprises of a panoply of services ranging from Airport Transfers and planned Tours.
                        </motion.p>
                    </div>

                    <div id="st-child-home-about-cards" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white p-10 rounded-[40px] shadow-2xl shadow-brand-gold/5 border border-brand-gold/5 flex flex-col items-center text-center group transition-all duration-500"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-pastel-gold flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-display text-brand-bronze mb-4">{service.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Subtle decorative element to make it feel premium */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-gold/0 to-brand-gold/20" />
            </div>
        </section>
    );
}
