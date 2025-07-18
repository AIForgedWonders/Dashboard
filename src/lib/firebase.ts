import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBpss_yRXBLci58cGPU--aaPi_bGuwe6-Q",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "forgewonders.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "forgewonders",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "forgewonders.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "555072686905",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:555072686905:web:a00ab44b09496e0385b6e8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-2LXE31JMGM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, analytics, auth, googleProvider, githubProvider }; 