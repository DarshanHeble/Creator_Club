import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@radix-ui/themes";
import { useAuth } from "@hooks/useAuth";

const Header = () => {
  const { ready, authenticated, login } = useAuth();

  return (
    <div className="relative">
      <div className="flex h-14 items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-zinc-900">
        <div className="logo flex w-10 items-center justify-center rounded-4xl bg-[#ad00ad] p-1.5 text-[larger] font-extrabold text-white dark:bg-[#800080]">
          CC
        </div>
        <nav className="hidden gap-4 md:flex">
          {/* Navigation links here */}
        </nav>

        <div className="flex gap-4">
          {ready && !authenticated && (
            <Button variant="outline" onClick={login}>
              Login
            </Button>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;
