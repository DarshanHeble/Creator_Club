async function main() {
    const [deployer] = await ethers.getSigners(); // Get the deployer account
    const CreatorClubToken = await ethers.getContractFactory("CreatorClubToken");
    const token = await CreatorClubToken.deploy(deployer.address); // Pass deployer's address
    await token.deployed();
    console.log("Token deployed to:", token.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });