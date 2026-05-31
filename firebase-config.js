// firebase-config.js

// Firebase CDN imports (Modular v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAyoaf_jIOe8pe9Po0pODC8OBjSaQyWE6k",
  authDomain: "apnaghar-2668d.firebaseapp.com",
  projectId: "apnaghar-2668d",
  storageBucket: "apnaghar-2668d.firebasestorage.app",
  messagingSenderId: "583440125091",
  appId: "1:583440125091:web:69e8aa51f9be93513a4316",
  measurementId: "G-DH2H104CVN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("✅ Firebase Connected Successfully");
