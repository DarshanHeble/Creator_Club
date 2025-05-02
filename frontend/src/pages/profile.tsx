import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text, Avatar } from "@radix-ui/themes";
import { FaEdit, FaSave } from "react-icons/fa";
import { userService } from "@services/userService"; // Import the userService for API calls
import { useAuth } from "@hooks/useAuth"; // Use the authentication hook for user context

const Profile = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    role: "Fan", // Default role set to Fan
    bio: "",
    followers: 0,
    following: 0,
    posts: 0,
  });
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  // Fetch user data from Firestore on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      try {
        const userData = await userService.getUser(user.id); // Fetch user data from backend
        setFormData({
          userName: userData.userName || "",
          email: userData.email || "",
          role: userData.role || "Fan",
          bio: userData.bio || "",
          followers: userData.followers || 0,
          following: userData.following || 0,
          posts: userData.posts || 0,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    try {
      await userService.updateUser(user.id, {
        userName: formData.userName,
        email: formData.email,
        bio: formData.bio,
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePhotoOptionClick = () => {
    setShowPhotoOptions(true);
  };

  const closePhotoOptions = () => {
    setShowPhotoOptions(false);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-neutral-800 dark:to-neutral-900 p-6"
    >
      {/* Profile Section */}
      <Box className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-xl dark:bg-zinc-900">
        <Flex direction="column" align="center" gap="6">
          {/* Profile Picture */}
          <Avatar
            style={{ width: 150, height: 150 }}
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${formData.userName}`}
            fallback={<span className="text-4xl font-bold">{formData.userName[0]}</span>}
            className="rounded-full bg-zinc-100 dark:bg-zinc-800 border-4 border-blue-500"
          />
          {isEditing && (
            <Button
              variant="soft"
              color="blue"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handlePhotoOptionClick}
            >
              Change Photo
            </Button>
          )}

          {isEditing ? (
            <Flex direction="column" gap="4" className="w-full">
              {/* Username */}
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                />
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                />
              </div>
            </Flex>
          ) : (
            <Flex direction="column" align="center" gap="2">
              <Heading size="4" className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                {formData.userName}
              </Heading>
              <Text className="text-center text-sm text-zinc-600 dark:text-zinc-400">{formData.email}</Text>
              <Text className="text-center text-sm text-blue-500">{formData.role}</Text>
              <Text className="text-center text-sm text-zinc-600 dark:text-zinc-400">{formData.bio}</Text>
            </Flex>
          )}

          {/* Followers, Following, and Posts */}
          <Flex gap="8" className="mt-4">
            <Box className="text-center">
              <Text className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{formData.posts}</Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">Posts</Text>
            </Box>
            <Box className="text-center">
              <Text className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{formData.followers}</Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">Followers</Text>
            </Box>
            <Box className="text-center">
              <Text className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{formData.following}</Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">Following</Text>
            </Box>
          </Flex>

          {/* Edit/Save Button */}
          <Button
            variant="soft"
            color={isEditing ? "green" : "blue"}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={isEditing ? handleSave : handleEditToggle}
          >
            {isEditing ? <FaSave /> : <FaEdit />}
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </Flex>
      </Box>

      {/* Posts Section */}
      <Box className="flex-1 mt-8 p-4 w-full max-w-4xl bg-white rounded-lg shadow-xl dark:bg-zinc-900">
        <Heading size="4" className="mb-6 text-lg font-bold text-zinc-800 dark:text-zinc-200 text-center">
          Posts
        </Heading>
        <Flex wrap="wrap" gap="6" justify="center">
          {[...Array(9)].map((_, index) => (
            <Box
              key={index}
              className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              {/* Placeholder for post content */}
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;
