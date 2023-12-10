import Avatar from "./Avatar";
import { UserType } from "./Search";

type SearchedUserProps = {
  photoURL: string;
  displayName: string;
  isLast: boolean;
  handleSelect: (user: UserType) => void;
  user: UserType;
};

const SearchedUser = ({
  photoURL,
  displayName,
  isLast,
  user,
  handleSelect,
}: SearchedUserProps) => {
  return (
    <div
      onClick={() => handleSelect(user)}
      className="group flex w-full cursor-pointer items-center justify-between gap-3"
    >
      {/* avatar */}
      <Avatar photoURL={photoURL} displayName={displayName} />

      <div className="flex flex-1 flex-col items-start justify-around overflow-hidden">
        {/* name */}
        <p className=" pt-1 text-start transition-all duration-150 group-hover:translate-x-1 dark:text-white">
          {displayName}
        </p>

        {/* divider */}
        {!isLast && (
          <hr className="hr-class mt-2 w-full border-gray-300 dark:border-gray-400" />
        )}
      </div>
    </div>
  );
};

export default SearchedUser;
