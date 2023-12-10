type AvatarProps = {
  photoURL: string | null;
  displayName: string | null;
  h?: number;
  w?: number;
};

const Avatar = ({ photoURL, displayName, h = 10, w = 10 }: AvatarProps) => {
  return (
    <div className="flex-shrink-0">
      {photoURL ? (
        <img
          className={`inline-flex h-${h} w-${w} cursor-pointer rounded-full object-cover object-center`}
          src={photoURL}
          alt="profile picture"
        />
      ) : (
        <span
          className={`inline-flex h-${h} w-${w} cursor-pointer items-center justify-center rounded-full bg-slate-700 text-lg font-semibold leading-none text-white`}
        >
          {displayName && displayName[0]}
        </span>
      )}
    </div>
  );
};

export default Avatar;
