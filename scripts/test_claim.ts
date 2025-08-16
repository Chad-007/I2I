const { ethers } = require("hardhat");

async function main() {
  const TOKEN_ADDRESS = "0x831Be394280313AAf74fBA3f18e496b04939504D";
  const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS);
  
  const owner = await token.owner();
  console.log("Owner is:", owner);
}

main().catch(console.error);
