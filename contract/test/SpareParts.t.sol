// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SpareParts} from "../src/SpareParts.sol";

contract SparePartsTest is Test {
    SpareParts public spareParts;
    address public owner;
    address public customer;

    function setUp() public {
        owner = address(this);
        customer = address(0x456);
        spareParts = new SpareParts();
    }

    function testDeployerIsOwner() public view {
        assertEq(spareParts.owner(), owner);
    }

    function testMintBatchToAddress() public {
        uint256[] memory ids = new uint256[](3);
        ids[0] = 1; // Crown
        ids[1] = 2; // Crystal
        ids[2] = 3; // Strap

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 10;
        amounts[1] = 5;
        amounts[2] = 20;

        spareParts.mintBatch(customer, ids, amounts);

        assertEq(spareParts.balanceOf(customer, 1), 10);
        assertEq(spareParts.balanceOf(customer, 2), 5);
        assertEq(spareParts.balanceOf(customer, 3), 20);
    }

    function testOnlyOwnerCanMintBatch() public {
        address attacker = address(0x999);

        uint256[] memory ids = new uint256[](1);
        ids[0] = 1;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = 1;

        vm.prank(attacker);
        vm.expectRevert();
        spareParts.mintBatch(attacker, ids, amounts);
    }

    function testMintSinglePart() public {
        spareParts.mint(customer, 1, 50);
        assertEq(spareParts.balanceOf(customer, 1), 50);
    }
}
