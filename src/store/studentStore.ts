import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { addDoc, getDoc, getDocs, updateDoc, collection, doc, deleteDoc } from 'firebase/firestore';

import { db } from '../Firebase/config';

export interface StudentProps {
  id?: string; // Firebase document ID, optional because it might not exist before creation
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  roll: string;
  school: string;
  gender: string;
  status: string;
  grade: string;
  address: string;
  date: Date | null; // Nullable for optional input
}

interface AuthstoreProps {
  loading: boolean;
  students: StudentProps[];
  error: string | null;
  hydrated: boolean;
  setHydrated: () => void;
  createStudent: (student: StudentProps) => Promise<void>;
  updateStudent: (student: Partial<StudentProps>, id: string) => Promise<void>; // Partial for selective updates
  deleteStudent: (id: string) => Promise<void>; // Simplified to only require `id`
  getAllStudents: () => Promise<void>;
}

const useStudentStore = create<AuthstoreProps>()(
    devtools(
        persist(
            immer((set) => ({
              loading: true,
              error: null,
              hydrated: false,
              students: [],
              setHydrated: () => {
                set({
                  hydrated: true,
                });
              },
              createStudent: async (student: StudentProps) => {
                set((state) => {
                  state.loading = true;
                  state.error = null;
                });
                try {
                  const docRef = await addDoc(collection(db, 'students'), student);
                  const docSnap = await getDoc(docRef);

                  set((state) => {
                    state.students.push({
                      ...(docSnap.data() as StudentProps),
                      id: docSnap.id,
                    });
                    state.loading = false;
                  });
                } catch (e: any) {
                  set((state) => {
                    state.error = e.message;
                    state.loading = false;
                  });
                }
              },
              updateStudent: async (student: Partial<StudentProps>, id: string) => {
                set((state) => {
                  state.loading = true;
                  state.error = null;
                });
                try {
                  const docRef = doc(db, 'students', id);
                  await updateDoc(docRef, student);

                  set((state) => {
                    const index = state.students.findIndex((s) => s.id === id);
                    if (index !== -1) {
                      state.students[index] = { ...state.students[index], ...student };
                    }
                    state.loading = false;
                  });
                } catch (e: any) {
                  set((state) => {
                    state.error = e.message;
                    state.loading = false;
                  });
                }
              },
              deleteStudent: async (id: string) => {
                set((state) => {
                  state.loading = true;
                  state.error = null;
                });
                try {
                  await deleteDoc(doc(db, 'students', id));
                  set((state) => {
                    state.students = state.students.filter((s) => s.id !== id);
                    state.loading = false;
                  });
                } catch (e: any) {
                  set((state) => {
                    state.error = e.message;
                    state.loading = false;
                  });
                }
              },
              getAllStudents: async () => {
                set({
                  loading: true,
                  error: null,
                });
                try {
                  const collectionRef = collection(db, 'students');
                  const dataSnap = await getDocs(collectionRef);

                  const data: StudentProps[] = dataSnap.docs.map((document) => {
                    const docData = document.data();
                    return {
                      id: document.id,
                      ...docData,
                    } as StudentProps;
                  });

                  set((state) => {
                    state.students = data;
                    state.loading = false;
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
              name: 'student-store',
              onRehydrateStorage: () => (state) => {
                state?.setHydrated();
              },
              storage: createJSONStorage(() => localStorage),
            }
        )
    )
);

export default useStudentStore;
