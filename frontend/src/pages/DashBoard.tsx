import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { Account } from "@components/Account";
import { useAccount, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPowerOff, FaPlay } from "react-icons/fa";

// Import local images
import thumbnail1 from "@assets/What is.jpg";
import thumbnail2 from "@assets/What is.jpg";
import thumbnail3 from "@assets/What is.jpg";
const defaultThumbnail = "@assets/default-thumbnail.png";

const DashBoard = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    if (!isConnected) {
      navigate("/login");
    }
  }, [isConnected, navigate]);

  const videos = [
    {
      id: 1,
      title: "Introduction to Creator Club",
      thumbnail: thumbnail1 || defaultThumbnail,
      url: "https://www.example.com/video1", // Replace with actual video URL
    },
    {
      id: 2,
      title: "How to Collaborate with Creators",
      thumbnail: thumbnail2, // Local image
      url: "https://www.example.com/video2", // Replace with actual video URL
    },
    {
      id: 3,
      title: "Tips for Growing Your Audience",
      thumbnail: thumbnail3, // Local image
      url: "https://www.example.com/video3", // Replace with actual video URL
    },
  ];

  const openModal = (video: { title: string; url: string }) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Container>
      <Flex direction="column" gap="6" className="py-8 relative">
        {/* Main Dashboard Content */}
        <Flex justify="between" align="center">
          <Heading>Dashboard</Heading>
          <Button
            variant="soft"
            color="red"
            onClick={() => disconnect()}
            className="flex items-center gap-2"
          >
            <FaPowerOff />
            Disconnect
          </Button>
        </Flex>

        {/* Account Information */}
        <Grid columns="2" gap="4">
          <Box className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
            <Text className="text-zinc-600 dark:text-zinc-400 mb-4">
              Your Account Information
            </Text>
            <Account />
          </Box>
        </Grid>

        {/* Video Section */}
        <Heading size="4" className="mt-8">
          Recommended Videos
        </Heading>
        <Grid columns="3" gap="6">
          {videos.map((video) => (
            <Box
              key={video.id}
              className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded-lg mb-4"
              />
              <Text className="font-bold text-lg mb-2">{video.title}</Text>
              <Button
                variant="soft"
                color="blue"
                className="flex items-center gap-2"
                onClick={() => openModal(video)}
              >
                <FaPlay />
                Watch Now
              </Button>
            </Box>
          ))}
        </Grid>
      </Flex>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
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
              className="w-full h-64 rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </Container>
  );
};

export default DashBoard;
