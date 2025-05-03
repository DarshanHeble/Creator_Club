async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Checking balance for account:", deployer.address);

  const tokenAddress = "0x041bE441A4d3F2EEF6697a1949299df6fe9BaC3"; // Your deployed contract address
  const tokenAbi = [
    "function balanceOf(address account) public view returns (uint256)"
  ];
  const tokenContract = await ethers.getContractAt(tokenAbi, tokenAddress, deployer);

  const balance = await tokenContract.balanceOf(deployer.address);
  const formattedBalance = ethers.formatUnits(balance, 18); // Hardcode decimals as 18

  console.log(`Balance of ${deployer.address}: ${formattedBalance} CCT`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});