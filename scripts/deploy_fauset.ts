import { ethers } from "hardhat";

const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // fill after token deploy

async function main() {
  if (!TOKEN_ADDRESS) throw new Error("Set TOKEN_ADDRESS in env");
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Faucet = await ethers.getContractFactory("I2IFaucet");
  const faucet = await Faucet.deploy(TOKEN_ADDRESS, deployer.address);
  const receipt = await faucet.deploymentTransaction()?.wait();

  console.log("I2IFaucet deployed at:", await faucet.getAddress());
  console.log("Tx hash:", receipt?.hash);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
