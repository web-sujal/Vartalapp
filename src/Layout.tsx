import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  // const location = useLocation();

  // if (location.pathname === "/") {
  //   return <Navigate to="/home" />;
  // }

  return (
    <div className="flex h-screen gap-1 bg-neutral-200 p-4 dark:bg-slate-900">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
