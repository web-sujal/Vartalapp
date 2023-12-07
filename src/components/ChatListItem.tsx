import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
// import { MdDone } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

type ChatListItemProps = {
  displayName: string;
  unreadCount: number;
  text: string;
  timestamp: Date;
  isSeen: boolean;
  id: number;
  photoURL: string;
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
        <div className="flex-shrink-0">
          {photoURL.length !== 0 ? (
            <img
              className="inline-flex h-10 w-10 cursor-pointer rounded-full object-cover object-center"
              src={photoURL}
              alt="profile picture"
            />
          ) : (
            <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-700 text-lg font-semibold leading-none text-white">
              {displayName[0]}
            </span>
          )}
        </div>

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
          <hr className="mt-2 w-full border-gray-300 dark:border-gray-400" />
        </div>
      </div>
    </NavLink>
  );
};

export default ChatListItem;
