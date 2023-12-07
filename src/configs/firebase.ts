import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB71oVHJcLW8cf-fAiAXz0Fx7IXJURC_ls",
  authDomain: "vartalapp-946de.firebaseapp.com",
  projectId: "vartalapp-946de",
  storageBucket: "vartalapp-946de.appspot.com",
  messagingSenderId: "127118627338",
  appId: "1:127118627338:web:a01249218051da427c85f3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
