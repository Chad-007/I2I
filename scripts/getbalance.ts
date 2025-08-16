import { ethers } from "hardhat";

async function main() {
  const walletAddress = "0x620A50a3c8584d1d3a034173EDa90511C1B00E90"; 
  const tokenAddress = "0xB99DC9eCe1a05cd4459165d60DF65a59439Ae277"; 
  const I2IToken = await ethers.getContractAt("I2IToken", tokenAddress);

  const balance = await I2IToken.balanceOf(walletAddress);
  console.log("Your balance:", ethers.formatEther(balance));
}

main();
