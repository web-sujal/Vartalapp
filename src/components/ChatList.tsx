import { IoSearchSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useState } from "react";
import ChatListItem from "./ChatListItem";
import { mockChatList } from "../mockData/mockChatList";

const ChatList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-auto  w-full items-center justify-between gap-1">
      {/* chatList */}
      <div className="flex h-full max-h-full w-full flex-col gap-1 lg:max-w-xs">
        {/* search */}
        <div
          className={`min-h-20 relative flex h-20 items-center justify-between gap-4 rounded-2xl bg-white px-6 dark:bg-gray-900 ${
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
            className="block w-full rounded-full border-gray-400 px-5 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Search"
          />
          <IoSearchSharp className="transition-lift absolute bottom-5 right-10 mb-0.5 text-2xl text-gray-200 hover:text-rose-400 dark:text-gray-500" />
        </div>

        {/* users chat list */}
        <div
          className={`flex h-full max-h-full flex-col items-start justify-start gap-4 overflow-y-auto rounded-2xl bg-white p-4 dark:bg-gray-800 dark:text-white ${
            isSidebarOpen ? "blur-sm" : ""
          }`}
        >
          {/* CHAT LIST ITEM */}
          <div className="w-full">
            {mockChatList.map((chat, index) => {
              const isLast = mockChatList.length - 1 === index;

              return (
                <ChatListItem
                  displayName={chat.displayName}
                  unreadCount={chat.unreadCount}
                  text={chat.recentMessage.text}
                  timestamp={chat.recentMessage.timestamp}
                  isSeen={chat.recentMessage.isSeen}
                  id={chat.id}
                  key={chat.id}
                  photoURL={chat.photoURL}
                  isLast={isLast}
                />
              );
            })}
          </div>
        </div>

        {/* sidebar */}
        {isSidebarOpen && (
          <div className="">
            <div className="absolute -left-2 top-0 z-30 h-full opacity-100">
              <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            {/* backdrop overlay */}
            <div
              onClick={() => setIsSidebarOpen(false)}
              className=" fixed start-0 top-0 z-20 h-full w-full bg-slate-800 opacity-60"
            />
          </div>
        )}
      </div>

      {/* chatDetails */}
      <Outlet />
    </div>
  );
};

export default ChatList;
