import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import process from "process";

// TODO move config to .env file

export const firebaseConfig = {
  apiKey: "AIzaSyDt9ID4zlANYuxEGLFUa6rUZ7XTZDp_HCw",
  authDomain: "mini-paint-3bfc5.firebaseapp.com",
  projectId: "mini-paint-3bfc5",
  storageBucket: "mini-paint-3bfc5.appspot.com",
  messagingSenderId: "335116132218",
  appId: "1:335116132218:web:27aecb37f91c12d9ac00c3",
  measurementId: "G-X3N0170HNM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
