"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TransportService } from '@/lib/mockData';
import { 
  Plane, 
  MapPin, 
  Compass, 
  Clock, 
  ChevronRight, 
  Users,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface TransportCardProps {
  service: TransportService;
}

type TripType = 'Transfers' | 'Pick & Drop' | 'Trips & Excursions';

export default function TransportCard({ service }: TransportCardProps) {
  const [activeTab, setActiveTab] = useState<TripType>('Transfers');

  const tabs: { id: TripType; icon: any }[] = [
    { id: 'Transfers', icon: Plane },
    { id: 'Pick & Drop', icon: MapPin },
    { id: 'Trips & Excursions', icon: Compass }
  ];

  return (
    <div className="group relative bg-[#0f1115] border border-white/5 rounded-[40px] overflow-hidden hover:border-admin-accent/30 transition-all duration-700 shadow-2xl flex flex-col h-full">
      {/* Visual Header */}
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={service.vehicleImage} 
          alt={service.categoryName}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl">
          <p className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">{service.paxRange || 'Private'}</p>
        </div>

        {/* Floating Category Title */}
        <div className="absolute bottom-6 left-8 right-8">
          <h3 className="text-3xl font-bold text-white tracking-tight">{service.categoryName}</h3>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-bold uppercase tracking-wider">
              <Users className="w-3 h-3 text-admin-accent" />
              <span>Full Insurance</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-admin-accent" />
              <span>AC Vehicle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-2 bg-white/5 mx-6 mt-6 rounded-[24px] border border-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-3.5 flex flex-col items-center gap-1.5 transition-all duration-500 ${
                isActive ? 'text-white' : 'text-white/30 hover:text-white/50'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-admin-accent rounded-2xl shadow-lg shadow-admin-accent/20"
                />
              )}
              <Icon className={`w-4 h-4 relative z-10 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[8px] font-black uppercase tracking-widest relative z-10">{tab.id}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="h-full"
          >
            {activeTab === 'Transfers' && (
              <div className="space-y-4">
                <div className="text-[10px] font-black text-admin-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-admin-accent" />
                  Point-to-Point Pricing
                </div>
                {service.transfers.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group/item hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-default">
                    <span className="text-sm font-bold text-white/80 transition-colors group-hover/item:text-white">{t.type}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-white/40 group-hover/item:text-white/60">From</span>
                      <span className="text-lg font-black text-admin-accent">MUR {t.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                <div className="pt-6">
                  <button className="w-full py-5 bg-white text-black rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-admin-accent hover:text-white transition-all transform active:scale-[0.98] shadow-xl shadow-black/20 flex items-center justify-center gap-3">
                    <Calendar className="w-4 h-4" />
                    Book Transfer
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Pick & Drop' && (
              <div className="space-y-4">
                <div className="text-[10px] font-black text-admin-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-admin-accent" />
                  Full/Half Day Rental
                </div>
                <div className="space-y-3">
                  {service.pickDrop.map((pd, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-5 hover:bg-white/[0.06] hover:border-white/10 transition-all group/item">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-admin-accent" />
                          <span className="text-lg font-bold text-white tracking-tight">{pd.duration} Package</span>
                        </div>
                        <span className="text-xl font-black text-admin-accent tracking-tighter">MUR {pd.price.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pd.destinations.map((dest, di) => (
                          <span key={di} className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-[9px] font-bold text-white/50 group-hover/item:text-white/80 group-hover/item:border-white/10 transition-all">
                            {dest}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Trips & Excursions' && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="text-[10px] font-black text-admin-accent uppercase tracking-widest mb-4 flex items-center gap-2 sticky top-0 bg-[#0f1115] py-1 z-10">
                  <div className="w-1 h-1 rounded-full bg-admin-accent" />
                  Featured Tour Packages
                </div>
                {service.excursions.map((e, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.06] transition-all group/item">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white leading-tight group-hover/item:text-admin-accent transition-colors">{e.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-white/30" />
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{e.time} Duration</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Package Price</p>
                        <span className="text-2xl font-black text-admin-accent tracking-tighter">MUR {e.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4 pb-4 border-b border-white/5">
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Included Attractions</p>
                      <div className="grid grid-cols-2 gap-2">
                        {e.includes.slice(0, 4).map((inc, ii) => (
                          <div key={ii} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-admin-accent/50" />
                            <span className="text-[10px] font-medium text-white/60 truncate">{inc}</span>
                          </div>
                        ))}
                        {e.includes.length > 4 && (
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-admin-accent/50" />
                            <span className="text-[10px] font-bold text-admin-accent">+{e.includes.length - 4} More</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="w-full mt-4 py-3 bg-white/5 hover:bg-admin-accent hover:text-white text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover/item:border-admin-accent/30 border border-white/5">
                      View Details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
      `}</style>
    </div>
  );
}
