import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@components/ThemeSwitcher";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { userService } from "@services/userService";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaPalette, FaShieldAlt, FaExchangeAlt } from "react-icons/fa";
import { userRole } from "@/types";
import { toast } from "sonner";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<userRole>("fan");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id) return;
      try {
        const userData = await userService.getUser(user.id);
        setUserRole(userData.role || "fan");
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, [user?.id]);

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

  const handleRoleConversion = async () => {
    if (!user?.id) return;

    if (
      userRole === "creator" &&
      !window.confirm(
        "Switching to Fan is irreversible. Are you sure you want to proceed?",
      )
    ) {
      return;
    }

    try {
      const newRole = userRole === "creator" ? "fan" : "creator";
      await userService.updateUserRole(user.id, newRole);
      toast(`Your role has been updated to ${newRole}.`);
      setUserRole(newRole);
      navigate(`/user/${user.id}/dashboard`);
    } catch (error) {
      console.error("Failed to update role:", error);
      toast("Failed to update your role. Please try again.");
    }
  };

  return (
    <Box className="mx-auto max-w-4xl p-6">
      <Heading
        size="5"
        className="mb-8 text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200"
      >
        Settings
      </Heading>

      {/* Theme Settings */}
      <Box className="mb-8">
        <Flex align="center" gap="2" className="mb-4">
          <FaPalette className="text-lg text-blue-500" />
          <Heading
            size="4"
            className="text-lg font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Appearance
          </Heading>
        </Flex>
        <Box className="rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <Text
            as="div"
            size="2"
            className="mb-4 text-sm text-zinc-600 dark:text-zinc-400"
          >
            Choose your preferred theme for the application.
          </Text>
          <ThemeSwitcher />
        </Box>
      </Box>

      {/* Role Conversion */}
      <Box className="mb-8">
        <Flex align="center" gap="2" className="mb-4">
          <FaExchangeAlt className="text-lg text-blue-500" />
          <Heading
            size="4"
            className="text-lg font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Role Conversion
          </Heading>
        </Flex>
        <Box className="rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <Flex direction="column" gap="4">
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              You are currently a <strong>{userRole}</strong>. Click the button
              below to switch your role.
              {userRole === "creator" && (
                <span className="mt-2 block text-sm font-medium text-red-500">
                  Warning: Switching to Fan is irreversible.
                </span>
              )}
            </Text>
            <Button
              color="blue"
              variant="soft"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onClick={handleRoleConversion}
            >
              Switch to {userRole === "creator" ? "Fan" : "Creator"}
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* Account Management */}
      <Box className="mb-8">
        <Flex align="center" gap="2" className="mb-4">
          <FaShieldAlt className="text-lg text-blue-500" />
          <Heading
            size="4"
            className="text-lg font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Account Management
          </Heading>
        </Flex>
        <Box className="rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <Flex direction="column" gap="4">
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              Manage your account settings. You can delete your account
              permanently.
            </Text>
            <Button
              color="red"
              variant="soft"
              className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
