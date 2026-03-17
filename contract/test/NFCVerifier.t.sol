// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {NFCVerifier} from "../src/NFCVerifier.sol";

contract NFCVerifierTest is Test {
    NFCVerifier public verifier;
    address public signer = address(0xA11CE);
    uint256 private signerPk = 0xA11CE;

    function setUp() public {
        verifier = new NFCVerifier(signer);
    }

    function testVerifyNFCSucceedsOnce() public {
        bytes32 digest = keccak256(abi.encodePacked("uid-123", uint256(1), uint256(42)));

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPk, digest);
        bytes memory sig = abi.encodePacked(r, s, v);

        bool ok = verifier.verifyNFC(digest, sig);
        assertTrue(ok);

        // digest should now be marked as used
        assertTrue(verifier.usedDigests(digest));
    }

    function testVerifyNFCRevertsOnReplay() public {
        bytes32 digest = keccak256(abi.encodePacked("uid-123", uint256(1), uint256(42)));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPk, digest);
        bytes memory sig = abi.encodePacked(r, s, v);

        verifier.verifyNFC(digest, sig);

        vm.expectRevert("NFCVerifier: digest already used");
        verifier.verifyNFC(digest, sig);
    }

    function testVerifyNFCRevertsOnInvalidSignature() public {
        bytes32 digest = keccak256(abi.encodePacked("uid-123", uint256(1), uint256(42)));
        // signerPk+1 => mauvaise signature
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPk + 1, digest);
        bytes memory sig = abi.encodePacked(r, s, v);

        vm.expectRevert("NFCVerifier: invalid signature");
        verifier.verifyNFC(digest, sig);
    }
}

