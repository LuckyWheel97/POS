"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, LogOut, Settings, ClipboardPaste, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({ href, icon: Icon, label, active, isCollapsed }: { href: string; icon: any; label: string; active: boolean; isCollapsed: boolean }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
        : "text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400",
      isCollapsed && "justify-center px-0"
    )}
  >
    <Icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
    {!isCollapsed && (
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-medium whitespace-nowrap"
      >
        {label}
      </motion.span>
    )}
  </Link>
);

export const Navbar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebarStore();

  const navLinks = [
    { href: "/pos", icon: ShoppingCart, label: "POS Kasir" },
    { href: "/pos/smart-paste", icon: ClipboardPaste, label: "Smart Paste" },
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Produk" },
    { href: "/admin/reports", icon: BarChart3, label: "Laporan" },
    { href: "/admin/users", icon: Users, label: "User" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  if (pathname === "/login") return null;

  return (
    <motion.nav 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="fixed left-0 top-0 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-4 z-50 flex flex-col transition-all duration-300 ease-in-out"
    >
      <div className="space-y-2 flex-1 mt-4">
        {navLinks.map((link) => (
          <NavItem 
            key={link.href} 
            {...link} 
            active={pathname.startsWith(link.href)} 
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
        <button className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full group",
          isCollapsed && "justify-center px-0"
        )}>
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>

        <button 
          onClick={toggle}
          className="flex items-center justify-center w-full h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-all border border-slate-100 dark:border-slate-700"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.nav>
  );
};
