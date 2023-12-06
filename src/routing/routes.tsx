import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ChatList from "../components/ChatList";
import ChatDetails from "../components/ChatDetails";
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
