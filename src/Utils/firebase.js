import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAefhpxzmbCT2t2flhUNwFUblC5gTYtgi4",
  authDomain: "doccheck-78fb6.firebaseapp.com",
  projectId: "doccheck-78fb6",
  storageBucket: "doccheck-78fb6.appspot.com",
  messagingSenderId: "745221911858",
  appId: "1:745221911858:web:34ebcf1bb0aff7c39dd32b"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);