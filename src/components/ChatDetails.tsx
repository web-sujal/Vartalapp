import { useLocation } from "react-router-dom";
import { mockChatList } from "../mockData/mockChatList";
import Avatar from "./Avatar";
import { HiOutlinePhone } from "react-icons/hi";
import { FaVideo } from "react-icons/fa";

const ChatDetails = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const index = currentPath.lastIndexOf("/");
  const id = Number(currentPath.slice(index + 1)) - 1;

  return (
    <div className="flex h-full w-full flex-col gap-1">
      {/* nav */}
      <div className="flex h-20 items-center justify-between gap-1 rounded-2xl bg-white px-4 dark:bg-gray-900 dark:text-white">
        {/* avatar */}
        <div className="flex-shrink-0">
          <Avatar
            photoURL={mockChatList[id].photoURL}
            name={mockChatList[id].displayName}
          />
        </div>

        {/* name, user presenece and buttons */}
        <div className="flex w-full items-center justify-between px-2">
          <div className="justify center flex flex-col items-start gap-3">
            {/* name */}
            <span className="text-xl font-medium">
              {mockChatList[id].displayName}
            </span>

            {/* presence */}
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-all duration-150 hover:scale-110 hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <FaVideo />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-all duration-150 hover:scale-110 hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <HiOutlinePhone />
            </button>
          </div>
        </div>
      </div>

      {/* chat deatails section */}
      <div className="flex h-full items-start justify-start gap-4 rounded-2xl bg-white p-4 dark:bg-gray-800 dark:text-white">
        chat details
      </div>
    </div>
  );
};

export default ChatDetails;
