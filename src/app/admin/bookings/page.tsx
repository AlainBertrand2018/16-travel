"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Calendar, Mail, Phone, CreditCard, Clock, Edit3, X, Check, 
  ChevronRight, User, Globe, Hash, Zap, Users, Info, DollarSign, FileText, ChevronLeft, Trash2
} from "lucide-react";
import { Booking, BookingItem, Product } from "@/lib/mockData";
import { dbService } from "@/lib/db";

export default function BookingsManagement() {
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed" | "pending">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const unsubBookings = dbService.subscribeToCollection("bookings", setBookings);
    const unsubProducts = dbService.subscribeToCollection("products", setProducts);
    return () => {
      unsubBookings();
      unsubProducts();
    };
  }, []);
  
  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 4;

  // Form State
  const [form, setForm] = useState<Partial<Booking>>({
    customerName: "", email: "", phone: "", passportNumber: "", countryOfOrigin: "",
    adults: 1, children: 0, language: "English", specialNotes: "",
    arrivalDate: "", departureDate: "", durationDays: 0,
    items: [], paymentType: "Reservation", paymentStatus: "unpaid",
    totalAmount: 0, advancePaid: 0, datePaid: "", remainAmount: 0,
    status: "pending"
  });

  // Calculate Duration and Initial Program when dates change
  useEffect(() => {
    if (form.arrivalDate && form.departureDate) {
      const start = new Date(form.arrivalDate);
      const end = new Date(form.departureDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0) {
        // Generate daily slots
        const newItems: BookingItem[] = [];
        for (let i = 0; i <= diffDays; i++) {
          const currentDate = new Date(start);
          currentDate.setDate(start.getDate() + i);
          const dateStr = currentDate.toISOString().split('T')[0];
          
          const existing = form.items?.find(item => item.date === dateStr);
          if (existing) {
            newItems.push(existing);
          } else {
            const isArrival = i === 0;
            const isDeparture = i === diffDays;
            
            newItems.push({
              id: Math.random().toString(36).substr(2, 9),
              productId: "",
              productName: isArrival ? "Select Arrival Transfer" : isDeparture ? "Select Departure Transfer" : "Select Activity",
              productType: (isArrival || isDeparture) ? "Transfer" : "Outing Package",
              date: dateStr,
              time: isArrival ? "12:00" : "09:00",
              price: 0,
              details: ""
            });
          }
        }
        setForm(prev => ({ ...prev, durationDays: diffDays, items: newItems }));
      }
    }
  }, [form.arrivalDate, form.departureDate]);

  // Handle Item Change
  const updateItem = (index: number, updates: Partial<BookingItem>) => {
    const newItems = [...(form.items || [])];
    newItems[index] = { ...newItems[index], ...updates };
    const total = newItems.reduce((acc, curr) => acc + (curr.price || 0), 0);
    setForm(prev => ({ ...prev, items: newItems, totalAmount: total }));
  };

  const handleOpenEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setForm({ ...booking });
    setShowAddModal(true);
    setCurrentStep(1);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingBooking(null);
    setForm({
      customerName: "", email: "", phone: "", passportNumber: "", countryOfOrigin: "",
      adults: 1, children: 0, language: "English", specialNotes: "",
      arrivalDate: "", departureDate: "", durationDays: 0,
      items: [], paymentType: "Reservation", paymentStatus: "unpaid",
      totalAmount: 0, advancePaid: 0, datePaid: "", remainAmount: 0,
      status: "pending"
    });
    setCurrentStep(1);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleDelete = async (id: string) => {
    if (confirm("Permanently archive and remove this manifest?")) {
      await dbService.deleteItem("bookings", id);
    }
  };

  const handlePublish = async () => {
    if (editingBooking) {
      await dbService.updateItem("bookings", editingBooking.id, form);
    } else {
      await dbService.addItem("bookings", {
        ...form,
        createdAt: new Date().toISOString()
      });
    }
    handleCloseModal();
  };

  const filteredBookings = bookings.filter(b => {
      if (filter === "all") return true;
      return b.status === filter;
  });

  return (
    <div className="space-y-8 pb-10 transition-colors duration-300">
      {/* Header & Filter Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-admin-card p-6 rounded-[32px] border border-admin-border shadow-sm">
        <div className="relative w-full xl:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-text-muted" />
          <input 
            type="text" 
            placeholder="Search manifests..."
            className="w-full pl-11 pr-4 py-3 bg-admin-bg rounded-xl text-xs border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none transition-all placeholder:text-admin-text-muted/50"
          />
        </div>

        <div className="flex items-center gap-4 w-full xl:w-auto">
          <div className="flex bg-admin-bg p-1 rounded-xl border border-admin-border gap-0.5">
            {(["all", "ongoing", "completed", "pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === f 
                    ? "bg-admin-accent text-white shadow-md shadow-admin-accent/20" 
                    : "text-admin-text-muted hover:text-admin-text-main"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-admin-sidebar text-white px-6 py-3 rounded-xl shadow-lg shadow-admin-sidebar/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 text-admin-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest">Create Manifest</span>
          </button>
        </div>
      </div>

      {/* Bookings Table/Grid */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <motion.div
            key={booking.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-admin-card rounded-[32px] p-8 shadow-sm border border-admin-border hover:border-admin-accent/30 transition-all group"
          >
            <div className="flex flex-col lg:flex-row gap-10">
               {/* Left: Client Card */}
               <div className="lg:w-1/3 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-admin-bg border border-admin-border text-admin-accent flex items-center justify-center text-xl font-bold">
                        {booking.customerName[0]}
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-admin-text-main">{booking.customerName}</h3>
                        <p className="text-[9px] font-black text-admin-text-muted uppercase tracking-widest">{booking.id} • {booking.countryOfOrigin}</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="bg-admin-bg/50 p-4 rounded-xl border border-admin-border">
                        <p className="text-[8px] font-black text-admin-text-muted uppercase mb-1">Stay Duration</p>
                        <p className="text-sm font-bold text-admin-text-main">{booking.durationDays} Days</p>
                     </div>
                     <div className="bg-admin-bg/50 p-4 rounded-xl border border-admin-border">
                        <p className="text-[8px] font-black text-admin-text-muted uppercase mb-1">Party Size</p>
                        <p className="text-sm font-bold text-admin-text-main">{booking.adults}A, {booking.children}C</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-admin-text-muted"><Mail className="w-3 h-3 text-admin-accent" /> {booking.email}</div>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-admin-text-muted"><Phone className="w-3 h-3 text-admin-accent" /> {booking.phone}</div>
                  </div>
               </div>

               {/* Right: Program & Financials */}
               <div className="lg:w-2/3 flex flex-col justify-between">
                  <div className="space-y-4">
                     <p className="text-[9px] font-black text-admin-text-muted uppercase tracking-[0.2em]">Deployment Pulse</p>
                     <div className="flex flex-wrap gap-2">
                        {booking.items.map((item, idx) => (
                           <div key={item.id} className="flex items-center gap-2 bg-admin-bg/30 px-3 py-1.5 rounded-lg text-[9px] font-black text-admin-text-main border border-admin-border group-hover:bg-admin-bg transition-colors">
                              <span className="text-admin-accent font-mono">{String(idx + 1).padStart(2, '0')}</span>
                              {item.productName}
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-admin-border">
                     <div className="flex gap-8">
                        <div>
                           <p className="text-[8px] font-black text-admin-text-muted uppercase mb-1">Schema</p>
                           <p className="text-[10px] font-black text-admin-text-main uppercase tracking-widest">{booking.paymentType}</p>
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-admin-text-muted uppercase mb-1">Total Valuation</p>
                           <p className="text-xl font-black text-admin-text-main">€{booking.totalAmount}</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button onClick={() => handleOpenEdit(booking)} className="p-3 bg-admin-bg text-admin-text-muted rounded-xl hover:text-admin-accent border border-admin-border transition-all">
                           <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(booking.id)} className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white border border-rose-500/10 transition-all">
                           <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="px-6 py-3 bg-admin-sidebar text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md shadow-admin-sidebar/20 hover:brightness-110 active:scale-95 transition-all">
                           Generate Docs
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Wizard Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-admin-sidebar/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-5xl bg-admin-card rounded-[32px] shadow-3xl overflow-hidden max-h-[95vh] flex flex-col border border-admin-border"
            >
               {/* Modal Header */}
               <div className="p-8 border-b border-admin-border bg-admin-sidebar flex justify-between items-start">
                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <span className="px-2.5 py-1 bg-admin-accent/20 text-admin-accent text-[9px] font-black uppercase tracking-widest rounded">Status {currentStep}/{TOTAL_STEPS}</span>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight">{editingBooking ? "Modify Entry" : "New Manifest Entry"}</h2>
                     </div>
                     <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Internal Control Record</p>
                  </div>
                  <button onClick={handleCloseModal} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white transition-all">
                    <X className="w-5 h-5" />
                  </button>
               </div>

               {/* Step Indicator Bar */}
               <div className="px-8 py-5 bg-admin-bg/50 border-b border-admin-border flex items-center justify-between gap-4">
                  {[
                    { n: 1, label: "Identity", icon: User },
                    { n: 2, label: "Interval", icon: Calendar },
                    { n: 3, label: "Program", icon: Zap },
                    { n: 4, label: "Valuation", icon: DollarSign }
                  ].map((s) => (
                    <div key={s.n} className={`flex items-center gap-3 transition-all ${currentStep >= s.n ? 'opacity-100' : 'opacity-20'}`}>
                       <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${currentStep === s.n ? 'bg-admin-accent text-white shadow-lg shadow-admin-accent/20' : 'bg-admin-card text-admin-text-muted border border-admin-border'}`}>
                          <s.icon className="w-4 h-4" />
                       </div>
                       <span className={`text-[9px] font-black uppercase tracking-widest hidden md:block ${currentStep === s.n ? 'text-admin-text-main' : 'text-admin-text-muted'}`}>{s.label}</span>
                    </div>
                  ))}
               </div>

               {/* Content Area */}
               <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-admin-card">
                  {/* STEP 1: IDENTITY */}
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Full Legal Name</label>
                          <input type="text" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} className="form-input-admin" placeholder="Client Name" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Electronic Mail</label>
                          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="form-input-admin" placeholder="email@address.com" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Mobile Reference</label>
                          <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="form-input-admin" placeholder="+230 XXX XXXX" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Passport / ID</label>
                          <input type="text" value={form.passportNumber} onChange={e => setForm({...form, passportNumber: e.target.value})} className="form-input-admin font-mono uppercase" placeholder="REF NUMBER" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Registry Origin</label>
                          <input type="text" value={form.countryOfOrigin} onChange={e => setForm({...form, countryOfOrigin: e.target.value})} className="form-input-admin" placeholder="Country" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Allocation (A/C)</label>
                          <div className="flex gap-2">
                             <input type="number" value={form.adults} onChange={e => setForm({...form, adults: parseInt(e.target.value)})} className="form-input-admin w-1/2" />
                             <input type="number" value={form.children} onChange={e => setForm({...form, children: parseInt(e.target.value)})} className="form-input-admin w-1/2" />
                          </div>
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Comms Language</label>
                          <select value={form.language} onChange={e => setForm({...form, language: e.target.value})} className="form-input-admin py-3">
                              <option>English</option>
                              <option>French</option>
                              <option>German</option>
                              <option>Russian</option>
                          </select>
                       </div>
                       <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Bespoke Requirements</label>
                          <input type="text" value={form.specialNotes} onChange={e => setForm({...form, specialNotes: e.target.value})} className="form-input-admin" placeholder="Notes, Birthdays, VIP status..." />
                       </div>
                    </div>
                  )}

                  {/* STEP 2: INTERVAL */}
                  {currentStep === 2 && (
                    <div className="space-y-8 py-10 max-w-xl mx-auto">
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black uppercase tracking-[0.2em] text-admin-text-muted block text-center">Inbound Date</label>
                             <input type="date" value={form.arrivalDate} onChange={e => setForm({...form, arrivalDate: e.target.value})} className="w-full p-6 rounded-2xl bg-admin-bg border border-admin-border text-center text-lg font-bold text-admin-text-main focus:ring-2 focus:ring-admin-accent/20 outline-none transition-all uppercase" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[9px] font-black uppercase tracking-[0.2em] text-admin-text-muted block text-center">Outbound Date</label>
                             <input type="date" value={form.departureDate} onChange={e => setForm({...form, departureDate: e.target.value})} className="w-full p-6 rounded-2xl bg-admin-bg border border-admin-border text-center text-lg font-bold text-admin-text-main focus:ring-2 focus:ring-admin-accent/20 outline-none transition-all uppercase" />
                          </div>
                       </div>

                       <div className="bg-admin-sidebar p-8 rounded-[32px] text-white text-center space-y-1 shadow-xl border border-white/5">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-admin-accent">Asset Utilization Period</p>
                          <p className="text-5xl font-black">{form.durationDays || 0} DAYS</p>
                       </div>
                    </div>
                  )}

                  {/* STEP 3: PROGRAM */}
                  {currentStep === 3 && (
                    <div className="space-y-4 pb-12">
                       {form.items?.map((item, idx) => {
                          const isArrival = idx === 0;
                          const isDeparture = idx === (form.items?.length ?? 0) - 1;
                          
                          return (
                            <div key={item.id} className="relative group">
                               <div className="bg-admin-bg/30 border border-admin-border rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-end hover:bg-admin-bg/50 transition-all">
                                  <div className="lg:col-span-2">
                                     <p className="text-[8px] font-black uppercase text-admin-accent tracking-tighter mb-1">
                                        {isArrival ? "ARRIVAL" : isDeparture ? "DEPARTURE" : `DAY ${idx + 1}`}
                                     </p>
                                     <div className="text-[10px] font-bold text-admin-text-main font-mono">
                                        {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                     </div>
                                  </div>
                                  
                                  <div className="lg:col-span-4 space-y-1.5">
                                     <label className="text-[8px] font-black uppercase text-admin-text-muted">Asset/Service</label>
                                     <select 
                                        className="w-full bg-admin-card p-3 rounded-lg border border-admin-border text-[10px] font-bold text-admin-text-main outline-none focus:ring-2 focus:ring-admin-accent/20"
                                        value={item.productName}
                                        onChange={(e) => {
                                           const prod = products.find((p: Product) => p.name === e.target.value);
                                           updateItem(idx, { 
                                              productName: e.target.value, 
                                              productId: prod?.id || "", 
                                              price: prod?.price || 100,
                                              productType: prod?.category || "Outing Package" 
                                           });
                                        }}
                                     >
                                        <option value="">Select Service...</option>
                                        {(isArrival || isDeparture) ? (
                                          <>
                                            <option>Exec Car Transfer</option>
                                            <option>Family SUV Transfer</option>
                                            <option>Minivan Transfer</option>
                                            <option>Coaster Bus Transfer</option>
                                          </>
                                        ) : (
                                          products.filter((p: Product) => p.category !== 'Transfer').map((p: Product) => (
                                            <option key={p.id}>{p.name}</option>
                                          ))
                                        )}
                                     </select>
                                  </div>

                                  <div className="lg:col-span-4 space-y-1.5">
                                     <label className="text-[8px] font-black uppercase text-admin-text-muted">Fleet Ops / Client Ref</label>
                                     <input 
                                        type="text" 
                                        className="w-full bg-admin-card p-3 rounded-lg border border-admin-border text-[10px] font-medium text-admin-text-main outline-none focus:ring-2 focus:ring-admin-accent/20"
                                        value={item.details}
                                        onChange={(e) => updateItem(idx, { details: e.target.value })}
                                        placeholder="Add specific details..."
                                     />
                                  </div>

                                  <div className="lg:col-span-2 space-y-1.5">
                                     <label className="text-[8px] font-black uppercase text-admin-text-muted">Valuation (€)</label>
                                     <input 
                                        type="number" 
                                        className="w-full bg-admin-card p-3 rounded-lg border border-admin-border text-[10px] font-black text-admin-text-main outline-none focus:ring-2 focus:ring-admin-accent/20 font-mono"
                                        value={item.price}
                                        onChange={(e) => updateItem(idx, { price: parseFloat(e.target.value) })}
                                     />
                                  </div>
                               </div>
                            </div>
                          );
                       })}
                    </div>
                  )}

                  {/* STEP 4: VALUATION */}
                  {currentStep === 4 && (
                    <div className="space-y-8 pb-10">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { id: 'Reservation', detail: 'Partial capture + Bal.', icon: FileText },
                            { id: 'Prepaid', detail: 'Full capture upfront.', icon: Check },
                            { id: 'Postpaid', detail: 'Zero capture / AR log.', icon: Clock }
                          ].map(mode => (
                            <button 
                              key={mode.id}
                              onClick={() => setForm({...form, paymentType: mode.id as any})}
                              className={`p-6 rounded-2xl border transition-all text-left space-y-3 ${form.paymentType === mode.id ? 'bg-admin-accent border-admin-accent text-white shadow-lg' : 'bg-admin-bg border-admin-border text-admin-text-muted hover:border-admin-accent/50'}`}
                            >
                               <mode.icon className="w-5 h-5 mb-2" />
                               <p className="text-[11px] font-black uppercase tracking-widest">{mode.id}</p>
                               <p className="text-[9px] opacity-60 font-medium">{mode.detail}</p>
                            </button>
                          ))}
                       </div>

                       <div className="bg-admin-sidebar rounded-[32px] p-10 text-white border border-white/5 shadow-2xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-admin-accent mb-2">Hustle Valuation</p>
                                <p className="text-3xl font-black">€{form.totalAmount}</p>
                             </div>
                             {form.paymentType === 'Reservation' && (
                               <>
                                 <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-admin-accent mb-2">Advance Captured</p>
                                    <input 
                                      type="number" 
                                      className="bg-white/5 border border-white/10 rounded-xl p-3 w-full text-lg font-bold focus:ring-2 focus:ring-admin-accent outline-none text-white font-mono" 
                                      value={form.advancePaid || ""} 
                                      onChange={e => {
                                        const adv = parseFloat(e.target.value) || 0;
                                        setForm({...form, advancePaid: adv});
                                      }} 
                                    />
                                 </div>
                                 <div className="flex flex-col justify-center">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1">Exposure Balance</p>
                                    <p className="text-xl font-bold text-emerald-100 font-mono">
                                      €{(form.totalAmount || 0) - (form.advancePaid || 0)}
                                    </p>
                                 </div>
                               </>
                             )}

                             {(form.paymentType === 'Reservation' || form.paymentType === 'Prepaid') && (
                                <div>
                                   <p className="text-[9px] font-black uppercase tracking-widest text-admin-accent mb-2">Capture Date</p>
                                   <input type="date" className="bg-white/5 border border-white/10 rounded-xl p-3 w-full text-[10px] font-black text-white uppercase outline-none focus:ring-2 focus:ring-admin-accent" value={form.datePaid} onChange={e => setForm({...form, datePaid: e.target.value})} />
                                </div>
                             )}

                             {form.paymentType === 'Postpaid' && (
                                <div className="lg:col-span-3 flex items-center bg-white/5 border border-white/5 rounded-2xl p-6">
                                   <Info className="w-6 h-6 text-admin-accent mr-4 shrink-0" />
                                   <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase tracking-widest italic">Awaiting net settlement terms. Registry updated.</p>
                                </div>
                             )}
                          </div>
                       </div>

                       <div className="flex justify-between items-center py-6 border-t border-admin-border">
                          <div className="flex gap-3">
                             <button className="flex items-center gap-2 px-6 py-3 bg-admin-bg text-admin-text-muted rounded-xl text-[9px] font-black uppercase tracking-widest border border-admin-border hover:text-admin-accent transition-all">
                                <FileText className="w-3.5 h-3.5" /> Draft INV
                             </button>
                             {form.paymentType !== 'Postpaid' && (
                               <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all">
                                  <FileText className="w-3.5 h-3.5" /> Draft REC
                               </button>
                             )}
                          </div>
                          
                          <div className="text-right">
                             <p className="text-[8px] font-black uppercase text-admin-text-muted tracking-widest mb-1">Validation Chain</p>
                             <div className="flex items-center gap-2 justify-end">
                                <span className="text-[10px] font-black text-admin-text-main uppercase italic border-r pr-3 border-admin-border">ADMIN SECURE</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
               </div>

               {/* Modal Footer Controls */}
               <div className="p-8 bg-admin-bg/50 border-t border-admin-border flex justify-between items-center shadow-inner">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl text-admin-text-muted text-[10px] font-black uppercase tracking-widest transition-all ${currentStep === 1 ? 'opacity-0 cursor-default' : 'hover:text-admin-accent hover:bg-admin-card border border-admin-border'}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex gap-3">
                    {currentStep < TOTAL_STEPS ? (
                      <button 
                        onClick={nextStep}
                        className="flex items-center gap-3 bg-admin-accent text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-admin-accent/20 hover:brightness-110 active:scale-95 transition-all"
                      >
                        Proceed Sequence
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={handlePublish}
                        className="flex items-center gap-3 bg-admin-sidebar text-white px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-admin-sidebar/20 hover:brightness-110 active:scale-95 transition-all"
                      >
                        Publish Manifest
                        <Check className="w-4 h-4 text-admin-accent" />
                      </button>
                    )}
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .form-input-admin {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background-color: var(--admin-bg);
          border-radius: 0.75rem;
          border: 1px solid var(--admin-border);
          font-weight: 700;
          font-size: 0.75rem;
          color: var(--admin-text-main);
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input-admin:focus {
          border-color: var(--admin-accent);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f633; border-radius: 10px; }
      `}</style>
    </div>
  );
}
