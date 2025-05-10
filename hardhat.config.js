require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    soneium: {
      url: "https://rpc.minato.soneium.org", // Temporary public RPC
      accounts: ["f84430dd5c00cf608dc653be79f894731781553fda04e19c97f1a56e45795966"],
      chainId: 1946,
    },
  },
};