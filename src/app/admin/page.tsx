"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Booking } from "@/lib/mockData";
import { dbService } from "@/lib/db";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    return dbService.subscribeToCollection("bookings", setBookings);
  }, []);

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const activeBookings = bookings.filter(b => b.status === 'ongoing' || b.status === 'pending').length;
    
    return [
      { 
        label: "Total Revenue", 
        value: `€${totalRevenue.toLocaleString()}`, 
        change: "+12.5%", 
        trend: "up", 
        icon: CreditCard,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
      },
      { 
        label: "Active Bookings", 
        value: activeBookings.toString(), 
        change: "+3 since yesterday", 
        trend: "up", 
        icon: Clock,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
      }
    ];
  }, [bookings]);

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-admin-card p-6 rounded-3xl border border-admin-border flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg ${
                stat.trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
              }`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-admin-text-muted uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-admin-text-main">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Tables Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-admin-card rounded-[32px] border border-admin-border overflow-hidden shadow-sm">
          <div className="p-8 border-b border-admin-border flex justify-between items-center bg-admin-card/50">
            <h3 className="text-xl font-bold text-admin-text-main">Recent Activity</h3>
            <button className="text-[10px] font-black text-admin-accent uppercase tracking-widest hover:bg-admin-accent/10 px-4 py-2 rounded-lg transition-all">
              View Database
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-admin-bg/50">
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-admin-text-muted">Customer</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-admin-text-muted">Product</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-admin-text-muted">Status</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-admin-text-muted">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-admin-bg/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-admin-text-main text-sm">{booking.customerName}</span>
                        <span className="text-[10px] font-semibold text-admin-text-muted">{booking.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-admin-text-main text-sm">
                          {booking.items?.[0]?.productName || "No selection"}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-admin-text-muted">
                           {booking.items?.[0]?.productType || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        booking.status === "ongoing" ? "bg-blue-500/10 text-blue-500" :
                        booking.status === "completed" ? "bg-emerald-500/10 text-emerald-500" :
                        "bg-amber-500/10 text-amber-500"
                      }`}>
                        {booking.status === "ongoing" && <Clock className="w-2.5 h-2.5" />}
                        {booking.status === "completed" && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {booking.status === "pending" && <AlertCircle className="w-2.5 h-2.5" />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-md ${
                        booking.paymentStatus === "paid" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" :
                        booking.paymentStatus === "partial" ? "text-amber-500 border-amber-500/20 bg-amber-500/5" : 
                        "text-rose-500 border-rose-500/20 bg-rose-500/5"
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Business Health Summary */}
        <div className="space-y-8">
          <div className="bg-admin-sidebar text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-admin-accent/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-admin-accent/30 transition-all" />
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8">Performance Indices</h3>
                <div className="space-y-8">
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                         <span>Conversion</span>
                         <span className="text-admin-accent text-xs">3.8%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-admin-accent w-[38%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                         <span>Retention</span>
                         <span className="text-admin-accent text-xs">82%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-admin-accent w-[82%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                         <span>Engagement</span>
                         <span className="text-admin-accent text-xs">65%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-admin-accent w-[65%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                      </div>
                   </div>
                </div>
                <button className="w-full mt-10 py-4 bg-admin-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-admin-accent/20">
                   Generate Analytics Report
                </button>
             </div>
          </div>

          <div className="bg-admin-card p-8 rounded-[32px] shadow-sm border border-admin-border">
             <h3 className="text-lg font-bold text-admin-text-main mb-2">Revenue Velocity</h3>
             <p className="text-xs text-admin-text-muted mb-8 italic">Comparing current cycle with 30-day moving average.</p>
             <div className="flex items-end gap-3 h-32">
                {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-admin-primary/10 rounded-t-lg relative group cursor-pointer"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute inset-0 bg-admin-primary/40 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
             </div>
             <div className="mt-4 flex justify-between text-[9px] font-black text-admin-text-muted uppercase tracking-tighter opacity-60">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
