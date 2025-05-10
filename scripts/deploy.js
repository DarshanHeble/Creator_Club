async function main() {
  const [deployer] = await ethers.getSigners(); // Get the deployer account
  console.log("Deploying contract with the account:", deployer.address);

  const CreatorClubToken = await ethers.getContractFactory("CreatorClubToken");
  const token = await CreatorClubToken.deploy(deployer.address); // Deploy the contract
  await token.waitForDeployment(); // Wait for the transaction to be mined

  const tokenAddress = await token.getAddress(); // Get the contract address
  console.log("Token deployed to:", tokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});