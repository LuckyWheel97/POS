"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendingUp, ShoppingBag, Users, DollarSign, Package, Printer } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
      <div className={cn("p-2 rounded-lg bg-opacity-10", color)}>
        <Icon className={cn("w-5 h-5", color.replace('bg-', 'text-'))} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={cn("text-xs mt-1 font-medium", trend.startsWith('+') ? "text-emerald-500" : "text-red-500")}>
        {trend} <span className="text-slate-400 font-normal ml-1">vs bulan lalu</span>
      </p>
    </CardContent>
  </Card>
);

import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const stats = [
    { title: "Total Penjualan", value: formatCurrency(12500000), icon: DollarSign, trend: "+12.5%", color: "bg-indigo-500" },
    { title: "Transaksi", value: "142", icon: ShoppingBag, trend: "+5.2%", color: "bg-violet-500" },
    { title: "Produk Terjual", value: "856", icon: Package, trend: "+18.1%", color: "bg-pink-500" },
    { title: "Order Percetakan", value: "45", icon: Printer, trend: "-2.4%", color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-slate-500">Pantau performa bisnis Anda secara real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Grafik Penjualan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-400">Chart Penjualan akan muncul di sini</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Customer #{1024 + i}</p>
                    <p className="text-xs text-slate-500">2 menit yang lalu</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">{formatCurrency(75000 + i * 5000)}</p>
                  <p className="text-xs text-slate-400">Tunai</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
