import { Button, Flex } from "@radix-ui/themes";
import * as React from "react";
import { Connector, useChainId, useConnect } from "wagmi";
import { motion } from "framer-motion";
import { FaEthereum, FaWallet } from "react-icons/fa";

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();

  return (
    <Flex direction="column" gap="3">
      {connectors.map((connector, index) => (
        <motion.div
          key={connector.uid}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ConnectorButton
            connector={connector}
            onClick={() => connect({ connector, chainId })}
          />
        </motion.div>
      ))}
    </Flex>
  );
}

function ConnectorButton({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button
      size="3"
      variant="soft"
      className="w-full p-6 justify-start gap-3 hover:brightness-95 dark:hover:brightness-110 transition-all"
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name.toLowerCase().includes("metamask") ? (
        <FaEthereum className="text-xl" />
      ) : (
        <FaWallet className="text-xl" />
      )}
      Connect with {connector.name}
    </Button>
  );
}
