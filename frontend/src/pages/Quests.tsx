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
  Skeleton,
  Text,
  TextArea,
  TextField,
  IconButton,
} from "@radix-ui/themes";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Quest, QuestAction, QuestDifficulty } from "@/types";
import { useAuth } from "@hooks/useAuth";
import { questService } from "@services/questService";
import { v4 as createId } from "uuid";
import { useQuery } from "@tanstack/react-query";

const Quests = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [isCreator, setIsCreator] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questList, setQuestList] = useState<Quest[]>([]);
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    rewards: 0,
    questAction: "subscribe" as QuestAction,
    difficulty: "easy" as QuestDifficulty,
    link: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsCreator(user?.id === userId);
  }, [user, userId]);

  const { isFetching: isFetching } = useQuery({
    queryKey: ["quests", userId],
    queryFn: async () => {
      if (!user) return [];
      console.log("Fetching quests for userId:", userId);

      const response = await questService.getQuests(userId!);
      setQuestList(response || []);
      return response; // Assuming `getQuests` returns an array of quests
    },
    enabled: !!userId, // Ensure query runs only if userId is available
  });

  const handleInputChange = (
    key: keyof typeof newQuest,
    value: string | QuestAction | QuestDifficulty,
  ) => {
    setNewQuest({ ...newQuest, [key]: value });
  };

  const handleCreateQuest = async (): Promise<void> => {
    if (!user) return;

    setIsLoading(true);

    const quest: Quest = {
      id: createId(),
      creatorId: user.id,
      creatorName: user.userName || user.email || "Unknown Creator",
      ...newQuest,
      rewards: newQuest.rewards.toString(),
    };

    // Optimistic Update
    setQuestList((prevList) => [...prevList, quest]);

    try {
      console.log(quest);

      await questService.createQuest(quest);

      // Reset new quest form
      resetNewQuest();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating quest:", error);

      // Rollback optimistic update
      setQuestList((prevList) => prevList.filter((q) => q.id !== quest.id));

      // Optionally, show error notification to the user
      // Example: toast.error("Failed to create quest. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to reset the form
  const resetNewQuest = () => {
    setNewQuest({
      title: "",
      description: "",
      rewards: 0,
      questAction: "subscribe",
      difficulty: "easy",
      link: "",
    });
  };

  const handleDeleteQuest = async (questId: string): Promise<void> => {
    if (!user || !isCreator) return;

    // Optimistic Update: Remove the quest from the list immediately
    setQuestList((prevList) => prevList.filter((q) => q.id !== questId));

    try {
      await questService.deleteQuest(user.id, questId);
      // Optionally, show success notification
      // Example: toast.success("Quest deleted successfully!");
    } catch (error) {
      console.error("Error deleting quest:", error);
      // Rollback optimistic update if deletion fails
      // This might involve re-fetching the quest list or adding the quest back
      // For simplicity, we'll rely on the next fetch to correct the list if needed.
      // Example: toast.error("Failed to delete quest. Please try again.");
      // Re-fetch quests to ensure consistency if deletion fails
      // refetch(); // if using refetch from useQuery
    }
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

      {isFetching ? (
        <Grid columns="3" gap="4" className="mt-6">
          {/* Grid is now the top-level component for the loading state */}
          {[1, 2, 3].map((num) => (
            <Box
              key={num}
              className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Use Skeleton to wrap each piece of content that needs a placeholder */}
              <Skeleton>
                <Text as="div" className="mb-2 font-semibold">
                  Loading Title...
                </Text>
              </Skeleton>
              <Skeleton>
                <Text
                  as="div"
                  className="mb-1 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  Loading description line one...
                </Text>
              </Skeleton>
              <Skeleton>
                <Text
                  as="div"
                  className="mb-4 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  And another line for description...
                </Text>
              </Skeleton>
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center">
                  <Skeleton>
                    <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Rewards
                    </Text>
                  </Skeleton>
                  <Skeleton>
                    <Text
                      className={`rounded-full px-2 py-1 text-xs font-medium`}
                    >
                      Difficulty
                    </Text>
                  </Skeleton>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Grid>
      ) : (
        <Grid columns="3" gap="4" className="mt-6">
          {questList.map((quest) => (
            <Box
              key={quest.id}
              className="relative rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {isCreator && (
                <IconButton
                  size="1"
                  variant="soft"
                  color="red"
                  onClick={() => handleDeleteQuest(quest.id)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                  }}
                >
                  <FaTrash />
                </IconButton>
              )}
              <Text className="mb-2 pr-8 font-semibold">{quest.title}</Text>{" "}
              <br />
              <Text className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                {quest.description}
              </Text>
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center">
                  <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {quest.rewards}
                  </Text>
                  <Text
                    className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${getDifficultyColor(
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
      )}

      {/* Create Quest Modal */}
      {isCreator && (
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Content onSubmit={handleCreateQuest}>
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
                  <Select.Item value="comment">Comment</Select.Item>
                  <Select.Item value="watch">Watch</Select.Item>
                  <Select.Item value="vote">Vote</Select.Item>
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
                type="submit"
                disabled={!newQuest.title || !newQuest.description}
                loading={isLoading}
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
