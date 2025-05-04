import { useTheme } from "next-themes";

 import { Toaster as Sonner, toast as baseToast, ToasterProps } from "sonner";

interface ToastOptions {
  message: string;
  type?: "success" | "error" | "warning" | "info"; // Notification types
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

// Toast function to handle different types
export const toast = ({ message, type = "info" }: ToastOptions) => {
  const typeStyles = {
    success: {
      background: "bg-green-500",
      icon: "✔️",
    },
    error: {
      background: "bg-red-500",
      icon: "❌",
    },
    warning: {
      background: "bg-yellow-500",
      icon: "⚠️",
    },
    info: {
      background: "bg-blue-500",
      icon: "ℹ️",
    },
  };

  const { background, icon } = typeStyles[type];

  baseToast(
    <div
      className={`flex items-center gap-4 rounded-lg p-4 text-white shadow-lg ${background}`}
    >
      <span className="text-xl">{icon}</span>
      <span>{message}</span>
    </div>
  );
};

export { Toaster };
