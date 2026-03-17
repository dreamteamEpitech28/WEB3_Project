
const crypto = require("crypto");

//géneration des clés

function generateNFCChipKeys() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "prime256v1", // Courbe elliptique standard NFC
    publicKeyEncoding:  { type: "spki",  format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  return { privateKey, publicKey };
}

// compteur anti-rejeu

let nfcCounter = 0;

function incrementCounter() {
  nfcCounter += 1;
  
  return nfcCounter.toString(16).padStart(8, "0");
}

//  GÉNÉRATION DE LA SUN 

/**
 * Génère une Signed URL with NFC (SUN)
 *
 * @param {string} uid         - Identifiant unique de la puce NFC (simulé)
 * @param {string} privateKey  - Clé privée de la puce (simulée)
 * @param {string} baseUrl     - URL de base de l'app de vérification
 * @returns {object}           - URL signée + composants pour vérification
 */
function generateSUN(uid, privateKey, baseUrl = "https://verify.maison-lumiere.com") {
  
  const counter = incrementCounter();
 
  const message = `${uid}:${counter}`;

  const sign = crypto.createSign("SHA256");
  sign.update(message);
  const signature = sign.sign(privateKey, "base64url"); // base64url = URL-safe

  const params = new URLSearchParams({
    uid:       uid,
    ctr:       counter,
    sig:       signature,
  });

  const signedUrl = `${baseUrl}?${params.toString()}`;

  return {
    url:       signedUrl,
    uid:       uid,
    counter:   counter,
    signature: signature,
    message:   message,
  };
}

// VÉRIFICATION DE LA SUN 

/**
 * Vérifie une SUN reçue
 * En production : cette vérification se fait dans le smart contract on-chain
 *
 * @param {string} uid        - UID extrait de l'URL
 * @param {string} counter    - Compteur extrait de l'URL
 * @param {string} signature  - Signature extraite de l'URL
 * @param {string} publicKey  - Clé publique enregistrée on-chain pour cet UID
 * @param {number} lastCounter - Dernier compteur connu (anti-rejeu)
 * @returns {object}           - Résultat de la vérification
 */
function verifySUN(uid, counter, signature, publicKey, lastCounter = 0) {
  const results = {
    signatureValid: false,
    counterValid:   false,
    authentic:      false,
    reason:         "",
  };

  
  try {
    const message = `${uid}:${counter}`;
    const verify = crypto.createVerify("SHA256");
    verify.update(message);
    results.signatureValid = verify.verify(publicKey, signature, "base64url");
  } catch {
    results.reason = "Signature invalide — puce non reconnue";
    return results;
  }

  const counterInt = parseInt(counter, 16);
  results.counterValid = counterInt > lastCounter;

  if (!results.counterValid) {
    results.reason = "URL déjà utilisée — scan rejoué détecté";
    return results;
  }

  results.authentic = results.signatureValid && results.counterValid;
  results.reason    = results.authentic
    ? "Montre authentique — certificat valide"
    : "Échec de vérification";

  return results;
}


console.log("=== Simulation SUN — Passeport Numérique ===\n");

const { privateKey, publicKey } = generateNFCChipKeys();
const UID = "NFC-ML-2026-001"; 

console.log("Puce NFC initialisée");
console.log("UID :", UID);
console.log("");

console.log("── Scan 1 : approche du téléphone ──");
const sun1 = generateSUN(UID, privateKey);
console.log("URL générée :", sun1.url);
console.log("Compteur    :", sun1.counter);
console.log("Signature   :", sun1.signature.substring(0, 30) + "...");
console.log("");

const check1 = verifySUN(sun1.uid, sun1.counter, sun1.signature, publicKey, 0);
console.log("Vérification :", check1.reason);
console.log("Authentique  :", check1.authentic);
console.log("");

console.log("── Scan 2 : deuxième approche du téléphone ──");
const sun2 = generateSUN(UID, privateKey);
console.log("URL générée :", sun2.url);
console.log("Compteur    :", sun2.counter);
console.log("");

const check2 = verifySUN(sun2.uid, sun2.counter, sun2.signature, publicKey, 1);
console.log("Vérification :", check2.reason);
console.log("Authentique  :", check2.authentic);
console.log("");

console.log("── Scan 3 : attaque par rejeu (URL du scan 1 réutilisée) ──");
const checkReplay = verifySUN(sun1.uid, sun1.counter, sun1.signature, publicKey, 2);
console.log("Vérification :", checkReplay.reason);
console.log("Authentique  :", checkReplay.authentic);
console.log("");

console.log("── Scan 4 : tentative avec fausse signature ──");
const checkFake = verifySUN(UID, "00000003", "fakesignatureXXXXXXXX", publicKey, 2);
console.log("Vérification :", checkFake.reason);
console.log("Authentique  :", checkFake.authentic);
