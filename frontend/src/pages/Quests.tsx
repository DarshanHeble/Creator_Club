import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { FaPlus } from "react-icons/fa";
import { usePrivy } from "@privy-io/react-auth";

interface Quest {
  id: string;
  title: string;
  description: string;
  rewards: string;
  difficulty: "Easy" | "Medium" | "Hard";
  creatorId: string;
  creatorName: string;
}

// This would typically come from your backend API
const mockQuestTemplates: Omit<Quest, "creatorId" | "creatorName">[] = [
  {
    id: "template1",
    title: "Watch My Latest Video",
    description: "Watch my latest video and leave a thoughtful comment",
    rewards: "50 points",
    difficulty: "Easy",
  },
  {
    id: "template2",
    title: "Share My Content",
    description: "Share one of my posts on your social media",
    rewards: "100 points",
    difficulty: "Medium",
  },
  {
    id: "template3",
    title: "Create Fan Art",
    description: "Create and share fan art inspired by my content",
    rewards: "500 points",
    difficulty: "Hard",
  },
  {
    id: "template4",
    title: "Write a Blog Post Review",
    description: "Write a detailed review of my latest content on your blog",
    rewards: "300 points",
    difficulty: "Hard",
  },
  {
    id: "template5",
    title: "Join Live Stream",
    description: "Attend and participate in my next live streaming session",
    rewards: "75 points",
    difficulty: "Easy",
  },
  {
    id: "template6",
    title: "Community Challenge",
    description: "Complete the weekly community challenge",
    rewards: "150 points",
    difficulty: "Medium",
  },
  {
    id: "template7",
    title: "Fan Theory",
    description: "Create and share an original theory about my content",
    rewards: "200 points",
    difficulty: "Medium",
  },
  {
    id: "template8",
    title: "Discord Moderator",
    description: "Help moderate the community Discord server for a week",
    rewards: "400 points",
    difficulty: "Hard",
  },
  {
    id: "template9",
    title: "Newsletter Subscription",
    description: "Subscribe to my weekly newsletter",
    rewards: "25 points",
    difficulty: "Easy",
  },
];

const Quests = () => {
  const { user } = usePrivy();
  const { userId } = useParams();
  const [isCreator, setIsCreator] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuests, setSelectedQuests] = useState<Quest[]>([]);

  // In a real app, you would fetch the user's role from your backend
  useEffect(() => {
    // Simulating checking if the current user is the creator
    setIsCreator(user?.id === userId);
  }, [user, userId]);

  const handleAddQuest = (
    questTemplate: Omit<Quest, "creatorId" | "creatorName">,
  ) => {
    if (!user) return;

    const newQuest: Quest = {
      ...questTemplate,
      creatorId: user.id,
      creatorName:
        typeof user.email === "string" ? user.email : "Unknown Creator",
    };

    if (!selectedQuests.some((q) => q.id === newQuest.id)) {
      setSelectedQuests([...selectedQuests, newQuest]);
    }
    setIsModalOpen(false);
  };

  const getDifficultyColor = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  return (
    <Box className="p-6">
      <Flex justify="between" align="center" mb="4">
        <Heading size="4">
          {isCreator ? "Your Created Quests" : "Available Quests"}
        </Heading>
        {isCreator && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <FaPlus />
            Create Quest
          </Button>
        )}
      </Flex>

      {/* Quest Grid */}
      <Grid columns="3" gap="4" className="mt-6">
        {selectedQuests.map((quest) => (
          <Box
            key={quest.id}
            className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Text className="mb-2 font-semibold">{quest.title}</Text>
            <Text className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              {quest.description}
            </Text>
            <Flex direction="column" gap="2">
              <Text className="text-sm text-zinc-500 dark:text-zinc-400">
                Created by {quest.creatorName}
              </Text>
              <Flex justify="between" align="center">
                <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {quest.rewards}
                </Text>
                <Text
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(
                    quest.difficulty,
                  )}`}
                >
                  {quest.difficulty}
                </Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>

      {/* Quest Selection Modal - Only shown for creators */}
      {isCreator && (
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Content>
            <Dialog.Title>Create a New Quest</Dialog.Title>
            <Dialog.Description mb="4">
              Choose a quest template to customize for your fans
            </Dialog.Description>

            <Flex direction="column" gap="3">
              {mockQuestTemplates
                .filter(
                  (quest) => !selectedQuests.some((q) => q.id === quest.id),
                )
                .map((quest) => (
                  <Box
                    key={quest.id}
                    className="cursor-pointer rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900"
                    onClick={() => handleAddQuest(quest)}
                  >
                    <Text className="mb-2 font-semibold">{quest.title}</Text>
                    <br />
                    <Text className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {quest.description}
                    </Text>
                    <Flex justify="between" align="center">
                      <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {quest.rewards}
                      </Text>
                      <Text
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(
                          quest.difficulty,
                        )}`}
                      >
                        {quest.difficulty}
                      </Text>
                    </Flex>
                  </Box>
                ))}
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </Box>
  );
};

export default Quests;
