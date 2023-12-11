import Avatar from "./Avatar";
import Message from "./Message";
import { HiOutlinePhone } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { IoVideocamOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { mockChatList } from "../mockData/mockChatList";
import { mockChatMessages } from "../mockData/mockChatMessages";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatDetails = () => {
  const { state } = useContext(ChatContext);

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

            {/* presence */}
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
        {mockChatMessages.map((chat, index) => (
          <Message
            key={index}
            message={chat.message}
            timestamp={chat.timestamp}
            isCurrentuser={chat.isCurrentUser}
          />
        ))}
      </div>

      {/* input */}
      <div className="flex h-16 max-h-fit w-full flex-shrink-0 items-center justify-between gap-1 bg-white px-4 dark:bg-gray-800 md:gap-2 md:rounded-b-2xl">
        <input
          type="text"
          className="block w-full rounded-full border-gray-400 px-5 py-2 focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="type your message..."
        />
        <label
          htmlFor="file"
          className="cursor-pointer rounded-full bg-gray-200 p-2 text-center text-2xl font-medium text-gray-800 transition-all duration-150 hover:scale-95 hover:bg-gray-300 dark:bg-gray-800 dark:text-white"
        >
          <GrAttachment />
        </label>
        <input type="file" id="file" className="hidden" />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-rose-500 p-2 text-center text-2xl font-medium text-white transition-all duration-150 hover:scale-95 hover:bg-rose-600"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default ChatDetails;
