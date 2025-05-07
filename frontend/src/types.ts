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
  completedQuests?: string[];
};

export type userRole = "creator" | "fan";
export type QuestDifficulty = "easy" | "medium" | "hard";

export type QuestAction =
  | "like"
  | "comment"
  | "watch"
  | "subscribe"
  | "follow"
  | "join"
  | "vote";

export type Quest = {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  rewards: string;
  questAction: QuestAction;
  difficulty: QuestDifficulty;
  link?: string;
};

export type UpdateUser = Omit<
  User,
  "id" | "walletAddress" | "password" | "role" | "profilePhoto"
>;

// type Wallet = {
//   walletAddress: string;
//   chainType: "ethereum" | "solana" | undefined;
// };
