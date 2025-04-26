import { Avatar, Box, Heading, Text, Link } from "@radix-ui/themes";
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
    <div className="flex h-full items-center justify-around">
      {/* <div className="relative h-[400px] w-[400px] overflow-hidden">
        <motion.div
          initial={{ x: -100, y: 100, opacity: 0 }}
          animate={{ x: 200, y: -200, opacity: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 text-xl font-bold text-purple-600"
        >
          Seamless Rewards
        </motion.div>
        <motion.div
          initial={{ x: 200, y: -200, opacity: 0 }}
          animate={{ x: -100, y: 100, opacity: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 1,
          }}
          className="absolute top-0 right-0 text-xl font-bold text-blue-600"
        >
          Meaningful Connections
        </motion.div>
        <motion.div
          initial={{ x: -100, y: 100, opacity: 0 }}
          animate={{ x: 200, y: -200, opacity: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 2,
          }}
          className="absolute bottom-0 left-0 text-xl font-bold text-teal-600"
        >
          Empower Creators
        </motion.div>
        <motion.div
          initial={{ x: 200, y: -200, opacity: 0 }}
          animate={{ x: -100, y: 100, opacity: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 3,
          }}
          className="absolute top-0 right-0 text-xl font-bold text-indigo-600"
        >
          Web3 Innovation
        </motion.div>
      </div> */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="flex w-full max-w-md items-center justify-center"
      >
        <Box className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 grid place-items-center"
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
            <Heading className="text-center text-3xl font-bold">
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
              className="text-center text-zinc-600 dark:text-zinc-400"
            >
              Connect your wallet to access the Dashboard
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Connect />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Text
              as="p"
              size="2"
              mt="3"
              className="text-center text-zinc-500 dark:text-zinc-400"
            >
              Don't have a wallet?{" "}
              <Link
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                Install MetaMask
              </Link>
            </Text>
            <Text
              as="p"
              size="2"
              className="mt-2 text-center text-zinc-500 dark:text-zinc-400"
            >
              New to Web3? Follow our{" "}
              <Link
                href="https://support.metamask.io/start/getting-started-with-metamask/"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                guide to set up your first wallet
              </Link>
            </Text>
          </motion.div>
        </Box>
      </motion.div>
    </div>
  );
}

export default Login;
