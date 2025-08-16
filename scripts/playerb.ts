import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY_B;
const PROVIDER_URL = process.env.RPC_URL;
const TOKEN_ADDRESS = "0x289Ce5b7246d20e09f6668119bfD6b61c3a45B83";
const TRUSTGAME_ADDRESS = "0x2Df89C4b11a3c45754BB3bB7eb93ca2504E4f14E";
const GAME_ID = 0;
const STAKE_AMOUNT = ethers.parseEther("10");

async function main() {
    const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log("Using wallet:", wallet.address);

    const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS, wallet);
    const trustGame = await ethers.getContractAt("TrustGame", TRUSTGAME_ADDRESS, wallet);

    await (await token.approve(TRUSTGAME_ADDRESS, STAKE_AMOUNT)).wait();
    console.log("Approved TrustGame to spend tokens");

    console.log("Waiting for Player A to make a move...");
    await new Promise(resolve => setTimeout(resolve, 15000));

    const joinTx = await trustGame.joinGame(GAME_ID);
    await joinTx.wait();
    console.log(`Joined game ${GAME_ID}`);

    const moveTx = await trustGame.makeMove(GAME_ID, 4);
    await moveTx.wait();
    console.log("Player B move submitted!");

    const balance = await token.balanceOf(wallet.address);
    console.log("Player B balance:", ethers.formatEther(balance));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
