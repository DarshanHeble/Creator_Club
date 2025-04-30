import Sidebar from "@components/layout/Sidebar";
import { Outlet, useParams } from "react-router-dom";

const UserLayout = () => {
  const { userId } = useParams();
  console.log(userId);

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex-1 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
