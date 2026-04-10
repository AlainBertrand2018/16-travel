"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center font-sans">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h1 className="text-xl font-bold text-white uppercase tracking-widest">Redirecting to Dashboard...</h1>
        <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Authentication Disabled</p>
      </div>
    </div>
  );
}
