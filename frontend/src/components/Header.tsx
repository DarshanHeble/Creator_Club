import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaBars, FaHome, FaBell, FaHeart, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAccount } from "wagmi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useAccount(); // Check if the user is logged in

  const menuVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <div className="relative">
      {/* Header Bar */}
      <div className="flex justify-between h-14 items-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900">
        {/* Menu Button */}
        <button
          className="flex items-center gap-2 text-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
          Menu
        </button>

        {/* Navigation Links */}
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          {!isConnected && <Link to="/login">Login</Link>} {/* Show Login if not connected */}
          {isConnected && <Link to="/dashboard">Dashboard</Link>} {/* Show Dashboard if connected */}
        </nav>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>

      {/* Sliding Menu */}
      <motion.div
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 shadow-lg z-40 p-6"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button
          className="absolute top-4 right-4 text-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          Close
        </button>
        <nav className="flex flex-col gap-4 mt-8">
          <Link to="/" className="flex items-center gap-2">
            <FaHome />
            Home
          </Link>
          <Link to="/live" className="flex items-center gap-2">
            <FaBell />
            Live
          </Link>
          <Link to="/subscriber" className="flex items-center gap-2">
            <FaHeart />
            Subscriber
          </Link>
          <Link to="/settings" className="flex items-center gap-2">
            <FaCog />
            Settings
          </Link>
        </nav>
      </motion.div>
    </div>
  );
};

export default Header;
