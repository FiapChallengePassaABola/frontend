import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjYgQipDJ5Sn1efoDV1b2iTdBDRn2Jwi4",
  authDomain: "passabola-9654f.firebaseapp.com",
  projectId: "passabola-9654f",
  storageBucket: "passabola-9654f.firebasestorage.app",
  messagingSenderId: "544206042913",
  appId: "1:544206042913:web:d0fb00b57ba638dc12b060",
  databaseURL: "https://passabola-9654f-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const auth = getAuth(app);

export default app;
