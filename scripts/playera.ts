import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY; 
const PROVIDER_URL = process.env.RPC_URL;
const TOKEN_ADDRESS = "0xB99DC9eCe1a05cd4459165d60DF65a59439Ae277";
const TRUSTGAME_ADDRESS = "0x2Df89C4b11a3c45754BB3bB7eb93ca2504E4f14E";
const OPPONENT_ADDRESS = "0x59509999f636e4ec1e1E3Ff5c09AbFB0278C1329"; 
const STAKE_AMOUNT = ethers.parseEther("10");

async function main() {
    const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log("Using wallet:", wallet.address);

    const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS, wallet);
    const trustGame = await ethers.getContractAt("TrustGame", TRUSTGAME_ADDRESS, wallet);
    const approveTx = await token.approve(TRUSTGAME_ADDRESS, STAKE_AMOUNT);
    await approveTx.wait();
    console.log("Approved TrustGame to spend tokens");
    const createTx = await trustGame.createGame(OPPONENT_ADDRESS);
    const receipt = await createTx.wait();
    const gameId = 0; 
    console.log(`Game created with ID ${gameId}`);

    
    const moveTx = await trustGame.makeMove(gameId, 1); 
    await moveTx.wait();
    console.log("Player A move submitted!");

    
    const balance = await token.balanceOf(wallet.address);
    console.log("Player A balance:", ethers.formatEther(balance));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
