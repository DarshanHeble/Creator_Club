import { useEffect, useState } from "react";
import { Box, Button, Dialog, Flex, Heading, Text } from "@radix-ui/themes";
import { FaEdit, FaSave } from "react-icons/fa";
import { userService } from "@services/userService";
import { useAuth } from "@hooks/useAuth";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface ProfileProps {
  userId: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const { userId } = useParams();
  const { user, authenticated, ready } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    bio: "",
    profilePhoto: "",
  });

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
      // enabled: !!userId,
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

  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${formData.userName || "default"}`;

  const isCurrentUser = user?.id === userId; // Check if the logged-in user is the same as the profile user

  const handleSave = async () => {
    if (!user?.id) return;
    try {
      const updatedData = {
        userName: formData.userName,
        email: formData.email,
        bio: formData.bio,
      };
      await userService.updateUser(user.id, updatedData);
      toast("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    if (!authenticated && ready) {
      navigate("/");
    }
  }, [authenticated, navigate, ready]);

  if (isLoading) return <Text>Loading...</Text>;
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
          </div>

          <Flex direction="column" align="center" gap="2">
            <Heading size="4">{formData.userName || "No Username"}</Heading>
            <Text>{formData.email || "No Email"}</Text>
            <Text>{formData.bio || "No Bio"}</Text>
          </Flex>

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
                      onChange={(e) =>
                        setFormData({ ...formData, userName: e.target.value })
                      }
                      className="w-full rounded border p-2 dark:bg-zinc-800"
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded border p-2 dark:bg-zinc-800"
                    />
                  </label>
                  <label>
                    Bio
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
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
    </Flex>
  );
};

export default Profile;
