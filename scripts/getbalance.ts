import { ethers } from "hardhat";

const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const FAUCET_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();
  const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS);

  async function printBalance(label: string, address: string) {
    const balance = await token.balanceOf(address);
    console.log(`${label} (${address}) → ${ethers.formatUnits(balance, 18)} I2I`);
  }

  await printBalance("Owner", owner.address);
  await printBalance("Faucet", FAUCET_ADDRESS);
  await printBalance("Addr1", addr1.address);
  await printBalance("Addr2", addr2.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
