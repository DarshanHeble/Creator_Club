import { useConnectionStatus } from "@hooks/useConnectionStatus";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header = () => {
  const isConnected = useConnectionStatus();

  return (
    <div>
      <div>Backend is {isConnected ? "Connected" : "Disconnected"}</div>
      <nav className="flex gap-4">
        <Link to="/">Landing</Link>
        <Link to="/login">Login</Link>
      </nav>
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
