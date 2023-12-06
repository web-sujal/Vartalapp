import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  // const location = useLocation();

  // if (location.pathname === "/") {
  //   return <Navigate to="/home" />;
  // }

  return (
    <div className="flex h-screen gap-1 bg-rose-100 p-6 dark:bg-zinc-800">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
