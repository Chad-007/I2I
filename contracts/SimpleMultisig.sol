// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleMultisig {
    address[] public owners;
    uint public required;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint confirmations;
    }

    mapping(uint => mapping(address => bool)) public confirmedBy;
    Transaction[] public transactions;

    modifier onlyOwner() {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) isOwner = true;
        }
        require(isOwner, "Not owner");
        _;
    }

    constructor(address[] memory _owners, uint _required) {
        owners = _owners;
        required = _required;
    }

    function submitTransaction(address to, uint value, bytes memory data) public onlyOwner {
        transactions.push(Transaction(to, value, data, false, 0));
    }

    function confirmTransaction(uint txIndex) public onlyOwner {
        require(!confirmedBy[txIndex][msg.sender], "Already confirmed");
        confirmedBy[txIndex][msg.sender] = true;
        transactions[txIndex].confirmations += 1;

        if (transactions[txIndex].confirmations >= required) {
            executeTransaction(txIndex);
        }
    }

    function executeTransaction(uint txIndex) internal {
        Transaction storage txn = transactions[txIndex];
        require(!txn.executed, "Already executed");
        (bool success, ) = txn.to.call{value: txn.value}(txn.data);
        require(success, "Execution failed");
        txn.executed = true;
    }
}
