import { Button } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useDarkMode from "@hooks/useDarkMode";
import { BsSun, BsMoon, BsDisplay } from "react-icons/bs";

export const ThemeSwitcher = () => {
  const { themeMode, setTheme } = useDarkMode();

  const getThemeIcon = () => {
    switch (themeMode) {
      case "light":
        return <BsSun size={16} />;
      case "dark":
        return <BsMoon size={16} />;
      default:
        return <BsDisplay size={16} />;
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" className="flex items-center justify-center">
          {getThemeIcon()}
          <span className="font-normal capitalize">{themeMode}</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[120px] rounded-md bg-white p-1 shadow-md dark:bg-zinc-800"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-black outline-none hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
            onSelect={() => setTheme("light")}
          >
            <BsSun size={14} />
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-black outline-none hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
            onSelect={() => setTheme("dark")}
          >
            <BsMoon size={14} />
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-black outline-none hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
            onSelect={() => setTheme("system")}
          >
            <BsDisplay size={14} />
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
