import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
// import { MdDone } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Avatar from "./Avatar";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { UserInfoType } from "./ChatList";
import { AuthContext, AuthContextType } from "../context/AuthContext";

export type ChatListItemProps = {
  displayName: string;
  senderId?: string;
  // unreadCount?: number;
  user: UserInfoType;
  timestamp?: string;
  lastMessage?: string;
  seen?: boolean;
  id: string;
  photoURL: string;
};

const ChatListItem = ({
  displayName,
  // unreadCount,
  senderId,
  user,
  lastMessage,
  seen, // later
  id,
  photoURL,
  timestamp,
}: ChatListItemProps) => {
  const isBelowLargeScreens = useMediaQuery({ maxWidth: 1024 });
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const handleSelect = (user: UserInfoType) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <NavLink
      onClick={() => handleSelect(user)}
      to={isBelowLargeScreens ? `/mchats/${id}` : `/chats/${id}`}
      className={({ isActive }) =>
        isActive ? `text-rose-500 hover:text-rose-400` : "hover:text-rose-400"
      }
    >
      <div className="group  flex w-full items-center justify-between gap-2">
        {/* avatar */}
        <div className="transition-all duration-150 group-hover:scale-110">
          <Avatar photoURL={photoURL} displayName={displayName} />
        </div>

        {/* details */}
        <div className="flex flex-1 flex-col items-center justify-around overflow-hidden">
          {/* name and timestamp */}
          <div className="flex w-full translate-y-1 items-center justify-between">
            <span className=" pt-1 text-lg font-medium transition-all duration-150 group-hover:translate-x-1">
              {displayName}
            </span>
            <span className=" text-xs text-gray-600 dark:text-gray-400">
              {timestamp}
            </span>
          </div>

          {/* last message and badge */}
          <div className="flex w-full items-center justify-between">
            {/* checkmark icon and text message */}
            <div
              className={`${
                lastMessage && lastMessage.length ? "" : "h-4"
              } flex w-5/6 items-center justify-start gap-1 text-base tracking-tight text-gray-700`}
            >
              <div className="flex-shrink-0">
                {senderId !== (currentUser && currentUser.uid) && (
                  <IoCheckmarkDoneSharp
                    className={`mt-1 text-sm ${
                      seen ? "text-blue-500" : "text-gray-600"
                    }`}
                  />
                )}
              </div>{" "}
              <span className="truncate dark:text-gray-400">{lastMessage}</span>
            </div>

            {/* unread icon */}
            {/* {unreadCount !== 0 && (
              <div className="py-1/2 rounded-full bg-rose-500 px-1 text-center text-xs font-medium text-white">
                {unreadCount}
              </div>
            )} */}
          </div>

          {/* divider */}
          <hr className="hr-class mt-2 w-full border-gray-300 dark:border-gray-400" />
        </div>
      </div>
    </NavLink>
  );
};

export default ChatListItem;
