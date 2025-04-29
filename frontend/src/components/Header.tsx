import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@radix-ui/themes";
import { useLogin, usePrivy } from "@privy-io/react-auth";

const Header = () => {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();

  return (
    <div className="relative">
      <div className="flex h-14 items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-zinc-900">
        {/* Navigation Links */}
        <nav className="hidden gap-4 md:flex">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div className="flex gap-4">
          {ready && !authenticated && (
            <Button variant="outline" onClick={login}>
              Login
            </Button>
          )}
          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;
