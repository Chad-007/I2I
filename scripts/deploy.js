const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const I2IToken = await ethers.getContractFactory("I2IToken");
  const token = await I2IToken.deploy(ethers.parseEther("1000000")); // 1M tokens
  await token.waitForDeployment();

  console.log("I2IToken deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
