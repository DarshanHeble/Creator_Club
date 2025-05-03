export type User = {
  id: string;
  walletAddress: string;
  role: userRole;
  userName?: string;
  bio?: string;
  email?: string;
  password?: string;
  profilePhoto?: string;
  favoriteCreators?: string[];
  websiteURL?: string;
};

// type Wallet = {
//   walletAddress: string;
//   chainType: "ethereum" | "solana" | undefined;
// };

export type UpdateUser = Omit<
  User,
  "id" | "walletAddress" | "password" | "role" | "profilePhoto"
>;

export type userRole = "creator" | "fan";

export type Quest = {
  id: string;
  title: string;
  description: string;
  rewards: string;
  difficulty: "Easy" | "Medium" | "Hard";
  creatorId: string;
  creatorName: string;
};
