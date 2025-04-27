export type User = {
  id: string;
  walletAddress: string;
  userName?: string;
  email?: string;
  password: string;
  isCreator: boolean;
};

export type userRole = "creator" | "fan";
