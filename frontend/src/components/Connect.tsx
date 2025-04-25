import { useEffect, useState } from "react";
import { Card, Grid, Text } from "@radix-ui/themes";
import { Connector, useChainId, useConnect } from "wagmi";
import { motion } from "framer-motion";
import { cn } from "@utils/index";
import MetaMaskSvg from "../assets/MetaMask.svg";
import WalletConnectSvg from "../assets/WalletConnect.svg";

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();

  // Filter only MetaMask and WalletConnect connectors
  const filteredConnectors = connectors.filter(
    (connector) =>
      connector.name.toLowerCase().includes("metamask") ||
      connector.name.toLowerCase().includes("walletconnect")
  );

  return (
    <Grid columns="2" gap="3" width="100%">
      {filteredConnectors.map((connector, index) => (
        <motion.div
          key={connector.uid}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.2 }}
          className="w-full h-full"
          // style={{ width: "100%" }}
        >
          <ConnectorButton
            connector={connector}
            onClick={() => connect({ connector, chainId })}
          />
        </motion.div>
      ))}
    </Grid>
  );
}

function ConnectorButton({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
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
        "p-6 h-full flex flex-col justify-start gap-3 transition-all cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800",
        !ready && "opacity-50 cursor-not-allowed"
      )}
      onClick={ready ? onClick : undefined}
    >
      {connector.name.toLowerCase().includes("metamask") ? (
        <img src={MetaMaskSvg} alt="M" className="w-full" />
      ) : (
        // <SiWalletconnect className="text-6xl" />
        <img src={WalletConnectSvg} alt="W" className="w-full p-2.5" />
      )}
      <Text as="p" className="text-center">
        {connector.name}
      </Text>
      {/* {!ready && " (unsupported)"} */}
    </Card>
  );
}
