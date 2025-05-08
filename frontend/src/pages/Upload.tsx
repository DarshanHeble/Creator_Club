import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { Box, Button, Flex, Heading, TextArea } from "@radix-ui/themes";
import { FaPaperclip, FaPoll } from "react-icons/fa";
import { uploadToCloudinary } from "@services/CloudinaryServices"; // Import the Cloudinary upload function

const Upload = () => {
  const [postContent, setPostContent] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [showPollSection, setShowPollSection] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect fans to the dashboard
  useEffect(() => {
    if (user?.role !== "creator") {
      navigate("/user/dashboard");
    }
  }, [user?.role, navigate]);

  const addPollOption = () => {
    if (newOption.trim()) {
      setPollOptions([...pollOptions, newOption]);
      setNewOption("");
    }
  };

  const handleUpload = async () => {
    try {
      let mediaUrl = null;

      // Upload the attachment to Cloudinary if it exists
      if (attachment) {
        mediaUrl = await uploadToCloudinary(attachment);
        console.log("Uploaded media URL:", mediaUrl);
      }

      // Log the post data
      console.log("Post Created:", {
        postContent,
        pollQuestion,
        pollOptions,
        mediaUrl, // Include the uploaded media URL
      });

      // Reset the form
      setPostContent("");
      setPollQuestion("");
      setPollOptions([]);
      setAttachment(null);
      setShowPollSection(false);
    } catch (error) {
      console.error("Failed to upload post:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 dark:from-neutral-800 dark:to-neutral-900"
    >
      <Box className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-xl dark:bg-zinc-900">
        <Heading
          size="4"
          className="mb-6 text-lg font-bold text-zinc-800 dark:text-zinc-200"
        >
          Create a Post
        </Heading>
        <Flex direction="column" gap="6">
          {/* Post Content */}
          <TextArea
            placeholder="Write your post content here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
          />

          {/* Attachment Section */}
          <Flex gap="4" align="center">
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer items-center gap-2 text-blue-500"
            >
              <FaPaperclip className="text-lg" />
              <span>Attach File</span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {attachment && (
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Attached: {attachment.name}
              </span>
            )}
          </Flex>

          {/* Poll Section Toggle */}
          <Flex gap="4" align="center">
            <button
              onClick={() => setShowPollSection(!showPollSection)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              <FaPoll className="text-lg" />
              <span>{showPollSection ? "Remove Poll" : "Add Poll"}</span>
            </button>
          </Flex>

          {/* Poll Section */}
          {showPollSection && (
            <Flex
              direction="column"
              gap="4"
              className="rounded-lg border border-zinc-300 p-4 dark:border-zinc-600"
            >
              <input
                type="text"
                placeholder="Enter your poll question"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
              />
              <Flex gap="4">
                <input
                  type="text"
                  placeholder="Add an option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
                />
                <Button
                  variant="soft"
                  color="blue"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  onClick={addPollOption}
                >
                  Add Option
                </Button>
              </Flex>
              <Flex direction="column" gap="2">
                {pollOptions.map((option, index) => (
                  <Box
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-2 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {index + 1}. {option}
                  </Box>
                ))}
              </Flex>
            </Flex>
          )}

          {/* Upload Button */}
          <Button
            variant="soft"
            color="green"
            className="w-full rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
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
