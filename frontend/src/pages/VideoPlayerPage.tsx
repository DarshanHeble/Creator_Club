import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";
import { useState } from "react";

const VideoPlayerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, url, channel } = location.state || {}; // Get video details from navigation state

  const [isPlaying, setIsPlaying] = useState(true);

  if (!title || !url) {
    // Redirect to dashboard if no video details are provided
    navigate("/dashboard");
    return null;
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const subscribeToChannel = () => {
    alert(`Subscribed to ${channel}!`);
  };

  return (
    <Container>
      <Flex direction="column" gap="6" className="py-8">
        {/* Video Title */}
        <Heading size="4">{title}</Heading>

        {/* Video Player */}
        <div className="w-full h-64 bg-black rounded-lg overflow-hidden">
          <iframe
            src={url}
            title={title}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Controls */}
        <Flex gap="4">
          <Button
            variant="soft"
            color="blue"
            className="flex items-center gap-2"
            onClick={togglePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            variant="soft"
            color="red"
            className="flex items-center gap-2"
            onClick={subscribeToChannel}
          >
            <FaHeart />
            Subscribe to {channel}
          </Button>
        </Flex>

        {/* Back to Dashboard */}
        <Button
          variant="soft"
          color="gray"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Flex>
    </Container>
  );
};

export default VideoPlayerPage;