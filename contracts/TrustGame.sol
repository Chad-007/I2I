// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TrustGame is Ownable {
    IERC20 public immutable token;
    uint256 public stakeAmount;

    enum Move { None, Trust, NoTrust, Share, Betray }

    struct Game {
        address playerA;    
        address playerB;
        Move moveA;
        Move moveB;
        bool active;
    }

    uint256 public nextGameId;
    mapping(uint256 => Game) public games;

    event GameCreated(uint256 indexed gameId, address indexed playerA, address indexed playerB);
    event GameJoined(uint256 indexed gameId, address indexed playerB);
    event MoveMade(uint256 indexed gameId, address indexed player, Move move);
    event GameResolved(uint256 indexed gameId, address winner, uint256 amountWon);

    constructor(IERC20 _token, uint256 _stakeAmount, address initialOwner)
        Ownable(initialOwner)
    {
        token = _token;
        stakeAmount = _stakeAmount;
    }

    function createGame(address opponent) external {
        require(opponent != msg.sender, "Cannot play against yourself");
        require(token.transferFrom(msg.sender, address(this), stakeAmount), "Stake transfer failed");

        games[nextGameId] = Game({
            playerA: msg.sender,
            playerB: opponent,
            moveA: Move.None,
            moveB: Move.None,
            active: true
        });

        emit GameCreated(nextGameId, msg.sender, opponent);
        nextGameId++;
    }

    function joinGame(uint256 gameId) public {
        Game storage g = games[gameId];
        require(g.active, "Game not active");
        require(g.playerB == msg.sender, "Not your game");
        require(token.transferFrom(msg.sender, address(this), stakeAmount), "Stake transfer failed");

        emit GameJoined(gameId, msg.sender);
    }

    
    function joinLatestGame() external {
        require(nextGameId > 0, "No games created yet");
        joinGame(nextGameId - 1);
    }

    function makeMove(uint256 gameId, Move move) external {
        Game storage g = games[gameId];
        require(g.active, "Game not active");
        require(move != Move.None, "Invalid move");

        if (msg.sender == g.playerA) {
            require(g.moveA == Move.None, "Move already made");
            require(move == Move.Trust || move == Move.NoTrust, "Invalid move for Player A");
            g.moveA = move;
        } else if (msg.sender == g.playerB) {
            require(g.moveB == Move.None, "Move already made");
            require(move == Move.Share || move == Move.Betray, "Invalid move for Player B");
            g.moveB = move;
        } else {
            revert("Not a player");
        }

        emit MoveMade(gameId, msg.sender, move);

        if (g.moveA != Move.None && g.moveB != Move.None) {
            _resolve(gameId);
        }
    }
    
    function _resolve(uint256 gameId) internal {
        Game storage g = games[gameId];
        g.active = false;
        uint256 pot = stakeAmount * 2;
        address winner;
        if (g.moveA == Move.NoTrust) {
            // No trust, both get their stake back
            token.transfer(g.playerA, stakeAmount);
            token.transfer(g.playerB, stakeAmount);
        } else if (g.moveA == Move.Trust && g.moveB == Move.Share) {
            // Both cooperate, they share the pot with a small bonus split equally
            // Each gets their stake back plus half of the cooperative bonus (10% of total pot)
            uint256 bonus = pot / 10; // 10% bonus for cooperation
            uint256 baseReward = stakeAmount + (bonus / 2); // Stake + half the bonus each
            token.transfer(g.playerA, baseReward);
            token.transfer(g.playerB, baseReward);
        } else if (g.moveA == Move.Trust && g.moveB == Move.Betray) {
            uint256 betrayerCut = (pot * 3) / 4;
            uint256 trusterCut = pot - betrayerCut;
            token.transfer(g.playerB, betrayerCut);
            token.transfer(g.playerA, trusterCut);
            winner = g.playerB;
        }
        emit GameResolved(gameId, winner, pot);
    }
}
