import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { FaEdit, FaCamera } from "react-icons/fa";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Firebase imports
// import { db } from "../services/firebase"; // Firebase configuration

const Profile = () => {
  const { user, authenticated, ready } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    bio: "",
    profilePhoto: "",
    bannerPhoto: "",
    followers: 0,
    connections: 0,
    posts: 0,
  });
  const [posts, setPosts] = useState([]); // Dummy posts data
  const [isFollowing, setIsFollowing] = useState(false); // Follow state

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!authenticated && ready) {
      navigate("/");
    }
  }, [authenticated, navigate, ready]);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const userDoc = doc(db, "users", user.id);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setFormData({
            userName: userData.userName || "",
            email: userData.email || "",
            bio: userData.bio || "",
            profilePhoto: userData.profilePhoto || "",
            bannerPhoto: userData.bannerPhoto || "",
            followers: userData.followers || 0,
            connections: userData.connections || 0,
            posts: userData.posts || 0,
          });
          setPosts(userData.posts || []);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Handle follow/unfollow
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Add logic to update followers count in Firebase
  };

  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${formData.userName || "default"}`;

  return (
    <Flex direction="column" align="center" className="min-h-screen p-6">
      {/* Banner Section */}
      <Box className="relative w-full max-w-5xl rounded-lg overflow-hidden shadow-lg">
        <img
          src={formData.bannerPhoto || "https://via.placeholder.com/1200x300"}
          alt="Banner"
          className="h-48 w-full object-cover"
        />
        <div className="absolute bottom-[-36px] left-6">
          <div className="relative h-36 w-36">
            <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 hover:opacity-100">
              <FaCamera className="text-2xl text-white" />
            </div>
          </div>
        </div>
      </Box>

      {/* Profile Info Section */}
      <Box className="mt-16 w-full max-w-5xl rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
  <Flex direction="row" align="center" gap="6">
    {/* Profile Photo */}
    <div className="relative h-36 w-36">
      <img
        src={formData.profilePhoto || avatarUrl}
        alt="Profile"
        className="h-full w-full rounded-full object-cover border-4 border-white shadow-md dark:border-zinc-900"
      />
      <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 hover:opacity-100">
        <FaCamera className="text-2xl text-white" />
      </div>
    </div>

    {/* User Info and Actions */}
    <Flex direction="column" align="start" gap="4" className="flex-1">
      {/* User Info */}
      <Heading size="4" className="text-zinc-800 dark:text-zinc-200">
        {formData.userName || "No Username"}
      </Heading>
      <Text className="text-sm text-zinc-600 dark:text-zinc-400">
        {formData.bio || "No Bio"}
      </Text>

      {/* Action Buttons */}
      <Flex gap="4">
        <Button
          variant="soft"
          color={isFollowing ? "gray" : "blue"}
          onClick={handleFollow}
          className="px-6"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button
          variant="soft"
          color="blue"
          onClick={() => alert("Edit Profile")}
          className="px-6"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </Button>
      </Flex>
    </Flex>
  </Flex>
</Box>
      <Box className="mt-6 w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
        <Flex justify="around" className="text-center">
          <Box>
            <Heading size="4" className="text-zinc-800 dark:text-zinc-200">
              {formData.followers}
            </Heading>
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              Followers
            </Text>
          </Box>
          <Box>
            <Heading size="4" className="text-zinc-800 dark:text-zinc-200">
              {formData.connections}
            </Heading>
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              Connections
            </Text>
          </Box>
          <Box>
            <Heading size="4" className="text-zinc-800 dark:text-zinc-200">
              {formData.posts}
            </Heading>
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              Posts
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Posts Section */}
      <Box className="mt-6 w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
        <Heading
          size="4"
          align="left"
          className="mb-6 text-lg font-bold text-zinc-800 dark:text-zinc-200"
        >
          Posts
        </Heading>
        <Flex wrap="wrap" gap="6" justify="center">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Box
                key={index}
                className="aspect-square w-1/3 overflow-hidden rounded-lg bg-gray-300 shadow-md transition-transform duration-300 hover:scale-105 dark:bg-zinc-700"
              >
                <Text className="p-4 text-sm text-zinc-800 dark:text-zinc-200">
                  {post.content || "No Content"}
                </Text>
              </Box>
            ))
          ) : (
            <Text className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              No posts available.
            </Text>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;
