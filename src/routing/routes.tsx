import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Calls from "../pages/Calls";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "calls",
        element: <Calls />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPassword />,
  },

  {
    element: <PrivateRoutes />,
    children: [{}],
  },
]);

export default router;
