import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from './config';

export const signUp = async (email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    return userCredentials.user;
  } catch (e) {
    throw e.message;
  }
};
export const logIn = async (email: string, password: string) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentials.user;
  } catch (e) {
    throw e.message;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw e.message;
  }
};
