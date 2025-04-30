import Sidebar from "@components/Sidebar";
import { Outlet, useParams } from "react-router-dom";

const UserLayout = () => {
  const { userId } = useParams();
  console.log(userId);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
