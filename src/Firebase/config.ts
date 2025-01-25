import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBtQW7ythc2BMNIRdx4MLpzLKwMKhhcLhc',
  authDomain: 'assignment-27181.firebaseapp.com',
  projectId: 'assignment-27181',
  storageBucket: 'assignment-27181.firebasestorage.app',
  messagingSenderId: '732329368934',
  appId: '1:732329368934:web:6e2d04e805d4612c7bbca7',
  measurementId: 'G-XJJV56WWTD',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
