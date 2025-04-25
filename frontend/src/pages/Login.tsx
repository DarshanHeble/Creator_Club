import { Avatar, Box, Heading, Text } from "@radix-ui/themes";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Connect } from "@components/Connect";
import { motion } from "framer-motion";
import { FaGoogleWallet } from "react-icons/fa6";

function Login() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="h-full flex justify-center items-center">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md flex items-center justify-center"
      >
        <Box className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid place-items-center mb-4"
          >
            <Avatar
              fallback={<FaGoogleWallet className="text-6xl" />}
              radius="full"
              color="cyan"
              variant="solid"
              size={"6"}
              highContrast
              className=""
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Heading className="text-3xl font-bold text-center">
              Connect Wallet
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Text
              as="p"
              mb="3"
              size="3"
              className="text-zinc-600 dark:text-zinc-400 text-center"
            >
              Connect your wallet to access the dashboard
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Connect />
          </motion.div>
        </Box>
      </motion.div>
    </div>
  );
}

export default Login;
