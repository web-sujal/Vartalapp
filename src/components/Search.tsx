import { IoSearchSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { Dispatch, useContext, useEffect, useState } from "react";

import { AuthContext, AuthContextType } from "../context/AuthContext";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../configs/firebase";
import SearchedUser from "./SearchedUser";

type SearchProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
};

export type UserType = {
  displayName: string;
  username: string;
  email: string;
  uid: string;
  photoURL: string;
};

const Search = ({ isSidebarOpen, setIsSidebarOpen }: SearchProps) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<DocumentData | null>(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  // checking if user exists
  const handleSearch = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", "==", username.toLowerCase()),
      );
      const querySnapshot = await getDocs(q);

      const usersData: UserType[] = [];
      querySnapshot.docs.map((doc: DocumentData) => {
        usersData.push(doc.data());
      });

      // updating users state if usersData exists
      if (usersData.length) {
        setUsers(usersData);
        setErr(false);
      } else {
        setUsers(null);
        errorTimeout();
      }
    } catch (error) {
      console.error(error);
      setUsers(null);
      errorTimeout();
    }
  };

  // subscribing to search
  useEffect(() => {
    handleSearch();
  }, [username]);

  //
  const handleSelect = async (user: UserType) => {
    if (user && currentUser) {
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      // checking if the doc exists
      try {
        const docRef = doc(db, "chats", combinedId);
        const res = await getDoc(docRef);

        // if doc doesn't exist
        if (!res.exists()) {
          // create doc
          await setDoc(docRef, { messages: [] });

          // updating chatLists for currentUser
          await updateDoc(doc(db, "chatLists", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          // updating chatLists the other user
          await updateDoc(doc(db, "chatLists", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error(error);
      }

      setUsername("");
      setUsers(null);
    }
  };

  const errorTimeout = () => {
    setErr(true);
    setTimeout(() => {
      setErr(false);
    }, 5000);
  };

  return (
    <div
      className={`min-h-20 relative flex h-20 items-center justify-between gap-4 border-b-2 border-gray-300 bg-white px-6 shadow-sm dark:border-none dark:bg-gray-900 md:rounded-2xl md:border-none lg:bg-sky-50 ${
        isSidebarOpen ? "blur-sm" : ""
      }`}
    >
      {/* Navigation Toggle */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="inline-block cursor-pointer text-2xl hover:scale-90 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none md:hidden"
        aria-label="Toggle navigation"
      >
        <LuMenu />
      </button>
      {/* search input */}
      <input
        type="text"
        value={username}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full rounded-full border-gray-400 bg-white px-5 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 dark:focus:ring-gray-600 lg:bg-sky-50"
        placeholder="Search a user"
      />
      <IoSearchSharp
        onClick={handleSearch}
        className="transition-lift absolute bottom-5 right-10 mb-0.5 text-2xl text-gray-200 hover:text-rose-400 dark:text-gray-500"
      />
      {/* searched user list */}
      {users && (
        <div className="absolute left-0 top-full z-30 flex w-full flex-col gap-2 bg-gray-100 p-4 shadow-lg dark:bg-gray-900 dark:text-white md:mt-1 md:rounded-t-2xl lg:bg-sky-50">
          {users.map((user: UserType, index: number) => {
            const isLast = users.length - 1 === index;

            return (
              <SearchedUser
                user={user}
                handleSelect={handleSelect}
                key={user.uid}
                photoURL={user.photoURL}
                displayName={user.displayName}
                isLast={isLast}
              />
            );
          })}
        </div>
      )}

      {/* user not found error */}
      {err && (
        <p className="absolute left-0 top-full z-30 w-full bg-white p-4 text-sm text-red-600 dark:bg-gray-900 md:mt-1 md:rounded-t-2xl lg:bg-sky-50">
          User not found!
        </p>
      )}
    </div>
  );
};

export default Search;
