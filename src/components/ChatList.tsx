import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { mockChatList } from "../mockData/mockChatList";

import Search from "./Search";
import { DocumentData, Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { db } from "../configs/firebase";
import { AuthContext, AuthContextType } from "../context/AuthContext";

export type UserInfoType = {
  displayName: string;
  uid: string;
  photoURL: string;
  lastMessage: string;
};

type UserInfoObject = {
  userInfo: UserInfoType;
  lastMessage?: {
    message: string;
  };
};

type ChatsType = [id: string, userInfo: UserInfoObject];

const ChatList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<DocumentData | undefined>([]);

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    let unsub: Unsubscribe;
    if (currentUser) {
      unsub = onSnapshot(doc(db, "chatLists", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
    }

    return () => {
      unsub();
    };
  }, []);

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
            {chats &&
              Object.entries(chats)
                .sort((a, b) => b[1].date - a[1].date)
                .map((chat: ChatsType, index: number) => {
                  const isLast = mockChatList.length - 1 === index;

                  return (
                    <ChatListItem
                      displayName={chat[1].userInfo.displayName}
                      user={chat[1].userInfo}
                      id={chat[0]}
                      key={chat[0]}
                      lastMessage={
                        chat[1].lastMessage && chat[1].lastMessage.message
                      }
                      photoURL={chat[1].userInfo.photoURL}
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
