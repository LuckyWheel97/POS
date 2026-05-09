"use client";

import React from "react";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

export const ProductCard = ({ product }: { product: any }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card 
      className="overflow-hidden group cursor-pointer active:scale-95 transition-all"
      onClick={() => addItem({ ...product, quantity: 1 })}
    >
      <div className="h-32 bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-4xl">{product.category === 'ATK' ? '📦' : '🖨️'}</span>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">{product.name}</h4>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(product.price)}
          </span>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
