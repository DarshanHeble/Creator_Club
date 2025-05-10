import { ethers } from "ethers";

const rpc = "https://rpc.minato.soneium.org/";
// Connect to the Soneium Minato RPC
const provider = new ethers.JsonRpcProvider(rpc);

async function getBalance(address: string) {
  try {
    // Ensure the address is in valid checksum format
    if (!ethers.isAddress(address)) {
      throw new Error("Invalid wallet address");
    }

    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

export default getBalance;
