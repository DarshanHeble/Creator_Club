"use client";

import { usePrivy } from "@privy-io/react-auth";
import { FaCog, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = usePrivy();
  const links = [
    {
      label: "Dashboard",
      href: `/user/${user?.id}/dashboard`,
      icon: (
        <RxDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Quests",
      href: `/user/${user?.id}/quests`,
      icon: (
        <FaTasks className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: `/user/${user?.id}/settings`,
      icon: (
        <FaCog className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <FaSignOutAlt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-zinc-50 shadow-lg dark:bg-zinc-900">
      {/* Sidebar Header */}
      <div className="p-4 text-lg font-bold text-neutral-700 dark:text-neutral-200">
        Creator Club
      </div>

      {/* Sidebar Links */}
      <nav className="mt-4 flex flex-col gap-4">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.href}
            className="flex items-center gap-4 rounded-md px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4">
        <Link
          to={`/user/${user?.id}/profile`}
          className="flex items-center gap-4"
        >
          <img
            src="https://assets.aceternity.com/manu.png"
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Manu Arora
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Creator
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
