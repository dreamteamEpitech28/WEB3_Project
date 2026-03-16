// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {VIPIdentity} from "../src/VIPIdentity.sol";

contract VIPIdentityTest is Test {
    VIPIdentity public vip;
    address public owner;
    address public vipHolder;

    function setUp() public {
        owner = address(this);
        vipHolder = address(0x789);
        vip = new VIPIdentity();
    }

    function testDeployerIsOwner() public view {
        assertEq(vip.owner(), owner);
    }

    function testMintSoulboundToken() public {
        vip.mint(vipHolder, 1);
        assertEq(vip.ownerOf(1), vipHolder);
    }

    function testTokenIsLocked() public {
        vip.mint(vipHolder, 1);
        // ERC-5192: locked() must return true for soulbound tokens
        assertTrue(vip.locked(1));
    }

    function testTransferReverts() public {
        vip.mint(vipHolder, 1);

        address recipient = address(0xABC);
        vm.prank(vipHolder);
        vm.expectRevert();
        vip.transferFrom(vipHolder, recipient, 1);
    }

    function testSafeTransferReverts() public {
        vip.mint(vipHolder, 1);

        address recipient = address(0xABC);
        vm.prank(vipHolder);
        vm.expectRevert();
        vip.safeTransferFrom(vipHolder, recipient, 1);
    }

    function testApproveReverts() public {
        vip.mint(vipHolder, 1);

        address operator = address(0xDEF);
        vm.prank(vipHolder);
        vm.expectRevert();
        vip.approve(operator, 1);
    }

    function testOnlyOwnerCanMint() public {
        address attacker = address(0x999);
        vm.prank(attacker);
        vm.expectRevert();
        vip.mint(attacker, 1);
    }

    function testSupportsERC5192Interface() public view {
        // ERC-5192 interface ID: 0xb45a3c0e
        assertTrue(vip.supportsInterface(0xb45a3c0e));
    }
}
