import { IoSearchSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const users = [
  {
    displayName: "Shikha Ji",
    email: "joshishikha@gmail.com",
    password: "kuchbhi",
    userID: 1,
  },
  {
    displayName: "Abhishek Patel",
    email: "patelabhishek@gmail.com",
    password: "kuchbhi",
    userID: 2,
  },
  {
    displayName: "Kartik Patel",
    email: "syoyo@gmail.com",
    password: "kuchbhi",
    userID: 3,
  },
  {
    displayName: "Sumit Yadav",
    email: "yadavsumit@gmail.com",
    password: "kuchbhi",
    userID: 4,
  },
  {
    displayName: "Vivek Anany",
    email: "nanni@gmail.com",
    password: "kuchbhi",
    userID: 5,
  },
];

const navlinkStyles =
  "cursor-pointer hover:-translate-y-1 duration-150 transition-all hover:text-rose-400";

const ChatList = () => {
  const isBelowLargeScreens = useMediaQuery({ maxWidth: 1024 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-auto w-full items-center justify-between gap-1">
      <div className="flex h-full w-full flex-col gap-1 lg:max-w-xs">
        {/* search */}
        <div
          className={`relative flex h-20 items-center justify-between gap-4 rounded-2xl bg-white px-6 dark:bg-gray-900 ${
            isSidebarOpen ? "blur-sm" : ""
          }`}
        >
          {/* <!-- Navigation Toggle --> */}
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
            className="block w-full rounded-full border-gray-200 px-5 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Search"
          />
          <IoSearchSharp className="transition-lift absolute bottom-5 right-10 mb-0.5 text-2xl text-gray-200 hover:text-rose-200 dark:text-gray-500" />
        </div>

        {/* users chat list */}
        <div
          className={`flex h-full flex-col items-start justify-start gap-4 rounded-2xl bg-white p-4 dark:bg-gray-800 dark:text-white ${
            isSidebarOpen ? "blur-sm" : ""
          }`}
        >
          {users.map((user) => (
            <NavLink
              key={user.userID}
              to={
                isBelowLargeScreens
                  ? `/mchats/${user.userID}`
                  : `/chats/${user.userID}`
              }
              className={({ isActive }) =>
                isActive ? `text-rose-500 ${navlinkStyles}` : navlinkStyles
              }
            >
              {user.displayName}
            </NavLink>
          ))}
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
