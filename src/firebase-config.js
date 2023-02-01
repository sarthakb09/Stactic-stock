import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_K8ZB06KeuQH3XIrMUdi7q_aYjVR_e6I",
    authDomain: "authentication-login-9cf44.firebaseapp.com",
    projectId: "authentication-login-9cf44",
    storageBucket: "authentication-login-9cf44.appspot.com",
    messagingSenderId: "320523024906",
    appId: "1:320523024906:web:1fc6c147cbbf52b570fdf3",
    measurementId: "G-MK43YKC5G6"
  };

  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);