import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
// import { MdDone } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Avatar from "./Avatar";

type ChatListItemProps = {
  displayName: string;
  unreadCount: number;
  text: string;
  timestamp: Date;
  isSeen: boolean;
  id: number;
  photoURL: string;
  isLast: boolean;
};

const formatampm = (d: Date) => {
  let hrs = d.getHours();
  let m = d.getMinutes();
  const ampm = hrs >= 12 ? "PM" : "AM";
  let mins = m < 10 ? `0${m}` : m; // Condition to add zero before minute

  hrs = hrs % 12;
  hrs = hrs ? hrs : 12; // the hour '0' should be '12'

  const currTime = hrs + ":" + mins + " " + ampm;
  return currTime;
};

const ChatListItem = ({
  displayName,
  unreadCount,
  text,
  timestamp,
  isSeen,
  id,
  photoURL,
  isLast,
}: ChatListItemProps) => {
  const isBelowLargeScreens = useMediaQuery({ maxWidth: 1024 });

  return (
    <NavLink
      key={id}
      to={isBelowLargeScreens ? `/mchats/${id}` : `/chats/${id}`}
      className={({ isActive }) =>
        isActive ? `text-rose-500 hover:text-rose-400` : "hover:text-rose-400"
      }
    >
      <div className="group  flex w-full items-center justify-between gap-2">
        {/* avatar */}
        <Avatar photoURL={photoURL} name={displayName} />

        {/* details */}
        <div className="flex flex-1 flex-col items-center justify-around overflow-hidden">
          {/* name and timestamp */}
          <div className="flex w-full translate-y-1 items-center justify-between">
            <span className=" pt-1 text-lg font-medium transition-all duration-150 group-hover:translate-x-1">
              {displayName}
            </span>
            <span className=" text-xs text-gray-600 dark:text-gray-400">
              {formatampm(timestamp)}
            </span>
          </div>

          {/* recent message and badge */}
          <div className="flex w-full items-center justify-between">
            {/* checkmark icon and text message */}
            <div className="flex w-5/6 items-center justify-start gap-1 text-base tracking-tight text-gray-700">
              <div className="flex-shrink-0">
                <IoCheckmarkDoneSharp
                  className={`mt-1 text-sm ${
                    isSeen ? "text-blue-500" : "text-gray-600"
                  }`}
                />
              </div>{" "}
              <span className="truncate dark:text-gray-400">{text}</span>
            </div>

            {/* unread icon */}
            {unreadCount !== 0 && (
              <div className="py-1/2 rounded-full bg-rose-500 px-1 text-center text-xs font-medium text-white">
                {unreadCount}
              </div>
            )}
          </div>

          {/* divider */}
          {!isLast && (
            <hr className="hr-class mt-2 w-full border-gray-300 dark:border-gray-400" />
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default ChatListItem;
