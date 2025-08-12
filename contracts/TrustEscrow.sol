// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TrustEscrow {
    IERC20 public token;

    struct Escrow {
        address player1;
        address player2;
        uint amount;
        bool released;
    }

    mapping(uint => Escrow) public escrows;
    uint public escrowCount;

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function createEscrow(address player2, uint amount) public {
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        escrows[escrowCount] = Escrow(msg.sender, player2, amount, false);
        escrowCount++;
    }

    function releaseEscrow(uint escrowId) public {
        Escrow storage e = escrows[escrowId];
        require(msg.sender == e.player1, "Only player1 can release");
        require(!e.released, "Already released");
        token.transfer(e.player2, e.amount);
        e.released = true;
    }
}
