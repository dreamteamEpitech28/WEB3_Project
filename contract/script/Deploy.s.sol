// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import {WatchPassport} from "../src/WatchPassport.sol";
import {SpareParts} from "../src/SpareParts.sol";
import {VIPIdentity} from "../src/VIPIdentity.sol";

/**
 * Déploiement testnet (Base Sepolia / Sepolia / etc.)
 *
 * Commande (exemple) :
 *   cd contract
 *   forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
 *
 * Résultat : les adresses de déploiement s'affichent dans les logs,
 * puis tu les reportes dans DEPLOYMENTS.md.
 */
contract DeployScript is Script {
    function run() external returns (WatchPassport watchPassport, SpareParts spareParts, VIPIdentity vipIdentity) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        watchPassport = new WatchPassport();
        spareParts = new SpareParts();
        vipIdentity = new VIPIdentity();
        vm.stopBroadcast();

        console2.log("WATCH_PASSPORT_ADDRESS:", address(watchPassport));
        console2.log("SPARE_PARTS_ADDRESS:", address(spareParts));
        console2.log("VIP_IDENTITY_ADDRESS:", address(vipIdentity));
    }
}

