import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { addDoc, getDoc, getDocs, updateDoc, collection, doc, deleteDoc } from 'firebase/firestore';

import { db } from '../Firebase/config';

type StudentProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

interface AuthstoreProps {
  loading: boolean;
  students: StudentProps[];
  error: string | null;
  hydrated: boolean;
  setHydrated: () => void;
  createStudent: (student: StudentProps) => Promise<void>;
  updateStudent: (student: StudentProps, id: string) => Promise<void>;
  deleteStudent: (student: StudentProps) => Promise<void>;
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
              state.students.push(docSnap.data() as StudentProps);
              state.loading = false;
            });
          } catch (e: any) {
            console.log(e);
            set((state) => {
              state.error = e.message;
              state.loading = false;
            });
          }
        },
        updateStudent: async (student: StudentProps, id: string) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          try {
            const docRef = doc(db, 'students', id);
            const newData = updateDoc(docRef, student);
            console.log('updated student', newData);
            set((state) => {
              state.loading = false;
            });
          } catch (e: any) {
            console.log(e);
            set((state) => {
              state.error = e.message;
              state.loading = false;
            });
          }
        },
        deleteStudent: async (student: StudentProps) => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          try {
            await deleteDoc(doc(db, 'students', student.id));
            console.log('deleted student', student);
            set((state) => {
              state.loading = false;
              state.students = state.students.filter((s) => s.id !== student.id);
            });
          } catch (e: any) {
            console.log(e);
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
                name: docData.name,
                email: docData.email,
                phone: docData.phone,
                address: docData.address,
              };
            });
            console.log('all students', data);
            set((state) => {
              state.students = data;
              state.loading = false;
            });
          } catch (e: any) {
            console.log(e);
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
