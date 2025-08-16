// // scripts/playTrustGame.ts
// import { ethers } from "hardhat";
// import * as dotenv from "dotenv";
// dotenv.config();

// // ----- CONFIG -----
// const PRIVATE_KEY = process.env.PRIVATE_KEY; // Your wallet's private key
// const PROVIDER_URL = process.env.RPC_URL;       // MegaETH RPC
// const TOKEN_ADDRESS = "0xB99DC9eCe1a05cd4459165d60DF65a59439Ae277";    // Deployed token
// const FAUCET_ADDRESS = "0x095340919D99997e69AD4B61C08Cb036ece2c3C5";   // Deployed faucet
// const TRUSTGAME_ADDRESS = "0x2Df89C4b11a3c45754BB3bB7eb93ca2504E4f14E"; // Deployed TrustGame
// const OPPONENT_ADDRESS = "0x59509999f636e4ec1e1E3Ff5c09AbFB0278C1329"; // Opponent

// const STAKE_AMOUNT = ethers.parseEther("10"); 
// async function main() {
//     // 1️⃣ Connect your wallet to the provider
//     const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

//     console.log("Using wallet:", wallet.address);

//     // 2️⃣ Attach to the contracts
//     const token = await ethers.getContractAt("I2IToken", TOKEN_ADDRESS, wallet);
//     const faucet = await ethers.getContractAt("I2IFaucet", FAUCET_ADDRESS, wallet);
//     const trustGame = await ethers.getContractAt("TrustGame", TRUSTGAME_ADDRESS, wallet);

//     // 3️⃣ Get some tokens from faucet if needed
//     const dripTx = await faucet.drip(wallet.address);
//     await dripTx.wait();
//     console.log("Dripped tokens from faucet!");

//     // 4️⃣ Approve TrustGame contract to spend your tokens
//     const approveTx = await token.approve(TRUSTGAME_ADDRESS, STAKE_AMOUNT);
//     await approveTx.wait();
//     console.log("Approved TrustGame to spend tokens");

//     // 5️⃣ Create or join game
//     // If you are Player A:
//     const createTx = await trustGame.createGame(OPPONENT_ADDRESS);
//     const receipt = await createTx.wait();
//     const gameId = 0; // Usually first game; adjust for later games
//     console.log(`Game created with ID ${gameId}`);

//     // If you are Player B, comment out the above two lines and instead do:
//     // const joinTx = await trustGame.joinGame(gameId);
//     // await joinTx.wait();
//     // console.log(`Joined game ${gameId}`);

//     // 6️⃣ Make your move
//     // Player A: 1 = Trust, 2 = NoTrust
//     // Player B: 3 = Share, 4 = Betray
//     const move = 1; // Replace with your desired move
//     const moveTx = await trustGame.makeMove(gameId, move);
//     await moveTx.wait();
//     console.log("Move submitted!");

//     // 7️⃣ Check balance
//     const balance = await token.balanceOf(wallet.address);
//     console.log("Your balance:", ethers.formatEther(balance));
// }

// main().catch((err) => {
//     console.error(err);
//     process.exit(1);
// });
