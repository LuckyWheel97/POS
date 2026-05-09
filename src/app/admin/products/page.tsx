"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Search, MoreVertical, Edit, Trash, Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const MOCK_PRODUCTS = [
  { id: '1', name: 'Kertas HVS A4 80gr', price: 55000, category: 'ATK', stock: 24, unit: 'pcs' },
  { id: '2', name: 'Pulpen Pilot G2 Black', price: 15000, category: 'ATK', stock: 120, unit: 'pcs' },
  { id: '3', name: 'Print Warna A4', price: 2000, category: 'Percetakan', stock: 0, unit: 'lembar' },
  { id: '4', name: 'Print Hitam Putih A4', price: 500, category: 'Percetakan', stock: 0, unit: 'lembar' },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manajemen Produk</h1>
          <p className="text-slate-500">Kelola inventaris ATK dan layanan percetakan</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-5 h-5" />
          Tambah Produk
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-4">
            <div className="flex-1 max-w-sm">
              <Input 
                placeholder="Cari produk..." 
                icon={<Search className="w-5 h-5" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 font-semibold text-sm">Produk</th>
                  <th className="px-6 py-4 font-semibold text-sm">Kategori</th>
                  <th className="px-6 py-4 font-semibold text-sm">Harga</th>
                  <th className="px-6 py-4 font-semibold text-sm">Stok</th>
                  <th className="px-6 py-4 font-semibold text-sm">Unit</th>
                  <th className="px-6 py-4 font-semibold text-sm text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PRODUCTS.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                          <Package className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-indigo-600">{formatCurrency(p.price)}</td>
                    <td className="px-6 py-4">
                      <span className={p.stock < 10 && p.category === 'ATK' ? "text-red-500 font-bold" : ""}>
                        {p.category === 'ATK' ? p.stock : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{p.unit}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 text-red-500 hover:bg-red-50">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
