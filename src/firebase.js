// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoKAi2SUE9pRiMReCJ99tGUnENIFNMsTM",
  authDomain: "workora-153c6.firebaseapp.com",
  projectId: "workora-153c6",
  storageBucket: "workora-153c6.firebasestorage.app",
  messagingSenderId: "195793778297",
  appId: "1:195793778297:web:8fa82d3d3d1dbf14cf46a8",
  measurementId: "G-RTVH90S4QV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
