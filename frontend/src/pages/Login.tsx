import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Connect } from "@components/Connect";
import { motion } from "framer-motion";

export function Login() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <Container className="h-[90vh] flex items-center justify-center">
      <Flex className="w-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex items-center justify-center"
        >
          <Box className="h-full bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
            <Heading className="text-3xl font-bold text-center mb-6">
              Connect Wallet
            </Heading>
            <Text className="text-zinc-600 dark:text-zinc-400 text-center mb-8">
              Connect your wallet to access the dashboard
            </Text>
            <Connect />
          </Box>
        </motion.div>
      </Flex>
    </Container>
  );
}
