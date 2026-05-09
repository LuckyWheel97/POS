"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/pos");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 z-[100]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">
            PrintShop POS
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Silakan masuk untuk melanjutkan transaksi</p>
        </div>

        <Card className="p-4 shadow-2xl border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Email</label>
                <Input 
                  type="email" 
                  placeholder="admin@printshop.com" 
                  icon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  icon={<Lock className="w-5 h-5" />}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg gap-2" 
                isLoading={isLoading}
              >
                {!isLoading && <LogIn className="w-5 h-5" />}
                Masuk ke Sistem
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-500">
                Lupa password? <a href="#" className="text-indigo-600 font-medium hover:underline">Hubungi Owner</a>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Secure Terminal Access
        </p>
      </div>
    </div>
  );
}
