export type User = {
  id: string;
  walletAddress: string;
  role: userRole;
  userName?: string;
  email?: string;
  password?: string;
  favoriteCreators?: string[];
  websiteURL?: string;
};

export type UpdateUser = Omit<
  User,
  "id" | "walletAddress" | "password" | "role"
>;

export type userRole = "creator" | "fan";
