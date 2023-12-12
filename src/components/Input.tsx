import { IoIosSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuidv4 } from "uuid";

// firebase imports
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../configs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext, AuthContextType } from "../context/AuthContext";

const Input = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { state } = useContext(ChatContext);

  const handleClick = async () => {
    const docRef = doc(db, "chats", state.chatId);
    try {
      // checking if file exists
      if (currentUser) {
        if (file) {
          const storageRef = ref(storage, uuidv4());
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              console.error(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // updating user doc in firestore
              await updateDoc(docRef, {
                messages: arrayUnion({
                  id: uuidv4(),
                  img: downloadURL,
                  message,
                  senderId: currentUser.uid,
                  timestamp: new Date().toLocaleTimeString("hi-IN", {
                    timeStyle: "short",
                    hour12: true,
                  }),
                }),
              });
            },
          );
        } else {
          await updateDoc(docRef, {
            messages: arrayUnion({
              id: uuidv4(),
              message,
              senderId: currentUser.uid,
              timestamp: new Date().toLocaleTimeString("hi-IN", {
                timeStyle: "short",
                hour12: true,
              }),
            }),
          });
        }

        // updating chatLists doc for currentUser
        await updateDoc(doc(db, "chatLists", currentUser.uid), {
          [state.chatId + ".lastMessage"]: {
            message,
            seen: true,
            timestamp: new Date().toLocaleTimeString("hi-IN", {
              timeStyle: "short",
              hour12: true,
            }),
          },
          [state.chatId + ".date"]: serverTimestamp(),
        });

        // updating chatLists doc for other User
        if (state.user) {
          await updateDoc(doc(db, "chatLists", state.user.uid), {
            [state.chatId + ".lastMessage"]: {
              message,
              seen: false,
              timestamp: new Date().toLocaleTimeString("hi-IN", {
                timeStyle: "short",
                hour12: true,
              }),
            },
            [state.chatId + ".date"]: serverTimestamp(),
          });
        }
      }
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-16 max-h-fit w-full flex-shrink-0 items-center justify-between gap-1 bg-white px-4 dark:bg-gray-800 md:gap-2 md:rounded-b-2xl">
      <input
        type="text"
        value={message}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        onChange={(e) => setMessage(e.target.value)}
        className="block w-full rounded-full border-gray-400 px-5 py-2 focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="type your message..."
      />
      <label
        htmlFor="file"
        className="cursor-pointer rounded-full bg-gray-200 p-2 text-center text-2xl font-medium text-gray-800 transition-all duration-150 hover:scale-95 hover:bg-gray-300 dark:bg-gray-800 dark:text-white"
      >
        <GrAttachment />
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files && e.target.files[0])}
        id="file"
        className="hidden"
      />
      <button
        type="submit"
        onClick={handleClick}
        className="cursor-pointer rounded-full bg-rose-500 p-2 text-center text-2xl font-medium text-white transition-all duration-150 hover:scale-95 hover:bg-rose-600"
      >
        <IoIosSend />
      </button>
    </div>
  );
};

export default Input;
