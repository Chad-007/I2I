const TrustGame = await ethers.getContractFactory("TrustGame");
const trustGame = await TrustGame.deploy(
  tokenAddress,
  ethers.parseEther("10"), // stake amount
  deployer.address          // owner
);
await trustGame.waitForDeployment();
console.log("TrustGame deployed at", await trustGame.getAddress());
