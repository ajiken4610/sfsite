// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI9zjiD9IOYtCwag8GEPmwyiWLs9nI6iw",
  authDomain: "salefessite.firebaseapp.com",
  projectId: "salefessite",
  storageBucket: "salefessite.appspot.com",
  messagingSenderId: "655952003454",
  appId: "1:655952003454:web:7b879d6c846a9c315e732f",
  measurementId: "G-BPRK32XXC4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const useFirebaseApp = () => app;
export const useAnalytics = () => analytics;

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld3qfggAAAAAJyAJxgUghZMG2EAUBhGsdQV2AX9"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const useAppcheck = () => appCheck;

import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "@firebase/app-check";

export const useFirestore = () => getFirestore(app);
