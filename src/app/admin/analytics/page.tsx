"use client";
import React from "react";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Users, 
  Globe, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Database
} from "lucide-react";
import { seedDatabase } from "@/lib/seed";
import { useState } from "react";

export default function AnalyticsPage() {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    if (confirm("Initialize system with default mock data? This will create real entries in your Firestore database.")) {
      setIsSeeding(true);
      const success = await seedDatabase();
      setIsSeeding(false);
      if (success) {
        alert("System synchronized successfully with Firestore!");
      } else {
        alert("Synchronization failed. Check browser console for details.");
      }
    }
  };

  return (
    <div className="space-y-10 pb-10 transition-colors duration-300">
      {/* Synchronization Banner */}
      <div className="bg-admin-sidebar rounded-[40px] p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-admin-accent/20 flex items-center justify-center text-admin-accent animate-pulse">
            <Database className="w-8 h-8" />
          </div>
          <div>
             <h3 className="text-xl font-black text-white uppercase tracking-tight">System Engine <span className="text-admin-accent">Offline</span></h3>
             <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Synchronize local workspace with Firebase Cloud infrastructure</p>
          </div>
        </div>
        <button 
          onClick={handleSeed}
          disabled={isSeeding}
          className="px-10 py-4 bg-admin-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-admin-accent/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSeeding ? "Syncing Logic..." : "Initialize Cloud Sync"}
        </button>
      </div>

      <div className="bg-admin-card p-12 rounded-[56px] shadow-sm border border-admin-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-admin-accent/5 rounded-full -mr-[250px] -mt-[250px] blur-3xl opacity-50" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-admin-accent/20 flex items-center justify-center text-admin-accent">
                    <Activity className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-admin-accent">Strategic Oversight</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-admin-text-main mb-8 leading-tight uppercase tracking-tight">
              Business Intelligence <br /> <span className="text-admin-accent">Growth Systems</span>
            </h2>
            <p className="text-admin-text-muted text-sm max-w-md leading-relaxed mb-12 font-medium uppercase tracking-wide">
              Operational metrics and fiscal trajectory for Sixteen Travel's strategic expansion. Monitor yield efficiency and client lifecycle in high-fidelity.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2 p-6 bg-admin-bg/50 rounded-3xl border border-admin-border">
                  <span className="text-[9px] font-black text-admin-accent uppercase tracking-widest">Yield Delta</span>
                  <div className="flex items-end gap-2 text-3xl font-black text-admin-text-main">
                    +24% <ArrowUpRight className="w-6 h-6 text-emerald-500 mb-1" />
                  </div>
               </div>
               <div className="space-y-2 p-6 bg-admin-bg/50 rounded-3xl border border-admin-border">
                  <span className="text-[9px] font-black text-admin-accent uppercase tracking-widest">Global Exposure</span>
                  <div className="flex items-end gap-2 text-3xl font-black text-admin-text-main">
                    12.5% <Globe className="w-6 h-6 text-blue-500 mb-1" />
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             {[
               { icon: BarChart3, label: "Revenue Matrix", desc: "Fiscal Streams" },
               { icon: PieChart, label: "Market Segment", desc: "Client Density" },
               { icon: Users, label: "Retention Log", desc: "Lifecycle Data" },
               { icon: TrendingUp, label: "Sales Velocity", desc: "Burn Rate" },
             ].map((card, i) => (
               <div key={i} className="bg-admin-bg/40 p-10 rounded-[40px] border border-admin-border flex flex-col items-center text-center group hover:bg-admin-sidebar hover:border-admin-accent/50 transition-all duration-500 cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-admin-card shadow-lg flex items-center justify-center text-admin-accent mb-6 group-hover:bg-admin-accent group-hover:text-white transition-all border border-admin-border group-hover:border-transparent">
                    <card.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-admin-text-main mb-1">{card.label}</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-admin-text-muted group-hover:text-white/40 transition-colors">{card.desc}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 h-[450px] bg-admin-sidebar rounded-[56px] border border-white/5 flex flex-col items-center justify-center p-12 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-admin-accent/10 to-transparent opacity-50" />
             <div className="relative text-center">
                 <Zap className="w-12 h-12 text-admin-accent mb-6 mx-auto animate-pulse" />
                 <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Core Performance Mesh</h4>
                 <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Hardware acceleration: Ready // Stream: Active</p>
             </div>
             <div className="absolute bottom-12 flex gap-4">
                 {[1,2,3,4,5,6].map(i => (
                     <div key={i} style={{ height: `${20 + Math.random()*60}px` }} className="w-1.5 bg-admin-accent/20 rounded-full group-hover:bg-admin-accent transition-all duration-700" />
                 ))}
             </div>
          </div>

          <div className="bg-admin-card rounded-[56px] border border-admin-border p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-admin-text-main">Audit Logs</span>
              </div>
              <div className="space-y-6 flex-1">
                  {[
                      { event: "Schema Update", user: "Admin01", time: "2m ago" },
                      { event: "Fiscal Commit", user: "System", time: "14m ago" },
                      { event: "Vector Sync", user: "DB-Engine", time: "31m ago" },
                  ].map((log, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-admin-border pb-4 last:border-0">
                          <div>
                              <p className="text-[10px] font-black text-admin-text-main uppercase">{log.event}</p>
                              <p className="text-[9px] font-bold text-admin-accent uppercase">{log.user}</p>
                          </div>
                          <span className="text-[8px] font-black text-admin-text-muted italic">{log.time}</span>
                      </div>
                  ))}
              </div>
              <button className="mt-8 w-full py-4 bg-admin-bg border border-admin-border rounded-2xl text-[10px] font-black text-admin-text-muted hover:text-admin-accent hover:border-admin-accent transition-all uppercase tracking-widest">
                  Download Full Manifest
              </button>
          </div>
      </div>
    </div>
  );
}
