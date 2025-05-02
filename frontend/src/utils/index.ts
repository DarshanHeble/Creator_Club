const API_URL = "https://soneium-minato.rpc.scs.startale.com?apikey=hOuphKfjjI66qfDc6Gz0uD0GhMiKUH8x"; // If Astar or AstarZK is used, this should also be changed.
const API_KEY = "wss://soneium-minato.rpc.scs.startale.com?apikey=hOuphKfjjI66qfDc6Gz0uD0GhMiKUH8x"; // // Replace with your Node RPC API Key.

// RPC request payload
const payload = {
  id: 1,
  jsonrpc: "2.0",
  method: "eth_blockNumber",
};

async function getBlockNumber() {
  const response = await fetch(`${API_URL}?apikey=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  console.log(`Latest block number: ${parseInt(data.result, 16)}`);
}

// Execute the function
getBlockNumber();