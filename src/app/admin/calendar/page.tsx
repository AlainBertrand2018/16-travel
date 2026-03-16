"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Search,
  Users,
  X,
  Phone,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Booking, BookingItem } from "@/lib/mockData";
import { dbService } from "@/lib/db";

type ViewMode = "1-day" | "1-week" | "1-month" | "6-month";

interface ExtendedActivity extends BookingItem {
  customerName: string;
  bookingId: string;
  status: string;
  phone: string;
}

export default function ActivityCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>("1-month");
  const [currentDate, setCurrentDate] = useState(new Date("2026-03-20")); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    return dbService.subscribeToCollection("bookings", setBookings);
  }, []);

  const allActivities = useMemo(() => {
    const activities: ExtendedActivity[] = [];
    bookings.forEach(booking => {
      booking.items.forEach(item => {
        activities.push({
          ...item,
          customerName: booking.customerName,
          bookingId: booking.id,
          status: booking.status,
          phone: booking.phone
        });
      });
    });
    return activities;
  }, [bookings]);

  const changeDate = (offset: number) => {
    const newDate = new Date(currentDate);
    if (viewMode === "1-day") newDate.setDate(newDate.getDate() + offset);
    else if (viewMode === "1-week") newDate.setDate(newDate.getDate() + (offset * 7));
    else if (viewMode === "1-month") newDate.setMonth(newDate.getMonth() + offset);
    else if (viewMode === "6-month") newDate.setMonth(newDate.getMonth() + (offset * 6));
    setCurrentDate(newDate);
  };

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
    return new Date(d.setDate(diff));
  };

  const filteredActivities = allActivities.filter(a => 
    a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activitiesForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return filteredActivities.filter(a => {
      const d = new Date(a.date);
      return d.toDateString() === selectedDate.toDateString();
    }).sort((a, b) => a.time.localeCompare(b.time));
  }, [selectedDate, filteredActivities]);

  return (
    <div className="space-y-8 pb-20 transition-colors duration-300">
      {/* Calendar Header Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-admin-card p-6 rounded-[32px] border border-admin-border shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex bg-admin-bg p-1.5 rounded-xl gap-1">
            {(["1-day", "1-week", "1-month", "6-month"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === mode 
                    ? "bg-admin-accent text-white shadow-md shadow-admin-accent/20" 
                    : "text-admin-text-muted hover:text-admin-text-main"
                }`}
              >
                {mode.replace("-", " ")}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2.5 bg-admin-bg border border-admin-border text-admin-text-main rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-admin-card transition-all"
            >
              Today
            </button>
            <div className="flex items-center bg-admin-bg rounded-xl border border-admin-border p-1">
                <button onClick={() => changeDate(-1)} className="p-2 text-admin-text-muted hover:text-admin-accent transition-all">
                <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-admin-border mx-2" />
                <button onClick={() => changeDate(1)} className="p-2 text-admin-text-muted hover:text-admin-accent transition-all">
                <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <h3 className="text-lg font-bold text-admin-text-main min-w-[180px] text-center">
              {viewMode === "1-day" && currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
              {viewMode === "1-week" && `Week of ${getStartOfWeek(currentDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`}
              {viewMode === "1-month" && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              {viewMode === "6-month" && `H1 ${currentDate.getFullYear()}`}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full xl:w-auto">
           <div className="relative flex-1 xl:flex-none xl:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-admin-text-muted" />
              <input 
                type="text" 
                placeholder="Find activity..."
                className="w-full pl-11 pr-4 py-3 bg-admin-bg rounded-xl text-xs border border-admin-border outline-none focus:ring-2 focus:ring-admin-accent/20 transition-all placeholder:text-admin-text-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <button className="p-3 bg-admin-sidebar text-white rounded-xl shadow-lg shadow-admin-sidebar/20 hover:brightness-110 active:scale-95 transition-all">
              <Users className="w-4 h-4 text-admin-accent" />
           </button>
        </div>
      </div>

      {/* Calendar Renderings */}
      <div className="bg-admin-card rounded-[32px] shadow-sm border border-admin-border overflow-hidden min-h-[600px] transition-colors duration-300">
        <AnimatePresence mode="wait">
          {viewMode === "1-month" && (
            <motion.div
              key="month-view"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              className="p-1 border border-admin-border bg-admin-bg m-6 rounded-3xl"
            >
              <div className="grid grid-cols-7 gap-px">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <div key={day} className="p-4 text-center text-[10px] font-black uppercase text-admin-text-muted tracking-[0.2em]">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: 42 }).map((_, i) => {
                  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - startOffset + 1);
                  const isToday = new Date().toDateString() === date.toDateString();
                  const isDimmed = date.getMonth() !== currentDate.getMonth();
                  
                  const dayActivities = filteredActivities.filter(a => {
                    const activityDate = new Date(a.date);
                    return activityDate.getFullYear() === date.getFullYear() && 
                           activityDate.getMonth() === date.getMonth() && 
                           activityDate.getDate() === date.getDate();
                  });

                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedDate(date)}
                      className={`min-h-[120px] bg-admin-card p-4 relative group hover:z-10 hover:shadow-2xl hover:shadow-admin-accent/5 transition-all cursor-pointer ${isDimmed ? 'opacity-20' : ''}`}
                    >
                      <span className={`text-xs font-black ${isToday ? 'bg-admin-accent text-white w-7 h-7 flex items-center justify-center rounded-lg shadow-lg' : 'text-admin-text-muted/50'}`}>
                        {date.getDate()}
                      </span>
                      
                      <div className="mt-4 space-y-1.5">
                        {dayActivities.slice(0, 3).map((act) => (
                          <div key={act.id} className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-tighter truncate border ${
                            act.productType === 'Transfer' ? 'bg-blue-500/10 text-blue-500 border-blue-500/10' :
                            act.productType === 'Outing Package' ? 'bg-amber-500/10 text-amber-500 border-amber-500/10' :
                            act.productType === 'Activity' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/10' :
                            'bg-emerald-500/10 text-emerald-500 border-emerald-500/10'
                          }`}>
                            {act.productName}
                          </div>
                        ))}
                        {dayActivities.length > 3 && (
                          <div className="text-[8px] font-black text-admin-accent pl-1">
                            · {dayActivities.length - 3} more
                          </div>
                        )}
                        {dayActivities.length > 0 && (
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <ExternalLink className="w-3 h-3 text-admin-accent" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {viewMode === "1-day" && (
            <motion.div
              key="day-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-10 flex flex-col lg:flex-row gap-10"
            >
              <div className="flex-1 space-y-8">
                <div className="flex items-center justify-between border-b border-admin-border pb-6">
                   <h4 className="text-xl font-bold text-admin-text-main">Deployment Timeline</h4>
                   <div className="flex items-center gap-2 text-xs font-black uppercase text-admin-accent bg-admin-accent/5 px-4 py-2 rounded-xl">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                   </div>
                </div>

                <div className="space-y-4 relative">
                  <div className="absolute left-6 top-4 bottom-4 w-px bg-admin-border" />
                  
                  {filteredActivities
                    .filter(a => new Date(a.date).toDateString() === currentDate.toDateString())
                    .sort((a,b) => a.time.localeCompare(b.time))
                    .map((act) => (
                      <div key={act.id} className="relative pl-14 group">
                        <div className="absolute left-[21px] top-[40px] w-2.5 h-2.5 bg-admin-card border-2 border-admin-accent rounded-full z-10 group-hover:scale-150 transition-all shadow-md shadow-admin-accent/20" />
                        
                        <div className="bg-admin-bg/50 p-6 rounded-2xl border border-admin-border flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-admin-card hover:shadow-lg transition-all border-l-4 border-l-admin-accent">
                           <div className="flex items-center gap-6">
                              <div className="min-w-[60px] text-center">
                                 <p className="text-lg font-black text-admin-text-main font-mono">{act.time}</p>
                                 <Clock className="w-3.5 h-3.5 text-admin-text-muted/30 mx-auto" />
                              </div>
                              <div className="h-10 w-px bg-admin-border" />
                              <div className="space-y-1">
                                 <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest ${
                                      act.productType === 'Transfer' ? 'bg-blue-500/10 text-blue-500' :
                                      act.productType === 'Outing Package' ? 'bg-amber-500/10 text-amber-500' :
                                      act.productType === 'Activity' ? 'bg-indigo-500/10 text-indigo-500' :
                                      'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                      {act.productType}
                                    </span>
                                    <span className="text-[9px] font-bold text-admin-text-muted font-mono tracking-tighter">ID: {act.bookingId}</span>
                                 </div>
                                 <h5 className="text-base font-bold text-admin-text-main">{act.productName}</h5>
                                 <div className="flex items-center gap-4 pt-1">
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-admin-text-muted"><User className="w-3 h-3 text-admin-accent" /> {act.customerName}</span>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-admin-text-muted"><Phone className="w-3 h-3 text-admin-accent" /> {act.phone}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="flex gap-2">
                              <button className="px-5 py-2.5 bg-admin-card text-admin-accent rounded-xl text-[9px] font-black uppercase tracking-widest border border-admin-border hover:bg-admin-accent hover:text-white transition-all">Details</button>
                              <button className="px-5 py-2.5 bg-admin-accent text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md shadow-admin-accent/20">Action</button>
                           </div>
                        </div>
                      </div>
                    ))
                  }
                  {filteredActivities.filter(a => new Date(a.date).toDateString() === currentDate.toDateString()).length === 0 && (
                    <div className="text-center py-20 bg-admin-bg/30 rounded-3xl border border-dashed border-admin-border">
                       <p className="text-admin-text-muted font-black uppercase tracking-widest text-[10px]">Vacant Operations Log</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:w-80 space-y-6 bg-admin-bg/50 p-8 rounded-3xl border border-admin-border">
                 <h4 className="text-xs font-black uppercase tracking-widest text-admin-text-main border-b border-admin-border pb-4">Daily Recap</h4>
                 <div className="space-y-4">
                    <div className="bg-admin-card p-5 rounded-2xl border border-admin-border flex justify-between items-center">
                       <span className="text-[9px] font-black text-admin-text-muted uppercase">Transfers</span>
                       <span className="text-xl font-black text-admin-text-main">
                          {filteredActivities.filter(a => new Date(a.date).toDateString() === currentDate.toDateString() && a.productType === 'Transfer').length}
                       </span>
                    </div>
                    <div className="bg-admin-card p-5 rounded-2xl border border-admin-border flex justify-between items-center">
                       <span className="text-[9px] font-black text-admin-text-muted uppercase">Outings</span>
                       <span className="text-xl font-black text-admin-text-main">
                          {filteredActivities.filter(a => new Date(a.date).toDateString() === currentDate.toDateString() && a.productType === 'Outing Package').length}
                       </span>
                    </div>
                    <div className="bg-admin-card p-5 rounded-2xl border border-admin-border flex justify-between items-center">
                       <span className="text-[9px] font-black text-admin-text-muted uppercase">Activities</span>
                       <span className="text-xl font-black text-admin-text-main">
                          {filteredActivities.filter(a => new Date(a.date).toDateString() === currentDate.toDateString() && a.productType === 'Activity').length}
                       </span>
                    </div>
                 </div>
                 
                 <div className="pt-4">
                    <p className="text-[9px] font-black uppercase text-admin-accent tracking-widest mb-4">Operational Pulse</p>
                    <div className="space-y-2">
                       <div className="p-3.5 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          <p className="text-[9px] font-bold text-rose-500 uppercase">Resource Alert</p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {viewMode === "1-week" && (
             <motion.div
               key="week-view"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="p-8"
             >
                <div className="grid grid-cols-7 gap-4">
                   {Array.from({ length: 7 }).map((_, i) => {
                      const day = new Date(getStartOfWeek(currentDate));
                      day.setDate(day.getDate() + i);
                      const isToday = day.toDateString() === new Date().toDateString();
                      
                      const dayActivities = filteredActivities.filter(a => new Date(a.date).toDateString() === day.toDateString());

                      return (
                         <div key={i} className="flex flex-col gap-4">
                            <div 
                              onClick={() => setSelectedDate(day)}
                              className={`text-center p-3 rounded-xl border cursor-pointer transition-all hover:brightness-110 shadow-sm ${isToday ? 'bg-admin-accent text-white border-admin-accent' : 'bg-admin-bg border-admin-border text-admin-text-muted hover:bg-admin-card'}`}
                            >
                               <p className="text-[8px] font-black uppercase tracking-widest mb-0.5">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                               <p className="text-lg font-bold">{day.getDate()}</p>
                            </div>
                            <div className="space-y-2.5">
                               {dayActivities.map(act => (
                                  <div key={act.id} className="p-3 bg-admin-card rounded-xl border border-admin-border shadow-sm hover:border-admin-accent/30 transition-all group cursor-pointer" onClick={() => setSelectedDate(day)}>
                                     <p className="text-[9px] font-black text-admin-accent mb-1 font-mono">{act.time}</p>
                                     <p className="text-[10px] font-bold text-admin-text-main tracking-tight leading-tight mb-3 line-clamp-2">{act.productName}</p>
                                     <div className="flex flex-col gap-1.5">
                                        <span className="flex items-center gap-1.5 text-[8px] font-black text-admin-text-muted uppercase tracking-tighter"><User className="w-2.5 h-2.5 text-admin-accent" /> {act.customerName.split(' ')[0]}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[6px] font-black uppercase tracking-widest w-fit border ${
                                          act.productType === 'Transfer' ? 'bg-blue-500/5 text-blue-500 border-blue-500/10' :
                                          act.productType === 'Outing Package' ? 'bg-amber-500/5 text-amber-500 border-amber-500/10' :
                                          act.productType === 'Activity' ? 'bg-indigo-500/5 text-indigo-500 border-indigo-500/10' :
                                          'bg-emerald-500/5 text-emerald-500 border-emerald-500/10'
                                        }`}>
                                          {act.productType}
                                        </span>
                                     </div>
                                  </div>
                               ))}
                               {dayActivities.length === 0 && <div className="h-16 bg-admin-bg/30 rounded-xl border border-dashed border-admin-border/50" />}
                            </div>
                         </div>
                      );
                   })}
                </div>
             </motion.div>
          )}

          {viewMode === "6-month" && (
             <motion.div
               key="year-view"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.02 }}
               className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {Array.from({ length: 6 }).map((_, monthIdx) => {
                   const m = new Date(currentDate);
                   m.setMonth(m.getMonth() + monthIdx);
                   
                   const monthActs = filteredActivities.filter(a => {
                      const d = new Date(a.date);
                      return d.getMonth() === m.getMonth() && d.getFullYear() === m.getFullYear();
                   });

                   return (
                      <div key={monthIdx} className="bg-admin-bg/50 p-8 rounded-3xl border border-admin-border flex flex-col justify-between group hover:bg-admin-card hover:shadow-xl transition-all h-[280px]">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-muted/40 mb-1">{m.getFullYear()}</p>
                            <h4 className="text-xl font-bold text-admin-text-main">{m.toLocaleDateString('en-US', { month: 'long' })}</h4>
                         </div>
                         
                         <div className="space-y-4">
                            <div className="flex justify-between items-end">
                               <span className="text-[9px] font-black text-admin-text-muted uppercase tracking-widest">Inventory Load</span>
                               <span className="text-lg font-black text-admin-text-main">{Math.min(100, monthActs.length * 10)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-admin-border rounded-full overflow-hidden">
                               <div className="h-full bg-admin-accent rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, monthActs.length * 10)}%` }} />
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black">
                               <span className="text-admin-accent uppercase tracking-widest">{monthActs.length} OPS ITEMS</span>
                               <button 
                                onClick={() => {
                                  setCurrentDate(new Date(m));
                                  setViewMode("1-month");
                                }}
                                className="text-admin-text-main border-b border-admin-text-main hover:text-admin-accent hover:border-admin-accent transition-all"
                               >
                                View Details
                               </button>
                            </div>
                         </div>
                      </div>
                   );
                })}
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Date Summary Modal */}
      <AnimatePresence>
        {selectedDate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedDate(null)}
               className="absolute inset-0 bg-admin-sidebar/60 backdrop-blur-md"
             />
             <motion.div
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="relative w-full max-w-xl bg-admin-card rounded-[32px] shadow-3xl overflow-hidden border border-admin-border flex flex-col max-h-[85vh] transition-colors"
             >
                <div className="p-8 bg-admin-sidebar text-white relative flex justify-between items-center border-b border-white/5">
                   <div>
                      <h4 className="text-xl font-bold uppercase tracking-tight">Deployment Summary</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-accent mt-1">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </p>
                   </div>
                   <button 
                     onClick={() => setSelectedDate(null)}
                     className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white"
                   >
                      <X className="w-5 h-5" />
                   </button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8 bg-admin-card">
                   {activitiesForSelectedDate.length > 0 ? (
                      <>
                        <div className="grid grid-cols-3 gap-4">
                           <div className="bg-admin-bg p-5 rounded-2xl border border-admin-border flex flex-col items-center justify-center text-center">
                              <p className="text-[8px] font-black uppercase text-admin-text-muted tracking-widest mb-1">Total</p>
                              <p className="text-xl font-black text-admin-text-main font-mono">{activitiesForSelectedDate.length}</p>
                           </div>
                           <div className="bg-blue-500/5 p-5 rounded-2xl border border-blue-500/10 flex flex-col items-center justify-center text-center">
                              <p className="text-[8px] font-black uppercase text-blue-500 tracking-widest mb-1">Transfers</p>
                              <p className="text-xl font-black text-blue-500 font-mono">
                                {activitiesForSelectedDate.filter(a => a.productType === 'Transfer').length}
                              </p>
                           </div>
                           <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/10 flex flex-col items-center justify-center text-center">
                              <p className="text-[8px] font-black uppercase text-amber-500 tracking-widest mb-1">Outings</p>
                              <p className="text-xl font-black text-amber-500 font-mono">
                                {activitiesForSelectedDate.filter(a => a.productType === 'Outing Package').length}
                              </p>
                           </div>
                           <div className="bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/10 flex flex-col items-center justify-center text-center">
                              <p className="text-[8px] font-black uppercase text-indigo-500 tracking-widest mb-1">Activities</p>
                              <p className="text-xl font-black text-indigo-500 font-mono">
                                {activitiesForSelectedDate.filter(a => a.productType === 'Activity').length}
                              </p>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <p className="text-[9px] font-black uppercase tracking-widest text-admin-accent mb-4 border-b border-admin-border pb-2">Operational Timeline</p>
                           {activitiesForSelectedDate.map((act) => (
                              <div key={act.id} className="p-4 bg-admin-bg/50 border border-admin-border rounded-2xl flex items-center justify-between group hover:border-admin-accent/50 hover:bg-admin-card transition-all">
                                 <div className="flex items-center gap-5">
                                    <div className="bg-admin-accent/10 w-11 h-11 rounded-xl flex items-center justify-center shadow-inner border border-admin-accent/10">
                                       <span className="text-admin-accent font-black text-[10px] font-mono">{act.time}</span>
                                    </div>
                                    <div>
                                       <h5 className="font-bold text-admin-text-main text-sm">{act.productName}</h5>
                                       <div className="flex items-center gap-3 mt-1 underline decoration-admin-border">
                                          <span className="text-[9px] font-bold text-admin-text-muted flex items-center gap-1">
                                             <User className="w-2.5 h-2.5 text-admin-accent" /> {act.customerName}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                                 <button className="p-2.5 bg-admin-card text-admin-accent rounded-lg border border-admin-border hover:bg-admin-accent hover:text-white transition-all shadow-sm">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                 </button>
                              </div>
                           ))}
                        </div>
                        
                        <div className="bg-admin-sidebar text-white p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-admin-accent/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                           <div className="relative z-10">
                             <div className="flex items-center gap-3 mb-3">
                                <AlertCircle className="w-4 h-4 text-admin-accent" />
                                <h5 className="font-black text-[10px] uppercase tracking-widest text-white/80">Supervisor Intelligence</h5>
                             </div>
                             <p className="text-[10px] text-white/50 leading-relaxed font-medium italic">
                                {activitiesForSelectedDate.some(a => a.productType === 'Transfer') 
                                  ? "High priority transfers detected. Coordinate vehicle prep and chauffeur arrival 15m prior to scheduled pickup."
                                  : "Monitoring inventory levels for upcoming product distribution."}
                             </p>
                           </div>
                        </div>
                      </>
                   ) : (
                      <div className="py-16 text-center space-y-4">
                         <div className="w-16 h-16 bg-admin-accent/5 rounded-full flex items-center justify-center mx-auto border border-admin-accent/10">
                            <CalendarIcon className="w-6 h-6 text-admin-accent/20" />
                         </div>
                         <p className="text-admin-text-muted font-black uppercase tracking-widest text-[10px]">No schedules for this period</p>
                      </div>
                   )}
                </div>

                <div className="p-8 border-t border-admin-border bg-admin-bg/50 flex justify-between items-center transition-colors">
                   <button 
                    onClick={() => {
                      setCurrentDate(selectedDate);
                      setViewMode("1-day");
                      setSelectedDate(null);
                    }}
                    className="text-[10px] font-black uppercase tracking-widest text-admin-accent hover:brightness-125 transition-all flex items-center gap-2 group"
                   >
                     Jump to Timeline <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </button>
                   <button 
                     onClick={() => setSelectedDate(null)}
                     className="px-8 py-3 bg-admin-sidebar text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:brightness-110 active:scale-95 transition-all"
                   >
                      Dismiss
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f633; border-radius: 10px; }
      `}</style>
    </div>
  );
}
