import { Outlet } from "react-router-dom";
import UserList from "../components/UserList";

const Home = () => {
  return (
    <div className="flex">
      <UserList />
      <Outlet />
    </div>
  );
};

export default Home;
