// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @title NFCVerifier
/// @notice Vérifie qu'une URL NFC provient d'un signataire autorisé et n'a pas déjà été utilisée.
contract NFCVerifier is Ownable {
    using ECDSA for bytes32;

    /// @notice Adresse autorisée à signer les messages NFC (par ex. backend de la marque).
    address public signer;

    /// @notice Hashs déjà vus pour empêcher les attaques par rejeu.
    mapping(bytes32 => bool) public usedDigests;

    event SignerUpdated(address indexed newSigner);
    event NFCVerified(bytes32 indexed digest, address indexed verifier);

    constructor(address initialSigner) Ownable(msg.sender) {
        signer = initialSigner;
    }

    /// @notice Met à jour le signataire autorisé.
    function setSigner(address newSigner) external onlyOwner {
        signer = newSigner;
        emit SignerUpdated(newSigner);
    }

    /// @notice Vérifie une preuve NFC signée.
    /// @param digest Hash signé (par ex. keccak256(uid, compteur, tokenId,...)).
    /// @param signature Signature ECDSA produite par `signer`.
    /// @return valid True si la preuve est valide et non rejouée.
    function verifyNFC(bytes32 digest, bytes calldata signature) external returns (bool valid) {
        require(!usedDigests[digest], "NFCVerifier: digest already used");
        require(signer != address(0), "NFCVerifier: signer not set");

        address recovered = digest.toEthSignedMessageHash().recover(signature);
        require(recovered == signer, "NFCVerifier: invalid signature");

        usedDigests[digest] = true;
        emit NFCVerified(digest, msg.sender);
        return true;
    }
}

