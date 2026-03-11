"use client";
import { Plane, Map, ConciergeBell } from "lucide-react";
import { TravelBackground } from "./TravelBackground";

export function WhatWeDo() {
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
        <section id="st-section-home-about" className="relative h-screen flex items-center bg-white overflow-hidden">
            {/* Set background icons to full opacity so they pierce through the glass cards */}
            <TravelBackground opacity={1} className="text-brand-gold" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-20 w-full">
                <div id="st-child-home-about-header" className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display mb-6 text-brand-bronze">
                        What We Do
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                        Sixteen Travel Mauritius is a government licensed tour operator based in Mauritius. It comprises of a panoply of services ranging from Airport Transfers and planned Tours.
                    </p>
                </div>

                <div id="st-child-home-about-cards" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white/80 p-10 rounded-[40px] shadow-xl shadow-brand-gold/5 border border-white/20 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/10 hover:bg-white/90"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-white/60 backdrop-blur-md flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500 shadow-sm">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-display text-brand-bronze mb-4">{service.title}</h3>
                            <p className="text-brand-bronze/80 leading-relaxed text-sm font-medium">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-gold/0 to-brand-gold/20" />
        </section>
    );
}
