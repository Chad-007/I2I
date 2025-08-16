// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract I2IToken is ERC20, Ownable {
    constructor(uint256 initialSupply, address initialOwner)
        ERC20("i2i", "I2I")
        Ownable(initialOwner)   
    {
        require(initialOwner != address(0), "bad owner");
        _mint(initialOwner, initialSupply);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // --- Staking ---
    mapping(address => uint256) public staked;
    event Staked(address indexed staker, uint256 amount);
    event Unstaked(address indexed staker, uint256 amount);

    function stake(uint256 amount) external {
        require(amount > 0, "amount=0");
        _transfer(msg.sender, address(this), amount);
        staked[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "amount=0");
        uint256 s = staked[msg.sender];
        require(s >= amount, "insufficient staked");
        staked[msg.sender] = s - amount;
        _transfer(address(this), msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }
}
