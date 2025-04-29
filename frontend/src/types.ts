export type User = {
  id: string;
  walletAddress: string;
  userName?: string;
  email?: string;
  password?: string;
  role: userRole;
  favoriteCreators: string[];
  websiteURL: string;
};

export type userRole = "creator" | "fan";
