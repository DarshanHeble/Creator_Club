import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { FaEdit, FaSave } from "react-icons/fa";
import { userService } from "@services/userService"; // Import the userService for API calls
import { useAuth } from "@hooks/useAuth"; // Use the authentication hook for user context

const Profile = () => {
  const { privyUser: user } = useAuth(); // Get the authenticated user
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    role: "Fan", // Default role set to Fan
    bio: "",
    profilePhoto: "",
    followers: 0,
    following: 0,
    posts: 0,
  });
  const [posts, setPosts] = useState<any[]>([]); // State to store posts
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  // Fetch user data and posts from Firestore on component mount
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
          profilePhoto: userData.profilePhoto || "",
          followers: userData.followers || 0,
          following: userData.following || 0,
          posts: userData.posts || 0,
        });

        // Fetch posts for the user
        const userPosts = await userService.getUserPosts(user.id);
        setPosts(userPosts);
      } catch (error) {
        console.error("Failed to fetch user data or posts:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    try {
      const updatedData: any = {
        userName: formData.userName,
        email: formData.email,
        bio: formData.bio,
      };

      // If a new photo is selected, upload it
      if (selectedPhoto) {
        const photoUrl = await userService.uploadProfilePhoto(user.id, selectedPhoto);
        updatedData.profilePhoto = photoUrl;
      }

      await userService.updateUser(user.id, updatedData);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhoto(e.target.files[0]);
    }
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
          <div className="relative">
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                No Photo
              </div>
            )}
            {isEditing && (
              <div className="mt-4">
                <label htmlFor="profilePhoto" className="cursor-pointer text-blue-500">
                  Change Photo
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            )}
          </div>

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
          {posts.map((post, index) => (
            <Box
              key={index}
              className="w-1/3 aspect-square bg-gray-300 dark:bg-zinc-700 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <Text className="p-4 text-sm text-zinc-800 dark:text-zinc-200">{post.content}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;
