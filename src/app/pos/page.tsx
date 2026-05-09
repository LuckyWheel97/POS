import React, { useState, useEffect } from "react";
import { ProductCard } from "@/components/pos/ProductCard";
import { Cart } from "@/components/pos/Cart";
import { Input } from "@/components/ui/Input";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function POSPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", ...new Set(products.map(p => p.category))];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex gap-8 h-[calc(100vh-100px)]">
      {/* Products Side */}
      <div className="flex-1 flex flex-col gap-6">
        <header className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">POS Kasir</h1>
            <p className="text-slate-500">Kelola transaksi penjualan dengan cepat</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Cari produk atau jasa..." 
                icon={<Search className="w-5 h-5" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                    activeCategory === cat 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-slate-500 hover:text-indigo-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
              <p>Memuat produk...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl font-medium">Produk tidak ditemukan</p>
                  <p>Coba kata kunci lain atau filter yang berbeda</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Cart Side */}
      <div className="w-[400px]">
        <Card className="h-full p-6 flex flex-col shadow-2xl border-indigo-100 dark:border-indigo-900/20">
          <Cart />
        </Card>
      </div>
    </div>
  );
}
