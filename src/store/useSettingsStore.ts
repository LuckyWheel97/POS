import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeLogo: string | null;
  setSettings: (settings: Partial<Omit<SettingsStore, 'setSettings'>>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      storeName: 'PrintShop POS',
      storeAddress: 'Jl. Contoh No. 123, Kota Baru',
      storePhone: '0812-3456-7890',
      storeLogo: null,
      setSettings: (settings) => set((state) => ({ ...state, ...settings })),
    }),
    {
      name: 'pos-settings',
    }
  )
);
