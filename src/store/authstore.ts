import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware/devtools';
import type { User} from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { createJSONStorage, persist } from 'zustand/middleware/persist';
import {auth} from "../Firebase/config";

interface AuthstoreProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  hydrated: boolean;
  setHydrated: () => void;
}

const useAuthStore = create<AuthstoreProps>()(
  devtools(
    persist(
      immer((set, get) => ({
        user: null,
        loading: true,
        setUser: (user: User | null) => set({ user }),
        setLoading: (loading) => set({ loading }),
        hydrated: false,
        setHydrated: () => {
          set({
            hydrated: true,
          });
        },
      })),
      {
        name: 'auth-store',
        onRehydrateStorage: () => {
          return (state) => {
            state?.setHydrated();
          };
        },
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

onAuthStateChanged(auth,(user)=>{
    const store = useAuthStore().get
})