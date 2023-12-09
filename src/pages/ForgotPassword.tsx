import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../configs/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // event handlers
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      messageTimeout();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  // message timer
  const messageTimeout = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate("/login");
    }, 5000);
  };

  return (
    <div className="flex min-h-screen items-center bg-rose-50 py-16 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-md p-6">
        <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
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
              {/* <!-- Form --> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  {/* <!-- Form Group --> */}
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
                        className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-rose-500 focus:ring-rose-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-describedby="email-error"
                        {...register("email", {
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        })}
                      />
                    </div>

                    {/* invalid email error */}
                    {errors.email && (
                      <p className="mt-2 text-xs text-red-600" id="email-error">
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    )}

                    {/*  */}
                    {showMessage && (
                      <p className="mt-2 text-xs text-red-600" id="email-error">
                        An email with reset password link has been sent to your
                        provided email
                      </p>
                    )}
                  </div>
                  {/* <!-- End Form Group --> */}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-600 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Reset password
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

export default ForgotPassword;
