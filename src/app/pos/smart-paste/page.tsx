"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/useCartStore";
import { ClipboardPaste, Sparkles, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

// Mock database for matching
const MOCK_PRODUCTS = [
  { id: '1', name: 'Kertas HVS A4 80gr', price: 55000, category: 'ATK' },
  { id: '2', name: 'Pulpen Pilot G2 Black', price: 15000, category: 'ATK' },
  { id: '3', name: 'Print Warna A4', price: 2000, category: 'Percetakan' },
  { id: '4', name: 'Print Hitam Putih A4', price: 500, category: 'Percetakan' },
  { id: '5', name: 'Map Diamond Biru', price: 3500, category: 'ATK' },
];

interface ParsedItem {
  id: string;
  originalText: string;
  matchedProduct: any | null;
  quantity: number;
  status: 'matched' | 'unmatched';
}

export default function SmartPastePage() {
  const [rawText, setRawText] = useState("");
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const [isParsing, setIsParsing] = useState(false);

  const handleParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      const lines = rawText.split('\n').filter(line => line.trim() !== '');
      const results: ParsedItem[] = lines.map((line, index) => {
        // Simple regex to find quantity (e.g., "Product name x2" or "3 Product name")
        const qtyMatch = line.match(/(\d+)\s*x|x\s*(\d+)/i) || line.match(/^(\d+)\s+/);
        const quantity = qtyMatch ? parseInt(qtyMatch[1] || qtyMatch[2]) : 1;
        
        const cleanName = line
          .replace(/(\d+)\s*x|x\s*(\d+)/i, '')
          .replace(/^(\d+)\s+/, '')
          .trim()
          .toLowerCase();

        const match = MOCK_PRODUCTS.find(p => 
          p.name.toLowerCase().includes(cleanName) || 
          cleanName.includes(p.name.toLowerCase())
        );

        return {
          id: `parsed-${index}`,
          originalText: line,
          matchedProduct: match || null,
          quantity: quantity,
          status: match ? 'matched' : 'unmatched'
        };
      });
      
      setParsedItems(results);
      setIsParsing(false);
    }, 800);
  };

  const handleAddToCart = (item: ParsedItem) => {
    if (item.matchedProduct) {
      addItem({
        ...item.matchedProduct,
        quantity: item.quantity
      });
      setParsedItems(prev => prev.filter(p => p.id !== item.id));
    }
  };

  const addAllToCart = () => {
    parsedItems.forEach(item => {
      if (item.matchedProduct) {
        addItem({
          ...item.matchedProduct,
          quantity: item.quantity
        });
      }
    });
    setParsedItems([]);
    setRawText("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <ClipboardPaste className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold">Smart Paste</h1>
        </div>
        <p className="text-slate-500">Tempel daftar pesanan dari WhatsApp atau teks lainnya, dan kami akan otomatis mendeteksi produknya.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-400">Input Teks Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Contoh:&#10;Kertas A4 x2&#10;Pulpen Pilot 5 pcs&#10;3 Map Biru"
                className="flex-1 w-full min-h-[300px] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all font-mono text-sm"
              />
              <Button 
                onClick={handleParse} 
                disabled={!rawText.trim() || isParsing}
                className="w-full h-12 gap-2"
              >
                <Sparkles className={cn("w-5 h-5", isParsing && "animate-pulse")} />
                {isParsing ? "Menganalisis..." : "Proses Pesanan"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-400">Hasil Analisis</CardTitle>
              {parsedItems.some(i => i.status === 'matched') && (
                <Button size="sm" variant="secondary" onClick={addAllToCart} className="text-xs">
                  Tambah Semua ke Cart
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
              <AnimatePresence mode="popLayout">
                {parsedItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                    <Sparkles className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">Belum ada data untuk dianalisis</p>
                  </div>
                ) : (
                  parsedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "p-4 rounded-2xl border transition-all flex items-center justify-between gap-4",
                        item.status === 'matched' 
                          ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20" 
                          : "bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20"
                      )}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {item.status === 'matched' 
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            : <AlertCircle className="w-4 h-4 text-amber-500" />
                          }
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {item.originalText}
                          </span>
                        </div>
                        
                        {item.matchedProduct ? (
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">{item.matchedProduct.name}</p>
                            <p className="text-xs text-indigo-600 font-semibold">
                              {item.quantity} x {formatCurrency(item.matchedProduct.price)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Produk tidak dikenali</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.status === 'matched' ? (
                          <Button 
                            size="sm" 
                            variant="primary" 
                            className="h-10 w-10 p-0 rounded-full"
                            onClick={() => handleAddToCart(item)}
                          >
                            <Plus className="w-5 h-5" />
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="h-10 w-10 p-0 rounded-full text-red-500"
                            onClick={() => setParsedItems(prev => prev.filter(p => p.id !== item.id))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
