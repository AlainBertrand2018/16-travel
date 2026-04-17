"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, Car, Star, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    { name: "Tours", icon: <Compass className="w-5 h-5" />, href: "/tours" },
    { name: "Activities", icon: <Star className="w-5 h-5" />, href: "/activities" },
    { name: "Transfers", icon: <Car className="w-5 h-5" />, href: "/#transfers" },
];

export function MobileNav() {
    const pathname = usePathname();
    const router = useRouter();

    // Check if we are in admin dashboard or similar where we might NOT want the nav
    if (pathname?.startsWith('/admin')) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-t border-brand-gold/10 flex items-center justify-around px-2 z-[10000] pb-safe md:hidden">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
                // For hash links, check if we are on home and if the hash matches (simplified)
                const isHashActive = item.href.startsWith("/#") && pathname === "/";
                
                return (
                    <button
                        key={item.name}
                        onClick={() => router.push(item.href)}
                        className={cn(
                            "flex flex-col items-center gap-1.5 transition-all duration-300 px-3 py-2 rounded-2xl flex-1",
                            (isActive || isHashActive) ? "text-brand-gold" : "text-brand-bronze/40"
                        )}
                    >
                        <div className={cn(
                            "p-1.5 rounded-xl transition-colors",
                            (isActive || isHashActive) ? "bg-brand-gold/10" : "bg-transparent"
                        )}>
                            {item.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                    </button>
                );
            })}
        </nav>
    );
}
