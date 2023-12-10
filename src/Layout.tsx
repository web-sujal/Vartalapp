import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "./context/AuthContext";

const Layout = () => {
  const { currentUser, loading } = useContext(AuthContext) as AuthContextType;
  const location = useLocation();

  if (location.pathname === "/") {
    if (loading) {
      return (
        // loading indicatior
        <div className="flex h-screen w-screen items-center justify-center gap-2">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-pink-600"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <h2 className="text-2xl font-medium text-rose-600">Loading...</h2>
        </div>
      );
    } else if (currentUser) {
      return <Navigate to="/chats" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className="flex h-screen max-h-full gap-1 bg-neutral-800 dark:bg-neutral-800 md:p-6">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
