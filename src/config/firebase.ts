import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDCanAsYqMkG2v5FDCsrlYdSY2_W8fzn2Y",
  authDomain: "ramadb-12782.firebaseapp.com",
  projectId: "ramadb-12782",
  storageBucket: "ramadb-12782.firebasestorage.app",
  messagingSenderId: "461412420585",
  appId: "1:461412420585:web:fd08e7f73fd17e2f1fd978",
  measurementId: "G-P0PTW9E0JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);