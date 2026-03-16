// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {WatchPassport} from "../src/WatchPassport.sol";

contract WatchPassportTest is Test {
    WatchPassport public watch;

    function setUp() public {
        // This runs before every test
        watch = new WatchPassport();
    }

    function testDeployerIsOwner() public view {
        assertEq(watch.owner(), address(this));
    }

    function testMintWatch() public {
        address customer = address(0x123);
        watch.mint(customer, 1);
        assertEq(watch.ownerOf(1), customer);
    }
}
