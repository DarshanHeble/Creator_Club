import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { userService } from "@services/userService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Hash the password before sending it to the backend
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Generate a unique user ID
      const userId = uuidv4();

      // Send the data to the backend
      await userService.createUser({
        id: userId,
        walletAddress: "", // Provide a default or generated wallet address
        userName: formData.userName,
        email: formData.email,
        password: hashedPassword,
        role: "fan", // Default role is "fan"
      });

      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Error registering user:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-neutral-800 dark:to-neutral-900 p-4"
    >
      <Box className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl dark:bg-zinc-900">
        <Heading
          size="4"
          className="mb-6 text-center text-3xl font-bold text-zinc-800 dark:text-zinc-200"
        >
          Create Your Account
        </Heading>
        {error && (
          <Text className="mb-4 rounded-lg bg-red-100 p-3 text-center text-sm font-medium text-red-600 dark:bg-red-900 dark:text-red-400">
            {error}
          </Text>
        )}
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="6">
            {/* Username Input */}
            <div>
              <label
                htmlFor="userName"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your username"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>  
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="soft"
              color="blue"
              className="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-neutral-800"
            >
              Register
            </Button>
          </Flex>
        </form>

        {/* Login Redirect */}
        <Text className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Button
            variant="ghost"
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;
