"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0 rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-slate-600" />
      ) : (
        <Sun className="w-5 h-5 text-amber-400" />
      )}
    </Button>
  );
};
