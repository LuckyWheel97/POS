"use client";

import { useSidebarStore } from "@/store/useSidebarStore";
import { motion } from "framer-motion";
import { UserHeader } from "./UserHeader";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebarStore();

  return (
    <motion.main 
      initial={false}
      animate={{ paddingLeft: isCollapsed ? 80 : 256 }}
      className="min-h-screen transition-all duration-300 ease-in-out"
    >
      <div className="p-8 max-w-[1600px] mx-auto">
        <UserHeader />
        {children}
      </div>
    </motion.main>
  );
};
