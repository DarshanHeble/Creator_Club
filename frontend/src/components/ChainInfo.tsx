import { Card, Text, Box, Flex, Badge } from "@radix-ui/themes";
import { useAccount, useBalance, useClient } from "wagmi";
import { formatEther } from "viem";
import { mainnet, optimism, base } from "wagmi/chains";

export function ChainInfo() {
  const { address, chainId } = useAccount();
  const client = useClient();
  const chains = [mainnet, optimism, base];

  const switchNetwork = async (chainId: number) => {
    try {
      await client.switchChain({ chainId });
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };

  return (
    <Box className="space-y-4">
      <Text size="3" weight="bold">
        Available Networks
      </Text>

      <Flex direction="column" gap="3">
        {chains.map((networkChain) => {
          const { data: chainBalance } = useBalance({
            address,
            chainId: networkChain.id,
            enabled: !!address,
          });

          const isConnected = chainId === networkChain.id;

          return (
            <Card
              key={networkChain.id}
              className="overflow-hidden cursor-pointer hover:brightness-95 dark:hover:brightness-110 transition-all"
              onClick={() => !isConnected && switchNetwork(networkChain.id)}
            >
              <Flex justify="between" align="center">
                <Flex direction="column" gap="2">
                  <Flex gap="2" align="center">
                    <Text weight="bold">{networkChain.name}</Text>
                    {isConnected && (
                      <Badge color="green" variant="soft">
                        Connected
                      </Badge>
                    )}
                  </Flex>
                  <Text color="gray" size="2">
                    Chain ID: {networkChain.id}
                  </Text>
                  {networkChain.testnet && (
                    <Badge color="orange" variant="soft">
                      Testnet
                    </Badge>
                  )}
                  {chainBalance && (
                    <Text
                      size="2"
                      weight="medium"
                      className="text-zinc-600 dark:text-zinc-400"
                    >
                      Balance:{" "}
                      {parseFloat(formatEther(chainBalance.value)).toFixed(4)}{" "}
                      {chainBalance.symbol}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
}
