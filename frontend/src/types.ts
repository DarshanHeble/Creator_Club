// User Type Interface
export type User = {
  id: string;
  userName: string;
  profilePhoto?: string; // Optional as it might not always be available
  isCreator: boolean;
};

// Connection Status Type
export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "pending"
  | "error";

// Theme Type
export type Theme = "light" | "dark" | "system";
