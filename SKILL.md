---
name: arbiveil-confidential-skill
description: Opinionated guide and toolset for enabling AI agents to execute confidential compute and private data storage on Arbitrum using Fhenix Fully Homomorphic Encryption (FHE). Use when an agent needs to evaluate risk, store private strategy data, or execute DeFi actions without leaking alpha to the public mempool.
---

# ArbiVeil: Confidential Agent Compute on Arbitrum

## Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Smart contracts | Solidity 0.8.x + Fhenix | `euint32` encrypted variables for private on-chain math |
| Deployment | Hardhat + Ignition | Standard EVM path on Arbitrum Sepolia |
| Encryption SDK | `fhenixjs` | Used by the agent to encrypt data pre-transaction |
| Agent API | Node.js + Express | The bridge between the LLM and Arbitrum |
| Chain | Arbitrum Sepolia | Target network for FHE coprocessor |

## Decision Flow

When an AI Agent is preparing to execute a transaction on Arbitrum:

1. **Is the data public? (e.g., standard AMM swap)** → Execute directly via viem/ethers.
2. **Is the data sensitive? (e.g., proprietary risk score, target yield threshold)** → Use **ArbiVeil**. Encrypt the data locally using `fhenixjs` before sending it to the Arbitrum Fhenix contract.

## Core Workflow

### 1. The On-Chain Confidential Contract
Agents interact with a deployed FHE contract on Arbitrum Sepolia. The contract accepts encrypted inputs (`inEuint32`) and processes them without decryption.

```solidity
// Example ArbiVeil Interface
function setEncryptedData(inEuint32 calldata inData) public;