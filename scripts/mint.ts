import { ethers } from "hardhat";

const TOKEN_ADDRESS = " ";
const TO ="0x59509999f636e4ec1e1E3Ff5c09AbFB0278C1329";
const AMOUNT = process.env.AMOUNT || "1000"; 
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
