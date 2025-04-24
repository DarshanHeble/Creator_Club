import { Card, Text, Box, Flex, Avatar } from "@radix-ui/themes";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { FaEthereum } from "react-icons/fa";

export function Account() {
  const { address, connector } = useAccount();
  // const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formatAddress = (addr?: string) => {
    if (!addr) return null;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formattedAddress = formatAddress(address);

  return (
    <Card className="p-4">
      <Flex gap="4" align="center" justify="between">
        <Flex gap="4" align="center">
          <Avatar
            size="5"
            src={
              ensAvatar ||
              `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`
            }
            fallback={<FaEthereum />}
            className="rounded-full bg-zinc-100 dark:bg-zinc-800"
          />
          <Box>
            <Text className="font-medium text-lg">
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </Text>
            {connector && (
              <Text className="text-zinc-600 dark:text-zinc-400 text-sm">
                Connected to {connector.name}
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
}
