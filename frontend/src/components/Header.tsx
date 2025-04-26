"use client";

import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Sidebar from "./Sidebar"; // Import the new Sidebar component

const Header = () => {
  return (
    <div className="relative">
      {/* Header Bar */}
      <div className="flex justify-between h-14 items-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900">
        {/* Navigation Links */}
        <nav className="hidden md:flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default Header;
