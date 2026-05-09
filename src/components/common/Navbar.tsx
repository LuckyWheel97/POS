"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NavItem = ({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
        : "text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
    <span className="font-medium">{label}</span>
  </Link>
);

export const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/pos", icon: ShoppingCart, label: "POS Kasir" },
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Produk" },
    { href: "/admin/reports", icon: BarChart3, label: "Laporan" },
    { href: "/admin/users", icon: Users, label: "User" },
  ];

  if (pathname === "/login") return null;

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-6 z-50 flex flex-col">
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          PrintShop POS
        </h1>
      </div>

      <div className="space-y-2 flex-1">
        {navLinks.map((link) => (
          <NavItem 
            key={link.href} 
            {...link} 
            active={pathname.startsWith(link.href)} 
          />
        ))}
      </div>

      <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6">
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
};
