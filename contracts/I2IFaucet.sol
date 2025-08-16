// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract I2IFaucet is Ownable {
    IERC20 public immutable token;
    uint256 public dripAmount = 100 * 1e18;     // test out the tokens
    uint256 public cooldown = 1 hours;// cooldown period between drips change later

    mapping(address => uint256) public lastDrip;

    constructor(IERC20 _token, address owner_) Ownable(owner_) {
        token = _token;
    }

    function setDripAmount(uint256 amt) external onlyOwner { dripAmount = amt; }
    function setCooldown(uint256 secs) external onlyOwner { cooldown = secs; }

    function drip(address to) external {
        require(block.timestamp - lastDrip[to] >= cooldown, "wait cooldown");
        lastDrip[to] = block.timestamp;
        require(token.transfer(to, dripAmount), "transfer failed");
    }
}
