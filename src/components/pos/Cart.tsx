"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();

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
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-medium">{formatCurrency(getTotal())}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Pajak (0%)</span>
          <span className="font-medium">{formatCurrency(0)}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span className="text-indigo-600">{formatCurrency(getTotal())}</span>
        </div>
        
        <Button className="w-full h-14 text-lg" disabled={items.length === 0}>
          Bayar Sekarang
        </Button>
      </div>
    </div>
  );
};
