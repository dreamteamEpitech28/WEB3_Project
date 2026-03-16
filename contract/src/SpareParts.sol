// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// ERC-1155: fungible spare parts (id = part type, amount = quantity).
// Token IDs are defined off-chain and passed at mint time.
contract SpareParts is ERC1155, Ownable {
    constructor() ERC1155("") Ownable(msg.sender) {}

    function mint(address to, uint256 id, uint256 amount) public onlyOwner {
        _mint(to, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts) public onlyOwner {
        _mintBatch(to, ids, amounts, "");
    }
}
