import { TbMessage } from "react-icons/tb";
import { HiOutlinePhone } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

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
        <img
          className="inline-block h-10 w-10 border-spacing-2 cursor-pointer rounded-full object-cover ring-2 ring-rose-500 transition-all duration-150 hover:-translate-y-1"
          src="https://img.freepik.com/free-photo/men-women-embrace-sunset-generative-ai_188544-12581.jpg?w=826&t=st=1701768698~exp=1701769298~hmac=98cf0da41a6c31de42fdbba2de89b58c1298a3e469843be399022e7e9542a1cf"
          alt="profile picture"
        />
        {/* <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-500 text-lg font-semibold leading-none text-white ring-2 ring-rose-500 transition-all duration-150 hover:-translate-y-1">
          S
        </span> */}
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
