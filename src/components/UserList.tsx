const UserList = () => {
  return (
    <div className="flex h-auto w-full max-w-xs flex-col gap-1">
      {/* search */}
      <div className="flex h-16 items-center justify-between gap-4 rounded-2xl bg-white"></div>

      {/* users chat list */}
      <div className="flex h-full items-center justify-between gap-4 rounded-2xl bg-white"></div>
    </div>
  );
};

export default UserList;
