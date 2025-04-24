import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { Account } from "@components/Account";
// import { ChainInfo } from "@components/ChainInfo";
import { useAccount, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";

const DashBoard = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/login");
    }
  }, [isConnected, navigate]);

  return (
    <Container>
      <Flex direction="column" gap="6" className="py-8">
        <Flex justify="between" align="center">
          <Heading>Dashboard</Heading>
          <Button
            variant="soft"
            color="red"
            onClick={() => disconnect()}
            className="flex items-center gap-2"
          >
            <FaPowerOff />
            Disconnect
          </Button>
        </Flex>

        <Grid columns="2" gap="4">
          <Box className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
            <Text className="text-zinc-600 dark:text-zinc-400 mb-4">
              Your Account Information
            </Text>
            <Account />
          </Box>

          {/* <Box className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
            <ChainInfo />
          </Box> */}
        </Grid>
      </Flex>
    </Container>
  );
};

export default DashBoard;
