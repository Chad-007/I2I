  const { ethers } = require("hardhat");

  async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("tokens deploying by the deployer", deployer.address);

    const I2IToken = await ethers.getContractFactory("I2IToken");
    const initialSupply = ethers.parseEther("1000000");
    const token = await I2IToken.deploy(initialSupply, deployer.address); // pass initial owner explicitly
    await token.waitForDeployment();

    console.log("i2i token is deployed to", await token.getAddress());
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
