import { ThemeSwitcher } from "@components/ThemeSwitcher";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { userService } from "@services/userService";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaPalette, FaShieldAlt } from "react-icons/fa";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (
      !user?.id ||
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }
    try {
      await userService.deleteUser(user.id);
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <Box className="max-w-4xl p-6">
      <Heading size="5" className="mb-8">
        Settings
      </Heading>

      {/* Theme Settings */}
      <Box className="mb-8">
        <Flex align="center" gap="2" className="mb-4">
          <FaPalette className="text-lg text-zinc-600 dark:text-zinc-400" />
          <Heading size="4">Appearance</Heading>
        </Flex>
        <Box className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Text
            as="div"
            size="2"
            className="mb-2 text-zinc-600 dark:text-zinc-400"
          >
            Choose your preferred theme
          </Text>
          <ThemeSwitcher />
        </Box>
      </Box>

      {/* Notification Settings */}
      {/* <Box className="mb-8">
        <Flex align="center" gap="2" className="mb-4">
          <FaBell className="text-lg text-zinc-600 dark:text-zinc-400" />
          <Heading size="4">Notifications</Heading>
        </Flex>
        <Box className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
              <Text>Email Notifications</Text>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    emailNotifications: checked,
                  }))
                }
              />
            </Flex>
            <Flex justify="between" align="center">
              <Text>Quest Alerts</Text>
              <Switch
                checked={notifications.questAlerts}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    questAlerts: checked,
                  }))
                }
              />
            </Flex>
            <Flex justify="between" align="center">
              <Text>New Followers</Text>
              <Switch
                checked={notifications.newFollowers}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    newFollowers: checked,
                  }))
                }
              />
            </Flex>
            <Flex justify="between" align="center">
              <Text>Content Updates</Text>
              <Switch
                checked={notifications.contentUpdates}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    contentUpdates: checked,
                  }))
                }
              />
            </Flex>
          </Flex>
        </Box>
      </Box> */}

      {/* Account Management */}
      <Box className="mb-8">
        <Flex align="center" gap="2" className="mb-4">
          <FaShieldAlt className="text-lg text-zinc-600 dark:text-zinc-400" />
          <Heading size="4">Account Management</Heading>
        </Flex>
        <Box className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Flex direction="column" gap="4">
            <Button color="red" variant="soft" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
