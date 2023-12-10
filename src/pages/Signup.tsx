import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// firebase imports
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, provider, storage } from "../configs/firebase";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext, AuthContextType } from "../context/AuthContext";

type FormData = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const [file, setFile] = useState<File | null>(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  if (currentUser) {
    return <Navigate to="/chats" />;
  }

  const errorTimeout = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // event handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // creating user with firebase
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.confirmPassword,
      );

      // creating user in firestore
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: data.displayName,
          email: data.email,
          photoURL: "",
          uid: userCredential.user.uid,
        });
      } catch (error) {
        console.error(error);
      }

      // creating user chatList in firestore
      try {
        await setDoc(doc(db, "chatLists", userCredential.user.uid), {});
      } catch (error) {
        console.error(error);
      }

      // uploading file and updating displayName in userProfile
      if (file) {
        const storageRef = ref(storage, data.email);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.error(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                // updating user profile in auth
                try {
                  await updateProfile(userCredential.user, {
                    displayName: data.displayName,
                    photoURL: downloadURL,
                  });
                } catch (error) {
                  console.error(error);
                }

                // updating user doc in firestore
                try {
                  await updateDoc(doc(db, "users", userCredential.user.uid), {
                    photoURL: downloadURL,
                  });
                } catch (error) {
                  console.error(error);
                }
              },
            );
          },
        );
      } else {
        // updating user displayName in auth
        try {
          await updateProfile(userCredential.user, {
            displayName: data.displayName,
          });
        } catch (error) {
          console.error(error);
        }
      }

      reset();
      navigate("/chats");
    } catch (error) {
      console.error(error);
      const errorCode = (error as FirebaseError).code;
      if (errorCode === "auth/email-already-in-use") {
        errorTimeout();
      }
    }
  };

  // creating user with google sign in
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // creating user in firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } catch (error) {
        console.error(error);
      }

      navigate("/chats");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-rose-50 py-12 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-md p-6 pt-0">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="p-4 sm:p-7">
            {/* sign in here */}
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign up
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  {" "}
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              {/* sign up with google */}
              <button
                type="button"
                onClick={signInWithGoogle}
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg
                  className="h-auto w-4"
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="none"
                >
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign up with Google
              </button>

              {/* or divider */}
              <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>

              {/* <!-- Form --> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  {/* displayName */}
                  <div>
                    <label
                      htmlFor="displayName"
                      className="mb-2 block text-sm dark:text-white"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="displayName"
                        className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-describedby="displayName-error"
                        {...register("displayName", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-describedby="email-error"
                        {...register("email", {
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        })}
                      />
                    </div>

                    {/* Invalid Email Error */}
                    {errors.email && (
                      <p className="mt-2 text-xs text-red-600" id="email-error">
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm dark:text-white"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-describedby="password-error"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                      />
                    </div>

                    {/* Invalid Password Error */}
                    {errors.password && (
                      <p
                        className="mt-2 text-xs text-red-600"
                        id="password-error"
                      >
                        Password must be at least 6 characters long.
                      </p>
                    )}
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm dark:text-white"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-describedby="password-error"
                        {...register("confirmPassword", {
                          required: true,
                          validate: (value: string) => {
                            if (watch("password") != value) {
                              return "Your passwords do no match";
                            }
                          },
                        })}
                      />
                    </div>

                    {/* Invalid Password Error */}
                    {errors.confirmPassword && (
                      <p
                        className="mt-2 text-xs text-red-600"
                        id="password-error"
                      >
                        Passwords do not match. Please try again.
                      </p>
                    )}
                  </div>

                  {/* File */}
                  <div className="flex items-center justify-start gap-4">
                    <label
                      htmlFor="file"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("file")?.click();
                        }
                      }}
                      className="transition-lift cursor-pointer text-4xl text-gray-700 dark:text-white"
                      id="upload-profile-pic"
                    >
                      <MdAddPhotoAlternate />
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      aria-describedby="upload-profile-pic"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file"
                      className="cursor-pointer tracking-wide transition-all duration-150 hover:underline hover:underline-offset-4 dark:text-gray-200"
                      id="upload-profile-pic"
                    >
                      Upload your profile pic
                    </label>
                  </div>

                  {/* email already in use error */}
                  {showError && (
                    <p
                      className="mt-2 text-xs text-red-600"
                      aria-label="email-already-in-use-error"
                    >
                      email already in use
                    </p>
                  )}

                  {/* sign up */}
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              {/* <!-- End Form --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
