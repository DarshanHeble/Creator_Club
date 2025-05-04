import { useTheme } from "@components/theme/ThemeProvider";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();
  // console.log(resolvedTheme, "Resolved Theme");

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      // className="toaster group bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      // style={
      //   {
      //     "--normal-bg": "var(--popover)",
      //     "--normal-text": "var(--popover-foreground)",
      //     "--normal-border": "var(--border)",
      //   } as React.CSSProperties
      // }
      {...props}
    />
  );
};

export { Toaster };
