require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    soneium: {
      url: "https://soneium-minato.rpc.scs.startale.com/?apikey=nOuphkfjI6q6fDc6G0uD0oGHMlKUH8x",
      accounts: ["f84430dd5c00cf608dc653be79f894731781553fda04e19c97f1a56e45795966"], // Replace with your MetaMask test wallet private key
      chainId: 1946,
    },
  },
};