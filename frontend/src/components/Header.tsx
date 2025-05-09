import { ThemeSwitcher } from "./ThemeSwitcher";
import { Avatar, Button } from "@radix-ui/themes";
import { useAuth } from "@hooks/useAuth";
// import logo from "/CCLogo.svg";

const Header = () => {
  const { ready, authenticated, login } = useAuth();

  return (
    <div className="relative">
      <div className="flex h-14 items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-zinc-900">
        <Avatar
          //  src={logo}
          radius="full"
          size={"4"}
          fallback="CC"
        />
        <nav className="hidden gap-4 md:flex">
          {/* Navigation links here */}
        </nav>

        <div className="flex items-center justify-center gap-4">
          {ready && !authenticated && (
            <Button variant="solid" onClick={login}>
              <span className="font-normal">Login</span>
            </Button>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;
