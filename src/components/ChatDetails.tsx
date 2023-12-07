const ChatDetails = () => {
  return (
    <div className="flex h-full w-full flex-col gap-1">
      {/* nav */}
      <div className="flex h-20 items-center justify-start gap-4 rounded-2xl bg-white px-4 dark:bg-gray-900 dark:text-white">
        chat heading
      </div>

      {/* chat deatails section */}
      <div className="flex h-full items-start justify-start gap-4 rounded-2xl bg-white p-4 dark:bg-gray-800 dark:text-white">
        chat details
      </div>
    </div>
  );
};

export default ChatDetails;
