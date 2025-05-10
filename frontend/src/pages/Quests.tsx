import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { FaPlus } from "react-icons/fa";
import { Quest, QuestAction, QuestDifficulty } from "@/types";
import { useAuth } from "@hooks/useAuth";
import { questService } from "@services/questService";
import { v4 as createId } from "uuid";

const Quests = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [isCreator, setIsCreator] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuests, setSelectedQuests] = useState<Quest[]>([]);
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    rewards: "",
    questAction: "subscribe" as QuestAction,
    difficulty: "easy" as QuestDifficulty,
    link: "",
  });

  useEffect(() => {
    setIsCreator(user?.id === userId);
  }, [user, userId]);

  const handleInputChange = (
    key: keyof typeof newQuest,
    value: string | QuestAction | QuestDifficulty,
  ) => {
    setNewQuest({ ...newQuest, [key]: value });
  };

  const handleCreateQuest = async (): Promise<void> => {
    if (!user) return;

    const quest: Quest = {
      id: createId(),
      creatorId: user.id,
      creatorName: user.userName || user.email || "Unknown Creator",
      ...newQuest,
    };

    await questService.createQuest(user.id, quest);

    setSelectedQuests([...selectedQuests, quest]);
    setNewQuest({
      title: "",
      description: "",
      rewards: "",
      questAction: "subscribe",
      difficulty: "easy",
      link: "",
    });

    setIsModalOpen(false);
  };

  const getDifficultyColor = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "hard":
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
            <Text className="mb-2 font-semibold">{quest.title}</Text> <br />
            <Text className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              {quest.description}
            </Text>
            <Flex direction="column" gap="2">
              {/* <Text className="text-sm text-zinc-500 dark:text-zinc-400">
                Created by {quest.creatorName}
              </Text> */}
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

      {/* Create Quest Modal */}
      {isCreator && (
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Content>
            <Dialog.Title>Create a New Quest</Dialog.Title>
            <Dialog.Description mb="4">
              Fill in the details to create a new quest for your fans.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <TextField.Root
                placeholder="Quest Title"
                value={newQuest.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>

              <TextArea
                placeholder="Quest Description"
                value={newQuest.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />

              <TextField.Root
                placeholder="Rewards (e.g., 10 tokens)"
                type="number"
                value={newQuest.rewards}
                onChange={(e) => handleInputChange("rewards", e.target.value)}
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>

              <Select.Root
                // value={newQuest.questAction}
                onValueChange={(value) =>
                  handleInputChange("questAction", value as QuestAction)
                }
                defaultValue="subscribe"
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="subscribe">Subscribe</Select.Item>
                  <Select.Item value="join">Join</Select.Item>
                  <Select.Item value="like">Like</Select.Item>
                  {/* <Select.Item value="comment">Comment</Select.Item> */}
                  {/* <Select.Item value="watch">Watch</Select.Item> */}
                  {/* <Select.Item value="vote">Vote</Select.Item> */}
                  {/* <Select.Item value="follow">Follow</Select.Item> */}
                </Select.Content>
              </Select.Root>
              <Select.Root
                value={newQuest.difficulty}
                onValueChange={(value) =>
                  handleInputChange("difficulty", value as QuestDifficulty)
                }
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="easy">Easy</Select.Item>
                  <Select.Item value="medium">Medium</Select.Item>
                  <Select.Item value="hard">Hard</Select.Item>
                </Select.Content>
              </Select.Root>
              {/* <input
                placeholder="Optional Link (e.g., https://example.com)"
                value={newQuest.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
              /> */}

              <TextField.Root
                placeholder="Optional Link (e.g., https://example.com)"
                value={newQuest.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                onClick={handleCreateQuest}
                disabled={!newQuest.title || !newQuest.description}
              >
                Create
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </Box>
  );
};

export default Quests;
