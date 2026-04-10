"use client";
import React, { useState } from "react";
import { 
  Car, 
  User as DriverIcon, 
  Plus, 
  Search, 
  Trash2,
  Edit,
  ShieldCheck,
  AlertCircle,
  Users,
  X,
  Package,
  Map,
  Clock,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  INITIAL_VEHICLES, 
  INITIAL_DRIVERS, 
  Vehicle, 
  Driver,
  TransportService
} from "@/lib/mockData";
import { dbService, storageService } from "@/lib/db";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

export default function TransportManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [services, setServices] = useState<TransportService[]>([]);
  const [view, setView] = useState<"vehicles" | "drivers" | "packages">("vehicles");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const unsubVehicles = dbService.subscribeToCollection("transport_vehicles", setVehicles);
    const unsubDrivers = dbService.subscribeToCollection("transport_drivers", setDrivers);
    const unsubServices = dbService.subscribeToCollection("transport_services", setServices);
    return () => {
      unsubVehicles();
      unsubDrivers();
      unsubServices();
    };
  }, []);

  // Modals state
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [editingService, setEditingService] = useState<TransportService | null>(null);

  const [vehicleForm, setVehicleForm] = useState<Partial<Vehicle>>({
    category: "Executive Car",
    status: "Available"
  });

  const [serviceForm, setServiceForm] = useState<Partial<TransportService>>({
    categoryName: "Standard Car",
    transfers: [
      { type: "Airport to Hotel", price: 2000 },
      { type: "Hotel to Airport", price: 2000 },
      { type: "Inter-hotel", price: 2500 }
    ],
    pickDrop: [],
    excursions: []
  });

  const [driverForm, setDriverForm] = useState<Partial<Driver>>({
    status: "Active"
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const vehicleFileRef = useRef<HTMLInputElement>(null);
  const driverFileRef = useRef<HTMLInputElement>(null);
  const serviceFileRef = useRef<HTMLInputElement>(null);

  const handleDeleteVehicle = async (id: string) => {
    if (confirm("Are you sure you want to remove this vehicle?")) {
      await dbService.deleteItem("transport_vehicles", id);
    }
  };

  const handleDeleteDriver = async (id: string) => {
    if (confirm("Are you sure you want to remove this driver?")) {
      await dbService.deleteItem("transport_drivers", id);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm("Are you sure you want to delete this service package?")) {
      await dbService.deleteItem("transport_services", id);
    }
  };

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVehicle) {
      await dbService.updateItem("transport_vehicles", editingVehicle.id, vehicleForm);
    } else {
      await dbService.addItem("transport_vehicles", vehicleForm);
    }
    setShowVehicleModal(false);
    setEditingVehicle(null);
    setVehicleForm({ category: "Executive Car", status: "Available" });
  };

  const handleSaveDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDriver) {
      await dbService.updateItem("transport_drivers", editingDriver.id, driverForm);
    } else {
      await dbService.addItem("transport_drivers", driverForm);
    }
    setShowDriverModal(false);
    setEditingDriver(null);
    setDriverForm({ status: "Active" });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      await dbService.updateItem("transport_services", editingService.id, serviceForm);
    } else {
      await dbService.addItem("transport_services", serviceForm);
    }
    setShowServiceModal(false);
    setEditingService(null);
    setServiceForm({
      categoryName: "Standard Car",
      transfers: [
        { type: "Airport to Hotel", price: 2000 },
        { type: "Hotel to Airport", price: 2000 },
        { type: "Inter-hotel", price: 2500 }
      ],
      pickDrop: [],
      excursions: []
    });
  };

  const handleImageUpload = async (file: File, type: 'vehicle' | 'driver' | 'service') => {
    try {
      setIsUploading(true);
      const path = `${type}s/${Date.now()}_${file.name}`;
      const url = await storageService.uploadFile(path, file);
      if (type === 'vehicle') {
        setVehicleForm(prev => ({ ...prev, image: url }));
      } else if (type === 'driver') {
        setDriverForm(prev => ({ ...prev, image: url }));
      } else {
        setServiceForm(prev => ({ ...prev, vehicleImage: url }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Failed to upload ${type} image.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Selection */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-admin-card p-6 rounded-[32px] border border-admin-border shadow-sm">
        <div className="flex bg-admin-bg p-1.5 rounded-xl gap-1">
            <button
              onClick={() => setView("vehicles")}
              className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === "vehicles" 
                  ? "bg-admin-accent text-white shadow-md shadow-admin-accent/20" 
                  : "text-admin-text-muted hover:text-admin-text-main hover:bg-admin-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <Car className="w-3.5 h-3.5" />
                Fleet Assets
              </div>
            </button>
            <button
              onClick={() => setView("drivers")}
              className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === "drivers" 
                  ? "bg-admin-accent text-white shadow-md shadow-admin-accent/20" 
                  : "text-admin-text-muted hover:text-admin-text-main hover:bg-admin-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Personnel Roster
              </div>
            </button>
            <button
              onClick={() => setView("packages")}
              className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === "packages" 
                  ? "bg-admin-accent text-white shadow-md shadow-admin-accent/20" 
                  : "text-admin-text-muted hover:text-admin-text-main hover:bg-admin-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-3.5 h-3.5" />
                Service Packages
              </div>
            </button>
        </div>

        <div className="flex items-center gap-4 w-full xl:w-auto">
           <div className="relative flex-1 xl:flex-none xl:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-admin-text-muted" />
              <input 
                type="text" 
                placeholder={`Filter ${view}...`}
                className="w-full pl-11 pr-4 py-3 bg-admin-bg rounded-xl text-xs border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none placeholder:text-admin-text-muted/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
             onClick={() => {
               if (view === "vehicles") setShowVehicleModal(true);
               else if (view === "drivers") setShowDriverModal(true);
               else setShowServiceModal(true);
             }}
             className="px-6 py-3 bg-admin-sidebar text-white rounded-xl flex items-center gap-2 shadow-lg shadow-admin-sidebar/10 hover:brightness-110 active:scale-95 transition-all"
           >
              <Plus className="w-3.5 h-3.5 text-admin-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest">Entry</span>
           </button>
        </div>
      </div>

      {/* Content Areas */}
      <AnimatePresence mode="wait">
        {view === "vehicles" ? (
          <motion.div 
            key="vehicles"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {vehicles.filter(v => v.make.toLowerCase().includes(searchTerm.toLowerCase()) || v.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())).map((vehicle) => (
              <div key={vehicle.id} className="bg-admin-card rounded-[32px] shadow-sm border border-admin-border overflow-hidden group hover:border-admin-accent/30 transition-all flex flex-col h-full">
                {/* Vehicle Header Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-admin-bg">
                  {vehicle.image ? (
                    <Image 
                      src={vehicle.image} 
                      alt={vehicle.make} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-admin-text-muted/20">
                      <Car className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${
                      vehicle.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                      vehicle.status === 'In Service' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 
                      'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>

                  {/* Classification Overlay */}
                  <div className="absolute bottom-4 left-6">
                    <p className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em] mb-0.5">{vehicle.category}</p>
                    <h3 className="text-xl font-bold text-white tracking-tight">{vehicle.make} {vehicle.model}</h3>
                  </div>
                </div>

                {/* Vehicle Info Body */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-admin-bg/50 p-4 rounded-2xl border border-admin-border shadow-inner">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-admin-accent animate-pulse" />
                        <span className="text-[9px] font-black text-admin-text-muted uppercase tracking-wider">Plate Number</span>
                      </div>
                      <span className="text-xs font-black text-admin-text-main font-mono bg-admin-card px-2 py-1 rounded-lg border border-admin-border">{vehicle.registrationNumber}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-admin-bg/30 p-3.5 rounded-2xl border border-admin-border transition-colors group-hover:bg-admin-bg/50">
                        <span className="block text-[8px] font-black text-admin-text-muted uppercase mb-1.5 tracking-tighter opacity-70">MFG Year</span>
                        <span className="text-sm font-bold text-admin-text-main">{vehicle.year}</span>
                      </div>
                      <div className="bg-admin-bg/30 p-3.5 rounded-2xl border border-admin-border transition-colors group-hover:bg-admin-bg/50">
                        <span className="block text-[8px] font-black text-admin-text-muted uppercase mb-1.5 tracking-tighter opacity-70">Max Payload</span>
                        <span className="text-sm font-bold text-admin-text-main">{vehicle.capacity} PAX</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => {
                        setEditingVehicle(vehicle);
                        setVehicleForm(vehicle);
                        setShowVehicleModal(true);
                      }}
                      className="flex-1 py-3.5 bg-admin-accent/10 text-admin-accent rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-admin-accent hover:text-white transition-all border border-admin-accent/20 shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" /> Modify Asset
                    </button>
                    <button 
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="w-14 h-14 bg-rose-500/5 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-500/10 shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : view === "drivers" ? (
          <motion.div 
            key="drivers"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {drivers.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((driver) => (
              <div key={driver.id} className="bg-admin-card rounded-[32px] overflow-hidden shadow-sm border border-admin-border hover:border-admin-accent/30 transition-all group flex flex-col h-full">
                {/* Header Visual for Personnel */}
                <div className="relative h-28 bg-admin-sidebar overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-admin-accent via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-admin-card/80" />
                  
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${
                      driver.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                      driver.status === 'On Trip' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 
                      'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}>
                      {driver.status}
                    </span>
                  </div>
                </div>

                {/* Profile Visual (Large) */}
                <div className="-mt-14 px-6 relative z-10">
                  <div className="flex items-end gap-5">
                    <div className="w-24 h-24 rounded-[32px] bg-admin-bg border-[6px] border-admin-card flex items-center justify-center shadow-2xl overflow-hidden group-hover:border-admin-accent/20 transition-all duration-500 relative">
                      {driver.image ? (
                        <Image src={driver.image} alt={driver.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <DriverIcon className="w-10 h-10 text-admin-accent/30" />
                      )}
                    </div>
                    <div className="pb-2">
                       <h3 className="text-xl font-bold text-admin-text-main tracking-tight leading-tight">{driver.name}</h3>
                       <p className="text-[9px] font-black text-admin-text-muted uppercase tracking-[0.2em] mt-1.5 opacity-70">Verified Personnel</p>
                    </div>
                  </div>
                </div>

                {/* Driver Info Body */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-admin-bg/50 p-4 rounded-2xl border border-admin-border shadow-inner group-hover:border-admin-accent/5 transition-colors">
                       <div className="w-10 h-10 rounded-xl bg-admin-card border border-admin-border flex items-center justify-center text-admin-accent shadow-sm">
                          <ShieldCheck className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="text-[8px] font-black text-admin-text-muted uppercase tracking-wider mb-0.5 opacity-60">License ID</p>
                         <p className="text-sm font-bold text-admin-text-main font-mono tracking-wide">{driver.licenseNumber}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-admin-bg/50 p-4 rounded-2xl border border-admin-border shadow-inner group-hover:border-admin-accent/5 transition-colors">
                       <div className="w-10 h-10 rounded-xl bg-admin-card border border-admin-border flex items-center justify-center text-admin-accent shadow-sm">
                          <AlertCircle className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="text-[8px] font-black text-admin-text-muted uppercase tracking-wider mb-0.5 opacity-60">Mobile Contact</p>
                         <p className="text-sm font-bold text-admin-text-main">{driver.phone}</p>
                       </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setEditingDriver(driver);
                        setDriverForm(driver);
                        setShowDriverModal(true);
                      }}
                      className="flex-1 py-4 bg-admin-sidebar text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-admin-sidebar/20 hover:brightness-125 transition-all active:scale-[0.98]"
                    >
                      <Edit className="w-3.5 h-3.5 text-admin-accent" /> Manage Account
                    </button>
                    <button 
                      onClick={() => handleDeleteDriver(driver.id)}
                      className="w-14 h-14 bg-rose-500/5 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-500/10 shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="packages"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {services.filter(s => s.categoryName.toLowerCase().includes(searchTerm.toLowerCase())).map((service) => (
              <div key={service.id} className="bg-admin-card rounded-[32px] shadow-sm border border-admin-border overflow-hidden group hover:border-admin-accent/30 transition-all flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-admin-bg">
                  {service.vehicleImage ? (
                    <Image 
                      src={service.vehicleImage} 
                      alt={service.categoryName} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-admin-text-muted/20">
                      <Package className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-6">
                    <p className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em] mb-0.5">{service.paxRange || 'Standard'}</p>
                    <h3 className="text-xl font-bold text-white tracking-tight">{service.categoryName}</h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold text-admin-text-muted uppercase bg-admin-bg/50 p-3 rounded-xl border border-admin-border">
                      <div className="flex items-center gap-2">
                        <Map className="w-3 h-3 text-admin-accent" />
                        <span>Transfers</span>
                      </div>
                      <span className="text-admin-text-main">{service.transfers.length} Types</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-admin-text-muted uppercase bg-admin-bg/50 p-3 rounded-xl border border-admin-border">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-admin-accent" />
                        <span>Excursions</span>
                      </div>
                      <span className="text-admin-text-main">{service.excursions.length} Packages</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-admin-text-muted uppercase bg-admin-bg/50 p-3 rounded-xl border border-admin-border">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3 h-3 text-admin-accent" />
                        <span>Pick & Drop</span>
                      </div>
                      <span className="text-admin-text-main">{service.pickDrop.length} Options</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setEditingService(service);
                        setServiceForm(service);
                        setShowServiceModal(true);
                      }}
                      className="flex-1 py-3.5 bg-admin-accent/10 text-admin-accent rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-admin-accent hover:text-white transition-all border border-admin-accent/20"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Package
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)}
                      className="w-14 h-14 bg-rose-500/5 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicle Modal */}
      <AnimatePresence>
        {showVehicleModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => { setShowVehicleModal(false); setEditingVehicle(null); }}
               className="absolute inset-0 bg-admin-sidebar/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="relative w-full max-w-xl bg-admin-card rounded-[32px] shadow-3xl overflow-hidden border border-admin-border transition-colors duration-300"
             >
                <form onSubmit={handleSaveVehicle}>
                  <div className="p-8 bg-admin-sidebar flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{editingVehicle ? "Update Asset" : "Register New Asset"}</h3>
                    <button type="button" onClick={() => { setShowVehicleModal(false); setEditingVehicle(null); }} className="text-white/40 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar bg-admin-card">
                    {/* Vehicle Image Upload */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Asset Visual</label>
                        <input 
                          type="file" 
                          ref={vehicleFileRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'vehicle')}
                        />
                         <div 
                          onClick={() => vehicleFileRef.current?.click()}
                          className="w-full h-32 bg-admin-bg rounded-xl border-2 border-dashed border-admin-border flex flex-col items-center justify-center cursor-pointer hover:bg-admin-bg/80 transition-all overflow-hidden relative"
                        >
                           {isUploading ? (
                             <div className="w-6 h-6 border-2 border-admin-accent border-t-transparent rounded-full animate-spin" />
                           ) : vehicleForm.image ? (
                             <Image src={vehicleForm.image} alt="Preview" fill className="object-cover" />
                           ) : (
                             <>
                               <ImageIcon className="w-6 h-6 text-admin-text-muted mb-2" />
                               <span className="text-[8px] font-black uppercase text-admin-text-muted">Upload Vehicle Photo</span>
                             </>
                           )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Category</label>
                        <select 
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main appearance-none cursor-pointer"
                          value={vehicleForm.category}
                          onChange={(e) => setVehicleForm({...vehicleForm, category: e.target.value as any})}
                        >
                          <option>Executive Car</option>
                          <option>Family SUV</option>
                          <option>Minivan</option>
                          <option>Coach</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Imm. Number</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main uppercase font-mono"
                          value={vehicleForm.registrationNumber || ""}
                          onChange={(e) => setVehicleForm({...vehicleForm, registrationNumber: e.target.value})}
                          placeholder="e.g. S 1600"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Make</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={vehicleForm.make || ""}
                          onChange={(e) => setVehicleForm({...vehicleForm, make: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Model</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={vehicleForm.model || ""}
                          onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Year</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={vehicleForm.year || ""}
                          onChange={(e) => setVehicleForm({...vehicleForm, year: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Capacity (PAX)</label>
                        <input 
                          type="number" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={vehicleForm.capacity || ""}
                          onChange={(e) => setVehicleForm({...vehicleForm, capacity: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 border-t border-admin-border flex gap-4 bg-admin-card">
                    <button type="button" onClick={() => { setShowVehicleModal(false); setEditingVehicle(null); }} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-admin-text-muted hover:text-admin-text-main transition-colors">Abort</button>
                    <button type="submit" className="flex-[2] py-4 bg-admin-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-admin-accent/20 hover:brightness-110 active:scale-[0.98] transition-all">
                      {editingVehicle ? "Confirm Update" : "Create Asset Entry"}
                    </button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Driver Modal */}
      <AnimatePresence>
        {showDriverModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => { setShowDriverModal(false); setEditingDriver(null); }}
               className="absolute inset-0 bg-admin-sidebar/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="relative w-full max-w-xl bg-admin-card rounded-[32px] shadow-3xl overflow-hidden border border-admin-border"
             >
                <form onSubmit={handleSaveDriver}>
                  <div className="p-8 bg-admin-sidebar flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{editingDriver ? "Update Profile" : "Personnel Onboarding"}</h3>
                    <button type="button" onClick={() => { setShowDriverModal(false); setEditingDriver(null); }} className="text-white/40 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-8 space-y-6 bg-admin-card">
                    {/* Driver Image Upload */}
                    <div className="flex justify-center mb-6">
                       <input 
                          type="file" 
                          ref={driverFileRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'driver')}
                       />
                       <div 
                        onClick={() => driverFileRef.current?.click()}
                        className="w-24 h-24 rounded-full bg-admin-bg border-2 border-dashed border-admin-border flex items-center justify-center cursor-pointer hover:bg-admin-bg/80 transition-all overflow-hidden relative group"
                       >
                          {isUploading ? (
                             <div className="w-6 h-6 border-2 border-admin-accent border-t-transparent rounded-full animate-spin" />
                           ) : driverForm.image ? (
                             <Image src={driverForm.image} alt="Preview" fill className="object-cover" />
                           ) : (
                             <DriverIcon className="w-8 h-8 text-admin-text-muted" />
                           )}
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Plus className="w-6 h-6 text-white" />
                           </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Legal Full Name</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={driverForm.name || ""}
                          onChange={(e) => setDriverForm({...driverForm, name: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Phone Number</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={driverForm.phone || ""}
                          onChange={(e) => setDriverForm({...driverForm, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">License Reference</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main font-mono uppercase"
                          value={driverForm.licenseNumber || ""}
                          onChange={(e) => setDriverForm({...driverForm, licenseNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Deployment Status</label>
                        <select 
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main appearance-none cursor-pointer"
                          value={driverForm.status}
                          onChange={(e) => setDriverForm({...driverForm, status: e.target.value as any})}
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>On Trip</option>
                        </select>
                    </div>
                  </div>
                  <div className="p-8 border-t border-admin-border flex gap-4 bg-admin-card">
                    <button type="button" onClick={() => { setShowDriverModal(false); setEditingDriver(null); }} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-admin-text-muted hover:text-admin-text-main transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] py-4 bg-admin-sidebar text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-admin-sidebar/20 hover:brightness-110 active:scale-[0.98] transition-all">
                      {editingDriver ? "Apply Changes" : "Confirm Roster Entry"}
                    </button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showServiceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => { setShowServiceModal(false); setEditingService(null); }}
               className="absolute inset-0 bg-admin-sidebar/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="relative w-full max-w-2xl bg-admin-card rounded-[32px] shadow-3xl overflow-hidden border border-admin-border transition-colors duration-300"
             >
                <form onSubmit={handleSaveService}>
                  <div className="p-8 bg-admin-sidebar flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{editingService ? "Edit Service Package" : "Create Service Package"}</h3>
                    <button type="button" onClick={() => { setShowServiceModal(false); setEditingService(null); }} className="text-white/40 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar bg-admin-card">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Service Image</label>
                        <input 
                          type="file" 
                          ref={serviceFileRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'service')}
                        />
                         <div 
                          onClick={() => serviceFileRef.current?.click()}
                          className="w-full h-40 bg-admin-bg rounded-2xl border-2 border-dashed border-admin-border flex flex-col items-center justify-center cursor-pointer hover:bg-admin-bg/80 transition-all overflow-hidden relative"
                        >
                           {isUploading ? (
                             <div className="w-6 h-6 border-2 border-admin-accent border-t-transparent rounded-full animate-spin" />
                           ) : serviceForm.vehicleImage ? (
                             <Image src={serviceForm.vehicleImage} alt="Preview" fill className="object-cover" />
                           ) : (
                             <>
                               <ImageIcon className="w-6 h-6 text-admin-text-muted mb-2" />
                               <span className="text-[8px] font-black uppercase text-admin-text-muted">Click to Upload Vehicle Visual</span>
                             </>
                           )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Category Name</label>
                        <input 
                          type="text" required
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={serviceForm.categoryName || ""}
                          onChange={(e) => setServiceForm({...serviceForm, categoryName: e.target.value})}
                          placeholder="e.g. Standard Car"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">PAX Range</label>
                        <input 
                          type="text"
                          className="w-full p-3.5 bg-admin-bg rounded-xl border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none text-sm text-admin-text-main"
                          value={serviceForm.paxRange || ""}
                          onChange={(e) => setServiceForm({...serviceForm, paxRange: e.target.value})}
                          placeholder="e.g. 01-03 Pax"
                        />
                      </div>
                    </div>

                    {/* Transfers Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase text-admin-text-muted tracking-widest">Transfers Pricing</label>
                      </div>
                      <div className="space-y-3">
                        {serviceForm.transfers?.map((t, idx) => (
                          <div key={idx} className="flex gap-4 items-center">
                            <input 
                              type="text"
                              className="flex-1 p-3 bg-admin-bg rounded-xl border border-admin-border text-sm text-admin-text-main"
                              value={t.type}
                              readOnly
                            />
                            <div className="relative w-40">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-admin-accent">MUR</span>
                              <input 
                                type="number"
                                className="w-full pl-12 pr-4 py-3 bg-admin-bg rounded-xl border border-admin-border text-sm text-admin-text-main"
                                value={t.price}
                                onChange={(e) => {
                                  const newTransfers = [...(serviceForm.transfers || [])];
                                  newTransfers[idx].price = Number(e.target.value);
                                  setServiceForm({...serviceForm, transfers: newTransfers});
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                      <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-1">Coming Soon</p>
                      <p className="text-[10px] text-amber-500/70">Pick & Drop and Excursion package editing will be available in the next update. Using default values for now.</p>
                    </div>
                  </div>
                  <div className="p-8 border-t border-admin-border flex gap-4 bg-admin-card">
                    <button type="button" onClick={() => { setShowServiceModal(false); setEditingService(null); }} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-admin-text-muted hover:text-admin-text-main transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] py-4 bg-admin-sidebar text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-admin-sidebar/20 hover:brightness-110 active:scale-[0.98] transition-all">
                      {editingService ? "Update Services" : "Create New Services"}
                    </button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f633; border-radius: 10px; }
      `}</style>
    </div>
  );
}
