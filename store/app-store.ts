import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {}

export const useAppStore = create<AppStore>()(
  persist((set) => ({}), {
    name: "proc360-app-storage",
    storage: createJSONStorage(() => localStorage),
  }),
);
