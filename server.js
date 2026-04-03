require("dotenv").config();
const { ethers } = require("ethers");
const { cofhejs, Encryptable } = require("cofhejs/node");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// Connect to Arbitrum Sepolia
const provider = new ethers.JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Your deployed ArbiVeil Contract
const CONTRACT_ADDRESS = "0x691Bd659D7853b9f64Aa7563700CE3319eaed3cb"; 

// Read the compiled ABI directly from Hardhat's artifacts
const contractArtifact = JSON.parse(fs.readFileSync("./artifacts/contracts/ConfidentialCompute.sol/ConfidentialCompute.json", "utf8"));
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, wallet);

app.post("/verify-risk", async (req, res) => {
    try {
        console.log("[Skill API] Initializing CoFHE Client for Arbitrum Sepolia...");
        
        await cofhejs.initialize({
            provider: provider,
            signer: wallet
        });

        console.log("[Skill API] Encrypting Agent Risk Data...");
        
        // FIX: Added the array format back, and explicitly passed '0' as the securityZone
        const [encryptedScore] = await cofhejs.encrypt(
            CONTRACT_ADDRESS, 
            [Encryptable.uint32(req.body.riskScore || 750)],
            0 
        );

        console.log("[Skill API] Sending Confidential Transaction...");
        const tx = await contract.setEncryptedData(encryptedScore);
        
        console.log(`[Skill API] Transaction sent! Hash: ${tx.hash}`);
        console.log("[Skill API] Waiting for confirmation...");
        await tx.wait();

        res.json({
            success