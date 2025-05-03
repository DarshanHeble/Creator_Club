const { ethers } = require("hardhat");
const fetch = require("node-fetch").default;

async function main() {
  const [deployer] = await ethers.getSigners();
  const accountAddress = deployer.address;
  console.log("Checking balance for account:", accountAddress);

  const tokenAddress = "0x041bE441A4d3F2EEF6697a1949299df6fe9BaC3a";

  // Validate addresses
  if (!ethers.isAddress(tokenAddress)) {
    throw new Error(`Invalid token address: ${tokenAddress}`);
  }
  if (!ethers.isAddress(accountAddress)) {
    throw new Error(`Invalid account address: ${accountAddress}`);
  }

  // ABI encode the balanceOf call
  const balanceOfFunctionSignature = "balanceOf(address)";
  const iface = new ethers.Interface([`function ${balanceOfFunctionSignature}`]);
  const data = iface.encodeFunctionData("balanceOf", [accountAddress]);

  // Make a raw JSON-RPC request
  const rpcUrl = "https://rpc.minato.soneium.org";
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_call",
      params: [
        {
          to: tokenAddress.toLowerCase(), // Ensure lowercase address
          data: data
        },
        "latest"
      ],
      id: 1
    })
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(`RPC error: ${JSON.stringify(result.error)}`);
  }

  // Decode the result
  const balance = ethers.AbiCoder.defaultAbiCoder().decode(["uint256"], result.result)[0];
  const formattedBalance = ethers.formatUnits(balance, 18);

  console.log(`Balance of ${accountAddress}: ${formattedBalance} CCT`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});