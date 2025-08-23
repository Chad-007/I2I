import { ethers } from "hardhat";

async function main() {
  const walletAddress = "0x59509999f636e4ec1e1E3Ff5c09AbFB0278C1329"; 
  const tokenAddress = "0x506272c2Bb50A090D05A39Fff3E46F9a0B2b176b"; 
  const I2IToken = await ethers.getContractAt("I2IToken", tokenAddress);

  const balance = await I2IToken.balanceOf(walletAddress);
  console.log("Your balance:", ethers.formatEther(balance));
}

main();
