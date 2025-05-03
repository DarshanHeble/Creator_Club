import { FaCog, FaTasks, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { userService } from "@services/userService";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const { privyUser, logout } = useAuth();
  const location = useLocation();

  const { data: user } = useQuery({
    queryKey: ["user", privyUser?.id],
    queryFn: async () => {
      if (!privyUser?.id) return;
      const userData = await userService.getUser(privyUser.id);
      // setUser(userData.userName || "No Username");
      return userData;
    },
    enabled: !!privyUser?.id,
  });

  const links = [
    {
      label: "Dashboard",
      href: `/user/${user?.id}/dashboard`,
      icon: (
        <TbLayoutDashboardFilled className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Quests",
      href: `/user/${user?.id}/quests`,
      icon: (
        <FaTasks className="mr-1 h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: `/user/${user?.id}/settings`,
      icon: (
        <FaCog className="mr-1 h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-zinc-50 px-2 shadow-lg dark:bg-zinc-900">
      {/* Sidebar Header */}
      <div className="p-4 text-lg font-bold text-neutral-700 dark:text-neutral-200">
        Creator Club
      </div>

      {/* Create Post Button (Only for Creators) */}
      {user?.role === "creator" && (
        <Link
          to={`/user/${user?.id}/upload`}
          className="m-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <FaPlus />
          Create Post
        </Link>
      )}

      {/* Sidebar Links */}
      <nav className="mt-4 flex flex-col gap-2">
        {links.map((link, idx) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={idx}
              to={link.href}
              className={`flex items-center gap-4 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary-600 dark:text-primary-400 bg-gray-200 dark:bg-neutral-800"
                  : "text-neutral-800 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={() => {
            logout();
          }}
          className="flex items-center gap-4 rounded-md px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <FaSignOutAlt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
          <span>Logout</span>
        </button>

        <Link
          to={`/user/${user?.id}/profile`}
          className={`mb-3 flex items-center gap-4 rounded-md px-2 py-1 transition-colors ${
            location.pathname === `/user/${user?.id}/profile`
              ? "text-primary-600 dark:text-primary-400 bg-gray-200 dark:bg-neutral-800"
              : "hover:bg-gray-200 dark:hover:bg-neutral-800"
          }`}
        >
          <img
            src="https://assets.aceternity.com/manu.png"
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p
              className={`text-sm font-medium ${
                location.pathname === `/user/${user?.id}/profile`
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-neutral-700 dark:text-neutral-200"
              }`}
            >
              {user?.userName || "No Username"}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {user?.role}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
