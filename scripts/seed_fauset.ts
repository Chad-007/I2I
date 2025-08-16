import { ethers } from "hardhat";

const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const FAUCET_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const [owner] = await ethers.getSigners();
  const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS);

  // send 100k I2I to faucet
  const amount = ethers.parseUnits("100000", 18);
  const tx = await token.transfer(FAUCET_ADDRESS, amount);
  await tx.wait();
  console.log("Seeded faucet with", amount.toString(), "wei I2I");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
