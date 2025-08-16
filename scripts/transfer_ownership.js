import { ethers } from "hardhat";

const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const NEW_OWNER = process.env.NEW_OWNER; // your Gnosis Safe address

async function main() {
  const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS);
  const tx = await token.transferOwnership(NEW_OWNER);
  await tx.wait();
  console.log("Ownership transferred to:", NEW_OWNER);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
