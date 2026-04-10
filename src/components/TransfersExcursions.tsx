"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dbService } from '@/lib/db';
import { TransportService, INITIAL_TRANSPORT_SERVICES } from '@/lib/mockData';
import TransportCard from './TransportCard';
import { Plane, Compass, Sparkles } from 'lucide-react';

export function TransfersExcursions() {
  const [services, setServices] = useState<TransportService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = dbService.subscribeToCollection("transport_services", (data) => {
      if (data.length > 0) {
        setServices(data);
      } else {
        // Fallback to mock data if collection is empty
        setServices(INITIAL_TRANSPORT_SERVICES);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return (
    <div className="py-32 flex justify-center items-center bg-[#050608]">
      <div className="w-10 h-10 border-2 border-admin-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section id="st-section-transfers" className="relative py-32 px-6 bg-[#050608] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-admin-accent/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-admin-accent/50" />
            <span className="text-xs font-black text-admin-accent uppercase tracking-[0.4em]">Premium Mobility</span>
            <div className="h-[1px] w-12 bg-admin-accent/50" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
          >
            Transfers & <span className="text-admin-accent italic">Excursions</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Seamless transportation tailored to your lifestyle. From airport receptions to island-wide discoveries, experience Mauritius with absolute comfort.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <TransportCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Plane, title: "Airport VIP", text: "Luxury reception and seamless luggage handling upon your arrival." },
            { icon: Compass, title: "Tailored Tours", text: "Personalized itineraries based on your interests and preferences." },
            { icon: Sparkles, title: "Elite Fleet", text: "Meticulously maintained vehicles for maximum safety and style." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-admin-accent/20 transition-all group"
            >
              <feature.icon className="w-8 h-8 text-admin-accent mb-6 transition-transform group-hover:scale-110" />
              <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
