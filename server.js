require("dotenv").config();
const { ethers } = require("ethers");
const { FhenixClient } = require("fhenixjs");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// Connect to Arbitrum Sepolia
const provider = new ethers.JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Your newly deployed ArbiVeil Contract
const CONTRACT_ADDRESS = "0x691Bd659D7853b9f64Aa7563700CE3319eaed3cb"; 

// Read the compiled ABI directly from Hardhat's artifacts to avoid ethers fragment errors
const contractArtifact = JSON.parse(fs.readFileSync("./artifacts/contracts/ConfidentialCompute.sol/ConfidentialCompute.json", "utf8"));
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, wallet);

app.post("/verify-risk", async (req, res) => {
    try {
        console.log("[Skill API] Initializing Fhenix Client on Arbitrum Sepolia...");
        const fhenixClient = new FhenixClient({ provider });

        console.log("[Skill API] Encrypting Agent Risk Data...");
        // Encrypt the risk score before it ever touches the blockchain
        const encryptedScore = await fhenixClient.encrypt_uint32(req.body.riskScore || 750);

        console.log("[Skill API] Sending Confidential Transaction...");
        const tx = await contract.setEncryptedData(encryptedScore);
        
        console.log(`[Skill API] Transaction sent! Hash: ${tx.hash}`);
        console.log("[Skill API] Waiting for confirmation...");
        await tx.wait();

        res.json({
            success: true,
            message: "Confidential Risk Profile Verified on Arbitrum.",
            txHash: tx.hash
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("ArbiVeil Confidential Skill API running on port 3000"));