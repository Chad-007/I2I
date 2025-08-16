import { ethers } from "hardhat";

const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TO ="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const AMOUNT = process.env.AMOUNT || "1000"; // whole tokens

async function main() {
  const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS);
  const tx = await token.mint(TO, ethers.parseUnits(AMOUNT, 18));
  await tx.wait();
  console.log(`Minted ${AMOUNT} I2I to ${TO}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
