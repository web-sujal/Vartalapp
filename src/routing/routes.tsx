import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ChatList from "../components/ChatList";
import ChatDetails from "../components/ChatDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
// import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [],
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
    children: [
      {
        path: "chats",
        element: <ChatList />,
        children: [
          {
            path: ":id",
            element: <ChatDetails />,
          },
        ],
      },
      {
        path: "mchats/:id",
        element: <ChatDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
    ],
  },
]);

export default router;
