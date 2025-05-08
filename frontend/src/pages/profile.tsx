import { useEffect, useState } from "react";
import { Box, Button, Dialog, Flex, Heading, Text } from "@radix-ui/themes";
import { FaEdit, FaSave, FaPlus } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { userService } from "@services/userService";
import { useAuth } from "@hooks/useAuth";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "@components/Loading";
import { uploadToCloudinary } from "@services/cloud";

const Profile = () => {
  const { userId } = useParams();

  const { user, authenticated, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    // If not, redirect to the login page
    if (!authenticated && ready) {
      navigate("/");
    }
  }, [authenticated, navigate, ready]);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    bio: "",
    profilePhoto: "",
  });

  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [posts] = useState([]); // State to store posts

  // Fetch user data using react-query
  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useQuery(
    {
      queryKey: ["user", userId],
      queryFn: async () => {
        if (!userId) return null;
        const userData = await userService.getUser(userId);
        return userData;
      },
      enabled: !!userId,
    }, // Ensure the query is only triggered if userId exists
  );
  console.log(fetchedUser, "Fetched User Data");

  useEffect(() => {
    if (fetchedUser) {
      setFormData({
        userName: fetchedUser.userName || "",
        email: fetchedUser.email || "",
        bio: fetchedUser.bio || "",
        profilePhoto: fetchedUser.profilePhoto || "",
      });
    }
  }, [fetchedUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhoto(e.target.files[0]);
      setIsPhotoDialogOpen(true); // Open the dialog when a photo is selected
    }

    // Reset the input value to allow the user to select the same file again if needed
    e.target.value = "";
  };

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return;

    try {
      // Upload the photo to Cloudinary
      const response = await uploadToCloudinary(selectedPhoto);

      // Log the full response if needed
      console.log("Cloudinary Response:", response);

      // Update the formData with the raw response or any specific field if needed
      setFormData({ ...formData, profilePhoto: response.secure_url });

      // Optionally, update the user's profile photo in the backend
      if (user?.id) {
        await userService.updateUser(user.id, {
          profilePhoto: response.secure_url,
        });
        toast.success("Profile photo updated successfully!");
      }

      setIsPhotoDialogOpen(false);
    } catch (error) {
      console.error("Failed to upload profile photo:", error);
      toast.error("Failed to upload photo. Please try again.");
      setIsPhotoDialogOpen(false);
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    try {
      const updatedData = {
        userName: formData.userName,
        email: formData.email,
        bio: formData.bio,
      };
      await userService.updateUser(user.id, updatedData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };
  const isCurrentUser = user?.id === userId; // Check if the logged-in user is the same as the profile user

  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${formData.userName || "default"}`;

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <Text>Failed to load user data</Text>;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen p-6"
    >
      <Box className="w-full max-w-4xl rounded-lg p-8 shadow-xl dark:bg-zinc-900">
        <Flex direction="row" align="center" gap="6">
          {/* Profile Photo Section */}
          <div className="relative h-36 w-36">
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <img
                src={avatarUrl}
                alt="Generated Avatar"
                className="h-full w-full rounded-full object-cover"
              />
            )}
            {/* Camera Icon on Hover */}
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 hover:opacity-100"
              onClick={() => document.getElementById("file-input")?.click()} // Trigger the file input
            >
              <MdOutlineEdit className="cursor-pointer text-2xl text-white" />
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* User Info Section */}
          <Flex direction="column" align="center" gap="2">
            <Heading size="4">{formData.userName || "No Username"}</Heading>
            <Text>{formData.email || "No Email"}</Text>
            <Text>{formData.bio || "No Bio"}</Text>
          </Flex>

          {/* Edit Info Dialog */}
          {isCurrentUser && (
            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant="soft" color="blue" className="mt-4">
                  <FaEdit />
                  Edit Profile
                </Button>
              </Dialog.Trigger>
              <Dialog.Content className="max-w-md p-6">
                <Dialog.Title>Edit Profile</Dialog.Title>
                <Dialog.Description>
                  Update your profile information below.
                </Dialog.Description>
                <Flex direction="column" gap="4" className="mt-4">
                  <label>
                    Username
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="w-full rounded border p-2 dark:bg-zinc-800"
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded border p-2 dark:bg-zinc-800"
                    />
                  </label>
                  <label>
                    Bio
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full rounded border p-2 dark:bg-zinc-800"
                    />
                  </label>
                </Flex>
                <Flex justify="end" className="mt-6 gap-4">
                  <Dialog.Close>
                    <Button variant="soft">Cancel</Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button variant="soft" color="green" onClick={handleSave}>
                      <FaSave />
                      Save
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          )}
        </Flex>
      </Box>

      {/* Profile Photo Dialog */}
      {isPhotoDialogOpen && (
        <Dialog.Root
          open={isPhotoDialogOpen}
          onOpenChange={setIsPhotoDialogOpen}
        >
          <Dialog.Content className="max-w-sm p-6">
            <Dialog.Title>Update Profile Photo</Dialog.Title>
            <Dialog.Description>
              Preview and confirm your new profile photo.
            </Dialog.Description>
            <Flex direction="column" gap="4" className="mt-4">
              {selectedPhoto && (
                <>
                  {/* Image Preview */}
                  <img
                    src={URL.createObjectURL(selectedPhoto)}
                    alt="Selected Photo"
                    className="mx-auto h-40 w-40 rounded-full object-cover"
                  />
                  {/* Image Data Display */}
                  <div className="rounded-lg border p-4 shadow-sm">
                    <p>
                      <strong>File Name:</strong> {selectedPhoto.name}
                    </p>
                    <p>
                      <strong>File Size:</strong>{" "}
                      {(selectedPhoto.size / 1024).toFixed(2)} KB
                    </p>
                    <p>
                      <strong>File Type:</strong> {selectedPhoto.type}
                    </p>
                  </div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-4"
              />
            </Flex>
            <Flex justify="end" className="mt-6 gap-4">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  <FaPlus className="rotate-45" />
                  Cancel
                </Button>
              </Dialog.Close>
              <Button variant="soft" color="green" onClick={handlePhotoUpload}>
                <FaSave />
                Upload
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}

      {/* Posts Section */}
      <Box className="mt-8 w-full max-w-4xl flex-1 rounded-lg bg-white p-4 shadow-xl dark:bg-zinc-900">
        <Heading
          size="4"
          align={"left"}
          className="mb-6 text-center text-lg font-bold text-zinc-800 dark:text-zinc-200"
        >
          Posts
        </Heading>
        <Flex wrap="wrap" gap="6" justify="center">
          {posts.map((post, index) => (
            <Box
              key={index}
              className="aspect-square w-1/3 overflow-hidden rounded-lg bg-gray-300 shadow-md transition-transform duration-300 hover:scale-105 dark:bg-zinc-700"
            >
              <Text className="p-4 text-sm text-zinc-800 dark:text-zinc-200">
                {post.content || "No Content"}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;
