"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  UserPlus, 
  Mail, 
  Shield, 
  Edit3, 
  Trash2, 
  Check,
  X,
  BadgeCheck,
  Lock,
  Key
} from "lucide-react";
import { User as UserType } from "@/lib/mockData";
import { dbService } from "@/lib/db";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<Partial<UserType>>({
    role: "sales",
    status: "active"
  });

  useEffect(() => {
    const unsub = dbService.subscribeToCollection("users", setUsers);
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (currentUser?.uid === id) {
      alert("Security Violation: You cannot terminate your own active session.");
      return;
    }

    if (confirm("Revoke credentials and terminate access for this user?")) {
      try {
        setIsDeleting(id);
        await dbService.deleteItem("users", id);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Termination failed. System registry may be locked.");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await dbService.updateItem("users", editingUser.id, userForm);
    } else {
      await dbService.addItem("users", userForm);
    }
    setShowAddModal(false);
    setEditingUser(null);
    setUserForm({ role: "sales", status: "active" });
  };

  const openEditModal = (user: UserType) => {
    setEditingUser(user);
    setUserForm(user);
  };

  return (
    <div className="space-y-8 pb-10 transition-colors duration-300">
      {/* Header Actions */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-admin-card p-6 rounded-[32px] border border-admin-border shadow-sm">
        <div className="relative w-full xl:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-text-muted" />
          <input 
            type="text" 
            placeholder="Registry lookup (UID, Email, Role)..."
            className="w-full pl-11 pr-4 py-3 bg-admin-bg rounded-xl text-xs border border-admin-border focus:ring-2 focus:ring-admin-accent/20 outline-none transition-all placeholder:text-admin-text-muted/50 font-medium"
          />
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-admin-sidebar text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-admin-sidebar/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3 border border-white/5"
        >
          <UserPlus className="w-4 h-4 text-admin-accent" />
          Onboard Personnel
        </button>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-admin-card rounded-[32px] p-8 shadow-sm border border-admin-border group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-admin-accent/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-admin-accent/10 transition-colors" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-admin-bg border border-admin-border shadow-inner flex items-center justify-center text-admin-accent text-xl font-black uppercase">
                    {user.name[0]}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(user)}
                      className="p-3 bg-admin-bg text-admin-text-muted rounded-xl hover:text-admin-accent border border-admin-border transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      disabled={isDeleting === user.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isDeleting === user.id 
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" 
                          : "bg-rose-500/10 text-rose-500 border-rose-500/10 hover:bg-rose-500 hover:text-white"
                      }`}
                    >
                      <Trash2 className={`w-3.5 h-3.5 ${isDeleting === user.id ? "animate-pulse" : ""}`} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-admin-text-main mb-1">{user.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-admin-text-muted">
                      <Mail className="w-3 h-3 text-admin-accent" />
                      {user.email}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-admin-border flex justify-between items-center">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      user.role === "super-admin" ? "bg-admin-sidebar text-white" :
                      user.role === "sales" ? "bg-emerald-500/10 text-emerald-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {user.role === "super-admin" ? <Shield className="w-3 h-3 text-admin-accent" /> : <BadgeCheck className="w-3 h-3 text-admin-accent" />}
                      {user.role}
                    </span>
                    <span className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       Verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingUser) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowAddModal(false); setEditingUser(null); }}
              className="absolute inset-0 bg-admin-sidebar/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-xl bg-admin-card rounded-[32px] shadow-3xl overflow-hidden border border-admin-border"
            >
               <div className="p-8 bg-admin-sidebar border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-admin-accent/20 flex items-center justify-center text-admin-accent">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                        {editingUser ? "Access Modification" : "Security Credentialing"}
                        </h2>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-admin-accent mt-0.5">Vector: Internal Staff</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setShowAddModal(false); setEditingUser(null); }}
                    className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white transition-all shadow-inner"
                  >
                    <X className="w-5 h-5" />
                  </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Personnel Full Identity</label>
                    <input 
                      type="text" 
                      className="form-input-admin" 
                      value={userForm.name || ""}
                      onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                      placeholder="Ex: Alain Bertrand" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">Electronic Dispatch URI</label>
                    <input 
                      type="email" 
                      className="form-input-admin" 
                      value={userForm.email || ""}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      placeholder="staff@sixteen-travel.com" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-admin-text-muted ml-0.5">System Privilege Level</label>
                    <div className="relative">
                        <select 
                        className="form-input-admin h-[46px] py-0 appearance-none pr-10"
                        value={userForm.role || "sales"}
                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                        >
                            <option value="sales">Tier 3: Sales & Manifests</option>
                            <option value="marketing">Tier 2: Assets & Content</option>
                            <option value="super-admin">Tier 1: Root System Administrator</option>
                        </select>
                        <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-admin-text-muted pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex gap-3 border-t border-admin-border">
                   <button 
                    className="flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-admin-border text-admin-text-muted hover:text-admin-accent hover:bg-admin-bg transition-all"
                    onClick={() => { setShowAddModal(false); setEditingUser(null); }}
                   >
                     Abort Op
                   </button>
                   <button 
                    className="flex-[2] py-4 bg-admin-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-admin-accent/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                    onClick={handleSave}
                   >
                     <Check className="w-3.5 h-3.5" />
                     {editingUser ? "Push Updates" : "Issue Credentials"}
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
