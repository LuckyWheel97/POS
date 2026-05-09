"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus, Trash2, ShoppingBag, Banknote, Clock, Wallet, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();
  const [paymentStatus, setPaymentStatus] = React.useState<'Lunas' | 'DP' | 'Hutang'>('Lunas');
  const [paymentMethod, setPaymentMethod] = React.useState<'Cash' | 'Transfer'>('Cash');
  const [dpAmount, setDpAmount] = React.useState<number>(0);

  const statusOptions = [
    { id: 'Lunas', label: 'Lunas', icon: Banknote, color: 'text-emerald-500' },
    { id: 'DP', label: 'DP', icon: Clock, color: 'text-amber-500' },
    { id: 'Hutang', label: 'Hutang', icon: Wallet, color: 'text-red-500' },
  ];

  const methodOptions = [
    { id: 'Cash', label: 'Tunai / Cash', icon: Banknote },
    { id: 'Transfer', label: 'Transfer Bank', icon: CreditCard },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold">Keranjang</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-slate-400 hover:text-red-500">
          Clear
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-slate-400">Keranjang masih kosong</p>
            </motion.div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-indigo-600 font-bold">{formatCurrency(item.price)}</p>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded-lg p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
        {/* Payment Status Toggle */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Status Pembayaran</label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-50 dark:bg-slate-900 rounded-xl">
            {statusOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentStatus(opt.id as any)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 rounded-lg transition-all",
                  paymentStatus === opt.id 
                    ? "bg-white dark:bg-slate-800 shadow-md scale-105" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )}
              >
                <opt.icon className={cn("w-4 h-4", paymentStatus === opt.id ? opt.color : "")} />
                <span className="text-[10px] font-bold">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Payment Method Toggle */}
        <AnimatePresence>
          {paymentStatus !== 'Hutang' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-3"
            >
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Metode Pembayaran</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 dark:bg-slate-900 rounded-xl">
                {methodOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id as any)}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all",
                      paymentMethod === opt.id 
                        ? "bg-white dark:bg-slate-800 shadow-md scale-105" 
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    )}
                  >
                    <opt.icon className={cn("w-4 h-4", paymentMethod === opt.id ? "text-indigo-600" : "")} />
                    <span className="text-[10px] font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DP Amount Input */}
        <AnimatePresence>
          {paymentStatus === 'DP' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 py-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Jumlah DP</label>
                <Input 
                  type="number"
                  placeholder="Masukkan jumlah DP..."
                  icon={<Banknote className="w-4 h-4" />}
                  value={dpAmount || ''}
                  onChange={(e) => setDpAmount(Number(e.target.value))}
                  className="h-10"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2 py-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-medium">{formatCurrency(getTotal())}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-indigo-600">{formatCurrency(getTotal())}</span>
          </div>
          {paymentStatus === 'DP' && (
            <div className="flex justify-between items-center text-sm text-red-500 font-medium">
              <span>Sisa Tagihan</span>
              <span>{formatCurrency(getTotal() - dpAmount)}</span>
            </div>
          )}
        </div>
        
        <Button className="w-full h-14 text-lg" disabled={items.length === 0}>
          {paymentStatus === 'Hutang' ? 'Simpan sebagai Hutang' : 'Bayar Sekarang'}
        </Button>
      </div>
    </div>
  );
};
