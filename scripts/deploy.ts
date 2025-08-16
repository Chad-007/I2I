import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  
  const Token = await ethers.getContractFactory("I2IToken");
  const token = await Token.deploy(ethers.parseEther("1000000"), deployer.address);
  await token.waitForDeployment();
  console.log("Token deployed at:", await token.getAddress());

  
  const Faucet = await ethers.getContractFactory("I2IFaucet");
  const faucet = await Faucet.deploy(await token.getAddress(), deployer.address);
  await faucet.waitForDeployment();
  console.log("Faucet deployed at:", await faucet.getAddress());

  
  const TrustGame = await ethers.getContractFactory("TrustGame");
  const trustGame = await TrustGame.deploy(await token.getAddress(), ethers.parseEther("10"), deployer.address);
  await trustGame.waitForDeployment();
  console.log("TrustGame deployed at:", await trustGame.getAddress());

  
  const tx = await token.transfer(await faucet.getAddress(), ethers.parseEther("1000"));
  await tx.wait();
  console.log("Faucet funded with 1000 I2I tokens");
}

main().catch((err) => console.error(err));
