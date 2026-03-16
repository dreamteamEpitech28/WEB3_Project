// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// ERC-721: one token = one physical watch passport. tokenId matches the watch serial number.
contract WatchPassport is ERC721, Ownable {
    constructor() ERC721("WatchPassport", "WPP") Ownable(msg.sender) {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }
}
