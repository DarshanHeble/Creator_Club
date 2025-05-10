import { Quest } from "@/types";

// This would typically come from your backend API
export const mockQuestTemplates: Omit<Quest, "creatorId" | "creatorName">[] = [
  {
    id: "template1",
    title: "Watch My Latest Video",
    description: "Watch my latest video and leave a thoughtful comment",
    rewards: "50 points",
    difficulty: "easy",
  },
  {
    id: "template2",
    title: "Share My Content",
    description: "Share one of my posts on your social media",
    rewards: "100 points",
    difficulty: "medium",
  },
  {
    id: "template3",
    title: "Create Fan Art",
    description: "Create and share fan art inspired by my content",
    rewards: "500 points",
    difficulty: "hard",
  },
  {
    id: "template4",
    title: "Write a Blog Post Review",
    description: "Write a detailed review of my latest content on your blog",
    rewards: "300 points",
    difficulty: "hard",
  },
  {
    id: "template5",
    title: "Join Live Stream",
    description: "Attend and participate in my next live streaming session",
    rewards: "75 points",
    difficulty: "easy",
  },
  {
    id: "template6",
    title: "Community Challenge",
    description: "Complete the weekly community challenge",
    rewards: "150 points",
    difficulty: "medium",
  },
  {
    id: "template7",
    title: "Fan Theory",
    description: "Create and share an original theory about my content",
    rewards: "200 points",
    difficulty: "medium",
  },
  {
    id: "template8",
    title: "Discord Moderator",
    description: "Help moderate the community Discord server for a week",
    rewards: "400 points",
    difficulty: "hard",
  },
  {
    id: "template9",
    title: "Newsletter Subscription",
    description: "Subscribe to my weekly newsletter",
    rewards: "25 points",
    difficulty: "easy",
  },
];
