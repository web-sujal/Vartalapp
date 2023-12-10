import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useState } from "react";
import ChatListItem from "./ChatListItem";
import { mockChatList } from "../mockData/mockChatList";

import Search from "./Search";

const ChatList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-auto w-full items-center justify-between md:gap-1">
      {/* chatList */}
      <div className="flex h-full max-h-full w-full flex-col md:gap-1 lg:max-w-xs">
        {/* search */}
        <Search
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* users chat list */}
        <div
          className={`flex h-full max-h-full flex-col items-start justify-start gap-4 overflow-y-auto bg-white p-4 dark:bg-gray-800 dark:text-white md:rounded-2xl lg:bg-sky-50
          [&::-webkit-scrollbar]:w-0 ${isSidebarOpen ? "blur-sm" : ""}`}
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
