import Avatar from "./Avatar";
import Message from "./Message";
import { HiOutlinePhone } from "react-icons/hi";
import { IoVideocamOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Unsubscribe } from "firebase/auth";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../configs/firebase";
import Input from "./Input";

type MessageType = {
  id: string;
  img: string;
  message: string;
  timestamp: string;
  senderId: string;
  // isSeen: boolean;
  // delivered: boolean;
};

const ChatDetails = () => {
  const [messages, setMessages] = useState<DocumentData | undefined>([]);
  const { state } = useContext(ChatContext);

  // subscribing to chats
  useEffect(() => {
    let unsub: Unsubscribe;
    if (state.user) {
      unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    }

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col ">
      {/* nav */}
      <div className="flex h-20 min-h-fit items-center justify-between gap-1 border-b-2 border-gray-200 bg-white px-4 py-3.5 dark:border-none dark:bg-gray-900 dark:text-white md:mb-1 md:rounded-2xl md:border-none">
        {/* avatar */}
        <div className="flex-shrink-0">
          <Avatar
            photoURL={state.user && state.user.photoURL}
            displayName={state.user && state.user.displayName}
          />
        </div>

        {/* name, user presenece and buttons */}
        <div className="flex w-full items-center justify-between px-2">
          <div className="justify center flex flex-col items-start gap-3">
            {/* name */}
            <span className="text-xl font-medium">
              {state.user && state.user.displayName}
            </span>

            {/* user presence : (later) */}
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-base font-medium text-gray-800 shadow-sm transition-all duration-150 hover:scale-110 hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <IoVideocamOutline />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-base font-medium text-gray-800 shadow-sm transition-all duration-150 hover:scale-110 hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <HiOutlinePhone />
            </button>
          </div>
        </div>
      </div>

      {/* chat deatails section */}
      <div className="flex h-full flex-col items-start justify-start gap-2 overflow-y-auto bg-white p-4 dark:bg-gray-800 dark:text-white md:rounded-t-2xl [&::-webkit-scrollbar]:w-0">
        {messages &&
          messages.map((message: MessageType) => (
            <Message
              key={message.id}
              img={message.img}
              message={message.message}
              timestamp={message.timestamp}
              senderId={message.senderId}
              // delivered={message.delivered}
              // isSeen={message.isSeen}
            />
          ))}
      </div>

      {/* input */}
      <Input />
    </div>
  );
};

export default ChatDetails;
