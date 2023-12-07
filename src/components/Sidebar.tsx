import { TbMessage } from "react-icons/tb";
import { HiOutlinePhone } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import Avatar from "./Avatar";
import { mockChatList } from "../mockData/mockChatList";

type SidebarProps = {
  setIsSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ setIsSidebarOpen }: SidebarProps) => {
  const iconStyles =
    "cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:text-rose-400";
  const activeClassName = `text-rose-500 ${iconStyles} `;

  // event handlers
  const handleSignOut = () => {};

  return (
    <nav
      id="sidebar"
      className="align-center flex h-full flex-col justify-start rounded-2xl bg-gray-900 text-white md:h-auto"
    >
      {/* top */}
      <div className="mx-auto my-4 md:inline-block">
        <Avatar
          photoURL={mockChatList[7].photoURL}
          name={mockChatList[7].displayName}
        />
      </div>

      {/* mid */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-gray-800 p-4 text-3xl">
        <NavLink
          to="/chats"
          className={({ isActive }) =>
            isActive ? activeClassName : iconStyles
          }
          aria-label="chats"
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
        >
          <TbMessage />
        </NavLink>

        <NavLink
          to="/calls"
          className={({ isActive }) =>
            isActive ? activeClassName : iconStyles
          }
          aria-label="calls"
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
        >
          <HiOutlinePhone />
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? activeClassName : iconStyles
          }
          aria-label="profile"
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
        >
          <MdOutlinePersonOutline />
        </NavLink>
      </div>

      {/* bottom */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-b-2xl bg-gray-700 p-4 text-3xl">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? activeClassName : iconStyles
          }
          aria-label="settings"
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
        >
          <IoSettingsOutline />
        </NavLink>

        <button onClick={handleSignOut} aria-label="logout">
          <MdLogout className={`${iconStyles}`} />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
