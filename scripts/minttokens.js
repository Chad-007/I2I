const [owner, playerA, playerB] = await ethers.getSigners();
// Mint tokens to them
await token.mint(playerA.address, ethers.parseEther("100"));
await token.mint(playerB.address, ethers.parseEther("100"));
