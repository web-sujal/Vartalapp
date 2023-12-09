import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

/*
public
src
  components
    Avatar.tsx
    ChatDetails.tsx
    ChatList.tsx
    ChatListItem.tsx
    Message.tsx
    Sidebar.tsx
  configs
    firebase.ts
  context
    AuthContext.tsx
    ThemeContext.tsx
  mockData
    mockChatList.ts
    mockChatMessages.tsx
  pages
    ForgotPassword.tsx
    Login.tsx
    Profile.tsx
    Settings.tsx
    Signup.tsx
  routing
    PrivateRoutes.tsx
    routes.tsx
  index.tsx
  Layout.tsx
  main.tsx
*/
