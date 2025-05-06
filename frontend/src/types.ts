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
  quests?: Quest[];
};

export type userRole = "creator" | "fan";
export type QuestDifficulty = "easy" | "medium" | "hard";

export type Quest = {
  id: string;
  title: string;
  description: string;
  rewards: string;
  difficulty: QuestDifficulty;
  creatorId: string;
  creatorName: string;
};

export type UpdateUser = Omit<
  User,
  "id" | "walletAddress" | "password" | "role" | "profilePhoto"
>;

// type Wallet = {
//   walletAddress: string;
//   chainType: "ethereum" | "solana" | undefined;
// };
