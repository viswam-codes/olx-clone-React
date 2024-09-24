
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC8nBMXZ8lFrGR9v-29wyHoqnX0LXr7uxM",
  authDomain: "olx-clone-9b265.firebaseapp.com",
  projectId: "olx-clone-9b265",
  storageBucket: "olx-clone-9b265.appspot.com",
  messagingSenderId: "959708730815",
  appId: "1:959708730815:web:83479f902f9d79301c3d0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);

export const auth=getAuth(app)
export const googleProvider = new GoogleAuthProvider();