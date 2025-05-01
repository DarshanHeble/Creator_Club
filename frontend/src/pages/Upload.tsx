import { useState } from "react";
import { Box, Button, Flex, Heading, TextArea } from "@radix-ui/themes";

const Upload = () => {
  const [postContent, setPostContent] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");

  const addPollOption = () => {
    if (newOption.trim()) {
      setPollOptions([...pollOptions, newOption]);
      setNewOption("");
    }
  };

  const handleUpload = () => {
    console.log("Post Created:", { postContent, pollQuestion, pollOptions });
    setPostContent("");
    setPollQuestion("");
    setPollOptions([]);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-neutral-800 dark:to-neutral-900 p-6"
    >
      <Box className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-xl dark:bg-zinc-900">
        <Heading size="4" className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-200">
          Create a Post
        </Heading>
        <Flex direction="column" gap="4">
          {/* Post Content */}
          <TextArea
            placeholder="Write your post content here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
          />

          {/* Poll Section */}
          <Heading size="5" className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            Add a Poll (Optional)
          </Heading>
          <input
            type="text"
            placeholder="Enter your poll question"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
          />
          <Flex gap="4">
            <input
              type="text"
              placeholder="Add an option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className="flex-1 px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
            />
            <Button
              variant="soft"
              color="blue"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={addPollOption}
            >
              Add Option
            </Button>
          </Flex>
          <Flex direction="column" gap="2">
            {pollOptions.map((option, index) => (
              <Box key={index} className="text-sm text-zinc-600 dark:text-zinc-400">
                {index + 1}. {option}
              </Box>
            ))}
          </Flex>

          {/* Upload Button */}
          <Button
            variant="soft"
            color="green"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={handleUpload}
          >
            Upload Post
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Upload;