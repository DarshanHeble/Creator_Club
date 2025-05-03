import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPowerOff, FaPlay, FaSearch } from "react-icons/fa";

// Import local images
import thumbnail1 from "@assets/What is.jpg";
import thumbnail2 from "@assets/What is.jpg";
import thumbnail3 from "@assets/What is.jpg";
import { useAuth } from "@hooks/useAuth";
const defaultThumbnail = "@assets/default-thumbnail.png";

const DashBoard = () => {
  const { user, authenticated, logout } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    // Check if the user is authenticated
    // If not, redirect to the login page
    if (!authenticated) {
      navigate("/user/");
    }
  }, [authenticated, navigate]);

  const openVideoPage = (video: {
    title: string;
    url: string;
    channel: string;
  }) => {
    navigate("/video", { state: video });
  };

  const videos = [
    {
      id: 1,
      title: "Introduction to Creator Club",
      thumbnail: thumbnail1 || defaultThumbnail,
      url: "https://www.youtube.com/watch?v=oROwuFMkNc0&ab_channel=ZakirKhan",
      channel: "Creator Club Official",
    },
    {
      id: 2,
      title: "How to Collaborate with Creators",
      thumbnail: thumbnail2,
      url: "https://www.example.com/video2",
      channel: "Collaboration Hub",
    },
    {
      id: 3,
      title: "Tips for Growing Your Audience",
      thumbnail: thumbnail3,
      url: "https://www.example.com/video3",
      channel: "Audience Growth Tips",
    },
  ];

  // const openModal = (video: { title: string; url: string }) => {
  //   setSelectedVideo(video);
  //   setIsModalOpen(true);
  // };
  // Removed unused openModal function

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Search Bar */}
      <div
        onClick={() => navigate(`/user/${user?.id}/search`)} // Or replace with <Link href="/search"> for Next.js
        className="flex w-full max-w-4xl cursor-pointer items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
      >
        <FaSearch className="mr-2 text-zinc-500 dark:text-zinc-400" />
        <span className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-500 focus:outline-none dark:text-zinc-200 dark:placeholder-zinc-400">
          Search for creators...
        </span>
      </div>
      <Flex direction="column" gap="6" className="relative py-8">
        {/* Main Dashboard Content */}
        <Flex justify="between" align="center">
          <Heading>Dashboard</Heading>
          <Button
            variant="soft"
            color="red"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2"
          >
            <FaPowerOff />
            Disconnect
          </Button>
        </Flex>

        {/* Account Information */}
        <Grid columns="2" gap="4">
          <Box className="rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <Heading className="mb-4 text-zinc-600 dark:text-zinc-400">
              Your Account Information
            </Heading>
            <br />
            <Box>
              <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Name:
              </Text>{" "}
              <Text className="mb-2 text-zinc-800 dark:text-zinc-200">
                {user?.userName || "No Username"}
              </Text>
              <br />
              <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Email:
              </Text>{" "}
              <Text className="mb-4 text-zinc-800 dark:text-zinc-200">
                {user?.email || "No Email"}
              </Text>
            </Box>

            {/* Wallet Information */}
            <Box className="mt-4 border-t border-zinc-200 pt-3 dark:border-zinc-800">
              <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Wallet Address:
              </Text>{" "}
              <Text className="mb-2 text-zinc-800 dark:text-zinc-200">
                {user?.walletAddress || "No Wallet Address"}
              </Text>
              <br />
              <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Balance:
              </Text>{" "}
              <Text className="text-zinc-800 dark:text-zinc-200">null </Text>
            </Box>
          </Box>
        </Grid>

        {/* Video Section */}
        <Heading size="4" className="mt-8">
          Recommended Videos
        </Heading>
        <Flex wrap="wrap" gap="6" className="justify-start">
          {videos.map((video) => (
            <Box
              key={video.id}
              className="flex w-full flex-col rounded-lg border border-zinc-200 bg-white p-4 shadow-lg sm:w-[48%] lg:w-[30%] dark:border-zinc-800 dark:bg-zinc-900"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="mb-4 rounded-lg"
              />
              <Text className="mb-2 text-lg font-bold">{video.title}</Text>
              <Button
                variant="soft"
                color="blue"
                className="mt-auto flex items-center gap-2"
                onClick={() => openVideoPage(video)}
              >
                <FaPlay />
                Watch Now
              </Button>
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-[90%] max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
            <Flex justify="between" align="center" className="mb-4">
              <Heading size="4">{selectedVideo.title}</Heading>
              <Button
                variant="soft"
                color="red"
                onClick={closeModal}
                className="flex items-center gap-2"
              >
                Close
              </Button>
            </Flex>
            <iframe
              src={selectedVideo.url}
              title={selectedVideo.title}
              className="h-64 w-full rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
