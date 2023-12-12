import { NavLink, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useContext } from "react";
import Avatar from "./Avatar";
import { ThemeContext, ThemeContextType } from "../context/ThemeContext";

// icons
import { TbMessage } from "react-icons/tb";
import { MdOutlinePersonOutline } from "react-icons/md";
// import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

// firebase imports
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { AuthContext, AuthContextType } from "../context/AuthContext";

type SidebarProps = {
  setIsSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const iconStyles =
  "cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:text-rose-400";

const activeClassName = `text-rose-500 ${iconStyles} `;

const Sidebar = ({ setIsSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const { isDarkMode, toggleTheme } = useContext(
    ThemeContext,
  ) as ThemeContextType;
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  // event handlers
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      id="sidebar"
      className="align-center flex h-full flex-col justify-start rounded-2xl bg-gray-900 text-white md:h-auto"
    >
      {/* top */}
      <div className="mx-auto my-4 md:inline-block">
        <Avatar
          photoURL={currentUser && currentUser.photoURL}
          displayName={currentUser && currentUser.displayName}
        />
        <span className="mx-auto pl-1 text-center text-xs tracking-tight dark:text-white">
          {currentUser && currentUser.displayName}
        </span>
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
          to="/profile"
          className={({ isActive }) =>
            isActive ? activeClassName : iconStyles
          }
          aria-label="profile"
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
        >
          <MdOutlinePersonOutline />
        </NavLink>

        <button onClick={toggleTheme} aria-label="toggle dark mode">
          {isDarkMode ? (
            <MdDarkMode className={`${iconStyles}`} />
          ) : (
            <MdOutlineDarkMode className={`${iconStyles}`} />
          )}
        </button>
      </div>

      {/* bottom */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-b-2xl bg-gray-700 p-4 text-3xl">
        {/* <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? activeClassName : iconStyles
          }
          aria-label="settings"
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
        >
          <IoSettingsOutline />
        </NavLink> */}

        <button onClick={handleSignOut} aria-label="logout">
          <MdLogout className={`${iconStyles}`} />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;

{
  /* <div className="mx-auto my-4 md:inline-block">
        <img
          className="inline-block h-10 w-10 border-spacing-2 cursor-pointer rounded-full object-cover ring-2 ring-rose-500 transition-all duration-150 hover:-translate-y-1"
          src="https://img.freepik.com/free-photo/men-women-embrace-sunset-generative-ai_188544-12581.jpg?w=826&t=st=1701768698~exp=1701769298~hmac=98cf0da41a6c31de42fdbba2de89b58c1298a3e469843be399022e7e9542a1cf"
          alt="profile picture"
        />
        <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-500 text-lg font-semibold leading-none text-white ring-2 ring-rose-500 transition-all duration-150 hover:-translate-y-1">
          S
        </span>
      </div> */
}
