"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Image as ImageIcon,
  Check,
  X,
  Tag,
  Box,
  Wind,
  Plane,
  Anchor,
  Clock
} from "lucide-react";
import { Product } from "@/lib/mockData";
import { dbService, storageService } from "@/lib/db";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ProductsManagement() {
  const [activeTab, setActiveTab] = useState<"All" | "Transfer" | "Outing Package" | "Activity">("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    category: "Activity",
    price: 0,
    image: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<{ type: "main" | "itinerary"; index?: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = dbService.subscribeToCollection("products", setProducts);
    return () => unsub();
  }, []);

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  const handleDelete = async (id: string) => {
    if (confirm("Verify disposal of product entry?")) {
      await dbService.deleteItem("products", id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await dbService.updateItem("products", isEditing.id, productForm);
    } else {
      await dbService.addItem("products", productForm);
    }
    setShowAddModal(false);
    setIsEditing(null);
    setProductForm({ 
      category: "Activity", 
      price: 0, 
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2070",
      duration: "",
      itineraryImages: [] 
    });
  };

  const openEditModal = (product: Product) => {
    setIsEditing(product);
    setProductForm(product);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingSlot) return;

    try {
      setIsUploading(true);
      const path = `products/${Date.now()}_${file.name}`;
      const url = await storageService.uploadFile(path, file);
      
      if (uploadingSlot.type === "main") {
        setProductForm(prev => ({ ...prev, image: url }));
      } else if (uploadingSlot.type === "itinerary" && typeof uploadingSlot.index === "number") {
        const slotIdx = uploadingSlot.index;
        setProductForm(prev => {
          const currentItinerary = prev.itineraryImages || ["", "", "", "", ""];
          const newItinerary = [...currentItinerary];
          // Ensure we have 5 slots
          while (newItinerary.length < 5) newItinerary.push("");
          newItinerary[slotIdx] = url;
          return { ...prev, itineraryImages: newItinerary };
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      setUploadingSlot(null);
      if (e.target) e.target.value = "";
    }
  };

  return (
    <div className="space-y-8 pb-10 transition-colors duration-300">
      {/* Search & Tabs */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-admin-card p-6 rounded-[32px] border border-admin-border shadow-sm">
        <div className="flex bg-admin-bg p-1.5 rounded-xl border border-admin-border gap-1">
          {(["All", "Transfer", "Outing Package", "Activity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? "bg-admin-accent text-white shadow-md shadow-admin-accent/20" 
                  : "text-admin-text-muted hover:text-admin-text-main"
              }`}
            >
              {tab === "Transfer" ? "Transfers" : tab === "Outing Package" ? "Outings" : tab === "Activity" ? "Activities" : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-admin-text-muted" />
            <input 
              type="text" 
              placeholder="Inventory lookup..."
              className="w-full pl-11 pr-4 py-3 bg-admin-bg rounded-xl text-xs border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none transition-all placeholder:text-admin-text-muted/50"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-admin-sidebar text-white rounded-xl shadow-lg shadow-admin-sidebar/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-admin-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest">Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-admin-card rounded-[32px] shadow-sm border border-admin-border overflow-hidden group hover:border-admin-accent/30 transition-all flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-admin-sidebar/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button 
                    onClick={() => openEditModal(product)}
                    className="p-2.5 bg-admin-card/90 backdrop-blur-md text-admin-text-main rounded-xl shadow-lg border border-admin-border hover:bg-admin-accent hover:text-white transition-all"
                   >
                     <Edit3 className="w-3.5 h-3.5" />
                   </button>
                   <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-2.5 bg-rose-500/10 backdrop-blur-md text-rose-500 rounded-xl shadow-lg border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                   >
                     <Trash2 className="w-3.5 h-3.5" />
                   </button>
                </div>
                 <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className={`px-2.5 py-1 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg flex items-center gap-1.5 ${
                    product.category === 'Transfer' ? 'bg-blue-600' :
                    product.category === 'Outing Package' ? 'bg-amber-600' :
                    'bg-purple-600'
                  }`}>
                    {product.category === 'Activity' && <Wind className="w-2.5 h-2.5" />}
                    {product.category === 'Transfer' && <Plane className="w-2.5 h-2.5" />}
                    {product.category === 'Outing Package' && <Anchor className="w-2.5 h-2.5" />}
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-admin-text-main mb-1">{product.name}</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Tag className="w-3 h-3 text-admin-accent" />
                            <p className="text-[9px] uppercase tracking-widest font-black text-admin-text-muted">{product.subcategory || "General"}</p>
                        </div>
                        {product.duration && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3 text-admin-accent" />
                                <p className="text-[9px] uppercase tracking-widest font-black text-admin-text-muted">{product.duration} HRS</p>
                            </div>
                        )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-admin-text-muted uppercase mb-0.5 font-mono">VALUATION</p>
                    <span className="text-lg font-black text-admin-text-main">€{product.price}</span>
                  </div>
                </div>
                
                <p className="text-[11px] text-admin-text-muted/80 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                  {product.description || "No operational technical specs provided."}
                </p>

                <div className="mt-6 pt-5 border-t border-admin-border flex justify-between items-center text-[9px] font-black uppercase text-admin-text-muted">
                   <div className="flex items-center gap-2">
                      <Box className="w-3 h-3 text-admin-accent" />
                      <span>REF: {product.id}</span>
                   </div>
                   <div className={`px-2 py-0.5 rounded text-[7px] border ${
                     product.category === 'Transfer' ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' :
                     product.category === 'Outing Package' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' :
                     'border-purple-500/20 text-purple-500 bg-purple-500/5'
                   }`}>
                      {product.category === 'Activity' ? 'ADVENTURE READY' : 'ACTIVE LISTING'}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || isEditing) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowAddModal(false); setIsEditing(null); }}
              className="absolute inset-0 bg-admin-sidebar/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-2xl bg-admin-card rounded-[32px] shadow-3xl overflow-hidden border border-admin-border"
            >
              <div className="p-8 bg-admin-sidebar border-b border-white/5 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                        {isEditing ? "Modify Inventory" : "Asset Onboarding"}
                    </h2>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-admin-accent mt-1">Registry Update</p>
                  </div>
                  <button 
                    onClick={() => { setShowAddModal(false); setIsEditing(null); }}
                    className="p-2.5 bg-white/5 rounded-xl text-white/40 hover:text-white transition-all shadow-inner"
                  >
                    <X className="w-5 h-5" />
                  </button>
              </div>

              <div className="p-8 space-y-6 bg-admin-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Asset Label</label>
                      <input 
                        type="text" 
                        className="form-input-admin" 
                        placeholder="Ex: Sunset Cruise" 
                        value={productForm.name || ""}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Classification</label>
                      <select 
                        className="form-input-admin h-[46px] py-0"
                        value={productForm.category || "Activity"}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                      >
                        <option value="Activity">Activity</option>
                        <option value="Outing Package">Outing Package</option>
                        <option value="Transfer">Transfer</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Duration (Hrs)</label>
                      <input 
                        type="text" 
                        className="form-input-admin" 
                        placeholder="Ex: 4" 
                        value={productForm.duration || ""}
                        onChange={(e) => setProductForm({ ...productForm, duration: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Valuation (€)</label>
                        <input 
                          type="text" 
                          className="form-input-admin font-mono" 
                          placeholder="0.00" 
                          value={productForm.price || ""}
                          onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Subclassification</label>
                        <input 
                          type="text" 
                          className="form-input-admin" 
                          placeholder="Ex: Water Sports" 
                          value={productForm.subcategory || ""}
                          onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                     <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                     />
                     <div 
                         onClick={() => {
                           setUploadingSlot({ type: "main" });
                           fileInputRef.current?.click();
                         }}
                         className={`aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center group cursor-pointer transition-all overflow-hidden ${
                           productForm.image 
                             ? "border-admin-accent bg-admin-bg" 
                             : "border-admin-border bg-admin-bg hover:bg-admin-bg/80"
                         }`}
                      >
                        {isUploading && uploadingSlot?.type === "main" ? (
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-2 border-admin-accent border-t-transparent rounded-full animate-spin mb-2" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-admin-accent">Processing...</span>
                          </div>
                        ) : productForm.image ? (
                          <Image src={productForm.image} alt="Preview" fill className="object-cover" />
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 mb-2 opacity-20 group-hover:scale-110 transition-transform text-admin-text-muted" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-admin-text-muted">Main Visual</span>
                          </>
                        )}
                      </div>

                      {/* Itinerary Images Grid for Outing Packages */}
                      {productForm.category === "Outing Package" && (
                        <div className="space-y-2 text-left">
                          <label className="block text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Expedition Itinerary (5 Slots)</label>
                          <div className="grid grid-cols-5 gap-2">
                            {[0, 1, 2, 3, 4].map((idx) => (
                              <div 
                                key={idx}
                                onClick={() => {
                                  setUploadingSlot({ type: "itinerary", index: idx });
                                  fileInputRef.current?.click();
                                }}
                                className={`aspect-square rounded-lg border border-dashed flex items-center justify-center cursor-pointer hover:bg-admin-bg transition-all overflow-hidden ${
                                  productForm.itineraryImages?.[idx] 
                                    ? "border-admin-accent/50 bg-admin-bg" 
                                    : "border-admin-border bg-admin-bg/50"
                                }`}
                              >
                                {isUploading && uploadingSlot?.type === "itinerary" && uploadingSlot?.index === idx ? (
                                  <div className="w-3 h-3 border border-admin-accent border-t-transparent rounded-full animate-spin" />
                                ) : productForm.itineraryImages?.[idx] ? (
                                  <Image src={productForm.itineraryImages[idx]} alt="Itinerary" fill className="object-cover" />
                                ) : (
                                  <Plus className="w-3 h-3 text-admin-text-muted opacity-40" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                     <div className="space-y-1.5">
                        <label className="block text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Technical Specs</label>
                        <textarea 
                          rows={3} 
                          className="form-input-admin resize-none" 
                          placeholder="Detailed product description..." 
                          value={productForm.description || ""}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        />
                     </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3 border-t border-admin-border">
                   <button 
                    onClick={() => { setShowAddModal(false); setIsEditing(null); }}
                    className="flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-admin-border text-admin-text-muted hover:text-admin-text-main hover:bg-admin-bg transition-all"
                   >
                     Hold as Draft
                   </button>
                   <button 
                    onClick={handleSave}
                    className="flex-[2] py-4 bg-admin-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-admin-accent/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     <Check className="w-3.5 h-3.5" />
                     {isEditing ? "Commit Updates" : "Commit to Inventory"}
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .form-input-admin {
          width: 100%;
          padding: 0.75rem 1rem;
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
      `}</style>
    </div>
  );
}
