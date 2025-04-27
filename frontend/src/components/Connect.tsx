import { useEffect, useState } from "react";
import { Card, Grid, Spinner, Text } from "@radix-ui/themes";
import { Connector, useChainId, useConnect } from "wagmi";
import { motion } from "framer-motion";
import { cn } from "@utils/index";
import MetaMaskSvg from "@assets/MetaMask.svg";
import WalletConnectSvg from "@assets/WalletConnect.svg";

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect, status } = useConnect();

  // Filter only MetaMask and WalletConnect connectors
  const filteredConnectors = connectors.filter(
    (connector) =>
      connector.name.toLowerCase().includes("metamask") ||
      connector.name.toLowerCase().includes("walletconnect"),
  );

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <Grid columns="2" gap="3" width="100%">
      {filteredConnectors.map((connector, index) => (
        <motion.div
          key={connector.uid}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.2 }}
          className="h-full w-full"
        >
          <ConnectorButton
            connector={connector}
            onClick={() => connect({ connector, chainId })}
            isLoading={
              status === "pending" &&
              connector.name.toLowerCase().includes("walletconnect")
            }
          />
        </motion.div>
      ))}
    </Grid>
  );
}

export interface ConnectorButtonProps {
  connector: Connector;
  onClick: () => void;
  isLoading: boolean;
}

function ConnectorButton({
  connector,
  onClick,
  isLoading,
}: ConnectorButtonProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Card
      size="4"
      className={cn(
        "flex h-full cursor-pointer flex-col justify-start gap-3 p-6 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800",
        !ready && "relative cursor-not-allowed opacity-50",
      )}
      onClick={ready ? onClick : undefined}
    >
      {connector.name.toLowerCase().includes("metamask") ? (
        <img src={MetaMaskSvg} alt="M" className="w-full" />
      ) : (
        <>
          <img src={WalletConnectSvg} alt="W" className="z-[1] w-full p-2.5" />
          {isLoading && (
            <div className="absolute top-4 left-0 z-10 flex h-full w-full justify-center">
              <Spinner size="3" className="z-10" />
            </div>
          )}
        </>
      )}
      <Text as="p" className="text-center">
        {connector.name}
      </Text>
      {/* {!ready && " (unsupported)"} */}
    </Card>
  );
}
