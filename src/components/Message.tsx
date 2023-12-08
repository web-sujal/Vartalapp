type MessageProps = {
  isCurrentuser?: boolean;
  message: string;
  timestamp: string;
};

const Message = ({
  isCurrentuser = false,
  message,
  timestamp,
}: MessageProps) => {
  return (
    <div
      className={`${
        isCurrentuser
          ? "ms-auto bg-rose-600 text-white"
          : "me-auto bg-gray-200 text-black dark:bg-slate-600 dark:text-white "
      } flex w-4/5 max-w-fit flex-col items-start justify-center rounded-3xl px-4 py-2 text-lg shadow-sm`}
    >
      <div className="">{message}</div>
      <div
        className={`${
          isCurrentuser
            ? "text-gray-50 dark:text-white/90"
            : " text-gray-700 dark:text-gray-300"
        } w-full text-end text-xs font-light`}
      >
        {timestamp}
      </div>
    </div>
  );
};

export default Message;
