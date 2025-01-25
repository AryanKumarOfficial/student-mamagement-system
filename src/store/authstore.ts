import type { User } from 'firebase/auth';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import {
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../Firebase/config';

interface AuthstoreProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  authenticated: boolean;
  hydrated: boolean;
  setHydrated: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthstoreProps>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        loading: true,
        error: null,
        authenticated: false,
        setUser: (user: User | null) =>
          set((state) => {
            state.user = user;
          }),
        setLoading: (loading) =>
          set((state) => {
            state.loading = loading;
          }),
        hydrated: false,
        setHydrated: () => {
          set({
            hydrated: true,
          });
        },
        login: async (email: string, password: string) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            set((state) => {
              state.user = userCredentials.user;
              if (userCredentials.user) {
                state.authenticated = true;
              }
              state.loading = false;
            });
          } catch (e: any) {
            set((state) => {
              state.error = e.message;
              state.loading = false;
              state.authenticated = false;
            });
          }
        },
        logout: async () => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          try {
            await signOut(auth);
            set((state) => {
              state.user = null;
              state.loading = false;
              state.authenticated = false;
            });
          } catch (e: any) {
            set((state) => {
              state.error = e.message;
              state.loading = false;
            });
          }
        },
        signUp: async (email: string, password: string, name: string) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredentials.user, {
              displayName: name,
            });
            set((state) => {
              state.user = userCredentials.user;
              state.loading = false;
              state.authenticated = true;
            });
          } catch (e: any) {
            set((state) => {
              state.error = e.message;
              state.loading = false;
            });
          }
        },
      })),
      {
        name: 'auth-store',
        onRehydrateStorage: () => (state) => {
          state?.setHydrated();
        },
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
onAuthStateChanged(auth, (user) => {
  console.log('auth state changed', user);
  const { setUser, setLoading } = useAuthStore.getState();
  setUser(user);
  setLoading(false);
});

export default useAuthStore;
