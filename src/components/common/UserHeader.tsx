"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Bell, ChevronDown } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";

export const UserHeader = () => {
  const { storeName, storeLogo } = useSettingsStore();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        {storeLogo ? (
          <img src={storeLogo} alt="Logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            {storeName.charAt(0)}
          </div>
        )}
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          {storeName}
        </h1>
      </div>
      
      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
        
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
        </button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

        <button className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
            AD
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold leading-none mb-0.5">Admin User</p>
            <p className="text-[10px] text-slate-500 leading-none">Administrator</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
