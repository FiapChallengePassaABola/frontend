import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuiO5_CTxlV1QLy_8Iz01p7hImqX5uNgs",
  authDomain: "passabola1espi.firebaseapp.com",
  projectId: "passabola1espi",
  storageBucket: "passabola1espi.firebasestorage.app",
  messagingSenderId: "509252638601",
  appId: "1:509252638601:web:e04821f523ae505c6fb358",
  measurementId: "G-P3SDNS67F0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
