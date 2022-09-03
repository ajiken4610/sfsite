import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "@firebase/app-check";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3yYbbgCjDUe5j7au6L5uC8M8niKY9R1Q",
  authDomain: "sfsite-61b72.firebaseapp.com",
  projectId: "sfsite-61b72",
  storageBucket: "sfsite-61b72.appspot.com",
  messagingSenderId: "355791110171",
  appId: "1:355791110171:web:e511f11611dc2e331578be",
  measurementId: "G-1CN4EYKR3R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const useFirebaseApp = () => app;
export const useAnalytics = () => analytics;

// @ts-ignore
self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld3qfggAAAAAJyAJxgUghZMG2EAUBhGsdQV2AX9"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const useAppcheck = () => appCheck;

export const useFirestore = () => getFirestore(app);
