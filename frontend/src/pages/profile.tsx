import { useState } from "react";
import { Box, Button, Flex, Heading, Text, Avatar } from "@radix-ui/themes";
import { FaEdit, FaSave } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "John Doe",
    email: "johndoe@example.com",
    role: "Creator",
    bio: "Passionate creator connecting with fans worldwide.",
    followers: 334,
    following: 442,
    posts: 4,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
    setIsEditing(false);
  };

  return (
    <Flex
      direction="column"
      className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-neutral-800 dark:to-neutral-900"
    >
      {/* Profile Section */}
      <Box className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl dark:bg-zinc-900">
        <Flex direction="column" align="center" gap="6">
          {/* Profile Picture */}
          <Avatar
            style={{ width: 200, height: 150 }}
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${formData.userName}`}
            fallback={<span className="text-3xl font-bold">{formData.userName[0]}</span>} // Adjusted font size for fallback
            className="rounded-full bg-zinc-100 dark:bg-zinc-800"
          />

          {/* User Information */}
          <Heading size="4" className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            {formData.userName}
          </Heading>
          <Text className="text-center text-sm text-zinc-600 dark:text-zinc-400">{formData.email}</Text>
          <Text className="text-center text-sm text-blue-500">{formData.role}</Text>

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

          {/* Bio Section */}
          <Box className="w-full">
            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Bio
            </label>
            {isEditing ? (
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
              />
            ) : (
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">{formData.bio}</Text>
            )}
          </Box>

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

      {/* Post Section */}
      <Box className="flex-1 mt-8 p-4 overflow-y-auto">
        <Heading size="4" className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-200 text-center">
          Posts
        </Heading>
        <Flex wrap="wrap" gap="4" justify="center">
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
          <Box className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg"></Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;