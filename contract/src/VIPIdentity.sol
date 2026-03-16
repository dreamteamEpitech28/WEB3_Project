// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// ERC-5192: soulbound token for VIP identity & service history. Tokens cannot be transferred once minted.
interface IERC5192 {
    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);

    function locked(uint256 tokenId) external view returns (bool);
}

contract VIPIdentity is ERC721, Ownable, IERC5192 {
    // bytes4(keccak256("locked(uint256)"))
    bytes4 private constant _INTERFACE_ID_ERC5192 = 0xb45a3c0e;

    constructor() ERC721("VIPIdentity", "VIPID") Ownable(msg.sender) {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
        emit Locked(tokenId);
    }

    function locked(uint256 tokenId) external view returns (bool) {
        _requireOwned(tokenId);
        return true;
    }

    // -------------------------------------------------------------------------
    // Soulbound enforcement — block transfers & approvals
    // -------------------------------------------------------------------------

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        // from == address(0) means mint, which is allowed
        if (from != address(0)) {
            revert("VIPIdentity: soulbound token cannot be transferred");
        }
        return super._update(to, tokenId, auth);
    }

    function approve(address, uint256) public pure override {
        revert("VIPIdentity: approvals disabled for soulbound token");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("VIPIdentity: approvals disabled for soulbound token");
    }

    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == _INTERFACE_ID_ERC5192 || super.supportsInterface(interfaceId);
    }
}
