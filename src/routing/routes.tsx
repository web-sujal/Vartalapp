import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
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
