// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2H3WEmfcopErGgPve_SHcnW1j2lr-mQw",
    authDomain: "museumvoiceapp.firebaseapp.com",
    projectId: "museumvoiceapp",
    storageBucket: "museumvoiceapp.appspot.com",
    messagingSenderId: "766867072821",
    appId: "1:766867072821:web:cdbc48989aa7ecd8ad4e7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
