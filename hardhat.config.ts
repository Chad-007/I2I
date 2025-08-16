// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

function validPk(pk?: string): string[] {
  if (!pk) return [];
  const hex = pk.startsWith("0x") ? pk.slice(2) : pk;
  return /^[0-9a-fA-F]{64}$/.test(hex) ? [pk] : [];
}

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    megaeth: {
      url: process.env.RPC_URL,
      chainId: 6342,
      accounts: validPk(process.env.PRIVATE_KEY)
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ""
  }
};

export default config;
