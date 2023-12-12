import { useContext, useEffect, useRef } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import { formatampm } from "./ChatListItem";

type MessageProps = {
  message: string;
  timestamp: string;
  img?: string;
  seen?: boolean;
  senderId: string;
};

const Message = ({ message, img, timestamp, senderId }: MessageProps) => {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const ref = useRef<HTMLDivElement>(null);
  // const formattedTimestamp = formatampm(timestamp);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${
        currentUser && currentUser.uid === senderId
          ? "ms-auto items-end"
          : "me-auto items-start"
      } flex w-4/5 max-w-fit flex-col justify-center shadow-sm`}
    >
      {img && (
        <img
          src={img}
          alt="image"
          className="mb-2 h-60 cursor-pointer rounded-md bg-white object-cover"
        />
      )}
      <div
        className={`${
          currentUser && currentUser.uid === senderId
            ? "ms-auto bg-rose-600 text-white"
            : "me-auto bg-gray-200 text-black dark:bg-slate-600 dark:text-white "
        } rounded-3xl px-4 py-2 text-lg`}
      >
        <div className="">{message}</div>
        <div
          className={`${
            currentUser && currentUser.uid === senderId
              ? "justify-end text-gray-50 dark:text-white/90"
              : " justify-start gap-1 text-gray-700 dark:text-gray-300"
          } flex w-full items-center text-end text-xs font-light`}
        >
          {senderId !== (currentUser && currentUser.uid) && (
            <IoCheckmarkDoneSharp
              className={`mt-1 text-sm ${
                true ? "text-blue-500" : "text-gray-600"
              }`}
            />
          )}
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
