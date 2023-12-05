import { useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";

const Layout = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/login" />;
  }

  return <Home />;
};

export default Layout;
