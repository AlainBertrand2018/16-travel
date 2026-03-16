"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Map, 
  Users, 
  TrendingUp,
  LogOut,
  Calendar,
  Car,
  Sun,
  Moon,
  ChevronRight
} from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const sidebarLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/products", icon: ShoppingBag, label: "Products" },
  { href: "/admin/bookings", icon: Map, label: "Bookings" },
  { href: "/admin/calendar", icon: Calendar, label: "Activity Calendar" },
  { href: "/admin/transport", icon: Car, label: "Transport" },
  { href: "/admin/users", icon: Users, label: "User Management" },
  { href: "/admin/analytics", icon: TrendingUp, label: "Analytics" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }

    // Theme check
    const savedTheme = localStorage.getItem("admin_theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, [user, loading, pathname, router]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("admin_theme", newTheme ? "dark" : "light");
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show loading state while checking auth
  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-admin-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark-theme' : ''} bg-admin-bg`}>
      <div className="flex min-h-screen text-admin-text-main">
        {/* Sidebar */}
        <aside className="w-64 bg-admin-sidebar text-white flex flex-col fixed h-full shadow-2xl z-50 border-r border-admin-border/10">
          <div className="p-8 border-b border-white/5">
            <Link href="/" className="flex flex-col items-center gap-1 group">
              <h1 className="text-2xl font-display font-bold tracking-tight text-white group-hover:text-admin-accent transition-colors">Sixteen</h1>
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/40">Management Console</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "bg-admin-accent text-white shadow-lg shadow-admin-accent/25 px-5" 
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-white/30 group-hover:text-white"}`} />
                    <span className="font-semibold text-xs tracking-wide">{link.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3 h-3 text-white/50" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 bg-black/20">
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 text-white/50 hover:text-white hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-all group"
            >
              <LogOut className="w-4.5 h-4.5 text-white/20 group-hover:text-rose-400" />
              <span className="font-semibold text-xs tracking-wide">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-40 bg-admin-header/80 backdrop-blur-md border-b border-admin-border px-10 py-5 flex justify-between items-center transition-colors">
            <div>
              <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-text-muted mb-1">
                <span>Admin</span>
                <span className="text-admin-text-muted/30">/</span>
                <span className="text-admin-accent">{pathname.split("/").pop() === "admin" ? "Overview" : pathname.split("/").pop()?.replace("-", " ")}</span>
              </nav>
              <h1 className="text-2xl font-bold text-admin-text-main capitalize">
                {pathname === "/admin" ? "Dashboard Overview" : (pathname.split("/").pop() === 'admin' ? "Dashboard Overview" : (pathname.split("/").pop()?.replace("-", " ") + " Management"))}
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text-muted hover:text-admin-accent hover:border-admin-accent transition-all shadow-sm group"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-500 group-hover:-rotate-12 transition-transform" />
                )}
              </button>

              <div className="h-8 w-px bg-admin-border" />

              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-admin-text-main">{profile?.name || user?.displayName || user?.email?.split('@')[0] || "Admin User"}</span>
                <span className="text-[10px] text-admin-accent font-black uppercase tracking-widest">{profile?.role || "System Admin"}</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-admin-accent/10 border border-admin-accent/20 flex items-center justify-center text-admin-accent font-bold shadow-sm uppercase overflow-hidden">
                 {profile?.name?.[0] || user?.email?.[0] || "A"}
              </div>
            </div>
          </header>

          <div className="flex-1 p-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
