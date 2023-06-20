import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp({
  apiKey: "AIzaSyCg7ua_aEo8f89npGAkIIihochVCYgI7OY",
  authDomain: "tennisfinder-development.firebaseapp.com",
  projectId: "tennisfinder-development",
  storageBucket: "tennisfinder-development.appspot.com",
  messagingSenderId: "49267179758",
  appId: "1:49267179758:web:7a744f3f5d0497b4b333ff"
})

const auth = getAuth(app);
export { auth, createUserWithEmailAndPassword };
export default app;

