import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const App = initializeApp({
    apiKey:  `${import.meta.env.VITE_APP_API_KEY}`,
    authDomain: `${import.meta.env.VITE_APP_AUTH_DOMAIN}` ,
    projectId: `${import.meta.env.VITE_APP_PROJECT_ID}`,
    appId: `${import.meta.env.VITE_APP_APPID}`,
    messagingSenderId:  `${import.meta.env.VITE_APP_MESSAGING_SENDER_ID}`,
});

export const auth = getAuth(App);
export const db_firestore = getFirestore(App);

