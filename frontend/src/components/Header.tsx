import { useConnectionStatus } from "@hooks/useConnectionStatus";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header = () => {
  const isConnected = useConnectionStatus();

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900">
      <div>Backend is {isConnected ? "Connected" : "Disconnected"}</div>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
