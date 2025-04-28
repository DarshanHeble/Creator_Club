"use client";

import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <FaUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <FaCog className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <FaSignOutAlt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col shadow-lg">
      {/* Sidebar Header */}
      <div className="p-4 text-lg font-bold text-neutral-700 dark:text-neutral-200">
        Creator Club
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4 mt-4">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.href}
            className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-md"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4">
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;