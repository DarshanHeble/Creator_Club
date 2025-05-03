import Sidebar from "@components/layout/Sidebar";
import { Outlet, useParams, Navigate } from "react-router-dom";

const UserLayout = () => {
  const { userId } = useParams();

  // Redirect to landing page if userId is undefined
  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar/>
      <div className="flex-1 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
