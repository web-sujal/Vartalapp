import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  // const location = useLocation();

  // if (location.pathname === "/") {
  //   return <Navigate to="/home" />;
  // }

  return (
    <div className="flex h-screen gap-1 bg-neutral-800 p-6 dark:bg-neutral-800">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
