"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Store, MapPin, Phone, Upload, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { storeName, storeAddress, storePhone, storeLogo, setSettings } = useSettingsStore();
  
  const [formData, setFormData] = useState({
    storeName: "",
    storeAddress: "",
    storePhone: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load current settings into form
  useEffect(() => {
    setFormData({ storeName, storeAddress, storePhone });
    setLogoPreview(storeLogo);
  }, [storeName, storeAddress, storePhone, storeLogo]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save
    setTimeout(() => {
      setSettings({
        ...formData,
        storeLogo: logoPreview
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pengaturan Toko</h1>
        <p className="text-slate-500">Sesuaikan identitas toko Anda untuk struk dan laporan</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Upload Section */}
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-400">Logo Toko</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900/50 hover:border-indigo-500 transition-colors">
                {logoPreview ? (
                  <img src={logoPreview} alt="Store Logo" className="w-full h-full object-cover" />
                ) : (
                  <Store className="w-10 h-10 text-slate-300" />
                )}
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold">GANTI LOGO</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </label>
              </div>
              <p className="text-[10px] text-center text-slate-400 uppercase font-medium">PNG, JPG up to 2MB</p>
            </CardContent>
          </Card>

          {/* Form Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-400">Informasi Toko</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Nama Toko</label>
                <Input 
                  value={formData.storeName}
                  onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                  placeholder="Contoh: PrintShop POS"
                  icon={<Store className="w-5 h-5" />}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Alamat Toko</label>
                <Input 
                  value={formData.storeAddress}
                  onChange={(e) => setFormData({...formData, storeAddress: e.target.value})}
                  placeholder="Jl. Raya Utama No. 1..."
                  icon={<MapPin className="w-5 h-5" />}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Nomor Telepon / WhatsApp</label>
                <Input 
                  value={formData.storePhone}
                  onChange={(e) => setFormData({...formData, storePhone: e.target.value})}
                  placeholder="0812-xxxx-xxxx"
                  icon={<Phone className="w-5 h-5" />}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-4">
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-500 font-medium"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Pengaturan berhasil disimpan!</span>
            </motion.div>
          )}
          <Button 
            type="submit" 
            className="w-48" 
            isLoading={isSaving}
          >
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
