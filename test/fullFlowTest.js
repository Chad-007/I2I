const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("I2I Token, Faucet, and TrustGame full flow", function () {
  let deployer, playerA, playerB;
  let token, faucet, trustGame;

  beforeEach(async function () {
  [deployer, playerA, playerB] = await ethers.getSigners();

  const I2IToken = await ethers.getContractFactory("I2IToken");
  token = await I2IToken.deploy(
    ethers.parseEther("1000000"), // initialSupply
    deployer.address              // initialOwner
  );

  const I2IFaucet = await ethers.getContractFactory("I2IFaucet");
  faucet = await I2IFaucet.deploy(await token.getAddress(), deployer.address);

  const TrustGame = await ethers.getContractFactory("TrustGame");
  trustGame = await TrustGame.deploy(
    await token.getAddress(),
    ethers.parseEther("10"),
    deployer.address
  );

  await token.transfer(await faucet.getAddress(), ethers.parseEther("1000"));
});



  it("should allow playerA to trust and playerB to betray", async function () {
    await faucet.connect(playerA).drip(playerA.address);
    await faucet.connect(playerB).drip(playerB.address);

    await token.connect(playerA).approve(await trustGame.getAddress(), ethers.parseEther("10"));
    await token.connect(playerB).approve(await trustGame.getAddress(), ethers.parseEther("10"));

    await trustGame.connect(playerA).createGame(playerB.address);
    await trustGame.connect(playerB).joinGame(0);

    await trustGame.connect(playerA).makeMove(0, 1); // Trust
    await trustGame.connect(playerB).makeMove(0, 4); // Betray

    const balA = await token.balanceOf(playerA.address);
    const balB = await token.balanceOf(playerB.address);

    console.log("PlayerA balance:", ethers.formatEther(balA));
    console.log("PlayerB balance:", ethers.formatEther(balB));

    expect(balA).to.equal(ethers.parseEther("95"));
    expect(balB).to.equal(ethers.parseEther("105"));
  });
});
