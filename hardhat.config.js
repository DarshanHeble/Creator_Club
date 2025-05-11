require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    soneium: {
      url: "https://rpc.minato.soneium.org", // Temporary public RPC
      accounts: [
        "12f0f4c1115b1f9cb77fd70eff3e7fec092f3c4775e016018cd2e8ce740e3312",
      ],
      chainId: 1946,
    },
  },
};
