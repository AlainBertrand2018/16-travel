"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      alert(error.message || "Invalid credentials. Access Denied.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic Security Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full -mr-[400px] -mt-[400px] blur-[120px] animae-pulse" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full -ml-[400px] -mb-[400px] blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Terminal Header Decoration */}
        <div className="bg-[#0f172a] rounded-t-[32px] border-x border-t border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">
                <ShieldCheck className="w-3 h-3 text-blue-500" />
                Secure Protocol v2.4
            </div>
        </div>

        <div className="bg-[#1e293b]/50 backdrop-blur-3xl rounded-b-[32px] shadow-2xl p-10 md:p-12 border-x border-b border-white/10 ring-1 ring-white/5">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Terminal className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Sixteen <span className="text-blue-500">Admin</span></h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">Authorized Personnel Pipeline</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/60 ml-0.5">Vector Identity</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-[#0f172a]/80 rounded-[18px] border border-white/5 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 text-white text-sm font-bold transition-all placeholder:text-white/10"
                  placeholder="staff@sixteen-travel.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/60 ml-0.5">Security Cipher</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-[#0f172a]/80 rounded-[18px] border border-white/5 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 text-white text-sm font-bold transition-all placeholder:text-white/10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-10 border border-white/10 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Establish Session <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 flex items-center justify-center gap-4 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="h-px bg-white/20 flex-1" />
             <div className="text-[8px] font-black text-white uppercase tracking-[0.5em]">ISO 27001 SECURE</div>
             <div className="h-px bg-white/20 flex-1" />
          </div>
        </div>
        
        <p className="text-center mt-8 text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">
            © 2026 Sixteen Travel Group • Registry v2.9.0
        </p>
      </motion.div>
    </div>
  );
}
