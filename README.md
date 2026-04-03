# ArbiVeil: Confidential Agent Compute

**A privacy-first framework extension enabling AI Agents to compute risk and strategy on Arbitrum without leaking data to the public mempool.**
Built for the **ArbiLink Agentic Bounty**.

## The Problem
AI agents are rapidly becoming first-class citizens in DeFi. However, the current infrastructure forces agents to "think" in the open. When an autonomous agent evaluates its portfolio, checks its risk thresholds, or runs a pre-trade simulation, it does so publicly. This exposes the agent's logic, thresholds, and alpha to MEV bots and front-runners before the actual trade even executes.

## The Solution
**ArbiVeil** is an Agent Skill powered by the **Fhenix Coprocessor on Arbitrum Sepolia**. It provides a confidential compute enclave specifically designed for AI agents. 

Using ArbiVeil, an agent can:
1. Encrypt its proprietary data (e.g., credit scores, target yields, risk parameters).
2. Send that encrypted data to our FHE (Fully Homomorphic Encryption) smart contract on Arbitrum.
3. Validate its parameters entirely on-chain **without ever decrypting the data**.

This ensures that agents can interact with Arbitrum's DeFi ecosystem while keeping their internal state completely private.

---

## ArbiLink Bounty Criteria Met

**Mandatory: Agent Registration** The agent has been successfully registered on the Arbitrum Sepolia Identity Registry (`0x8004A818BFB912233c491871b3d84c89A494BD9e`).
* **Registration TxHash:** `[PASTE_YOUR_REGISTRATION_TX_HASH_HERE]`

**Bonus: Ecosystem Integration** ArbiVeil directly integrates **Fhenix**, a cutting-edge Arbitrum ecosystem project, bringing their FHE coprocessor capabilities to agentic workflows.

**Bonus: Originality** Moving beyond standard AMM swaps or token bridges, this project introduces a primitive for *agent privacy*—a critical missing layer for institutional or high-net-worth autonomous agents.

---

## Architecture

ArbiVeil consists of three core components:

1. **The FHE Contract (`ConfidentialCompute.sol`)** A smart contract deployed on Arbitrum Sepolia utilizing `fhenixjs` to handle `euint32` encrypted variables natively.
   * **Contract Address:** `[PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE]`

2. **The Skill API (`server.js`)** A lightweight Express endpoint acting as the bridge. Agents call this API to encrypt their payload and push the transaction to the Arbitrum network.

3. **The Agent Execution (`agent.js`)** A simulated LLM workflow demonstrating an agent recognizing a sensitive DeFi operation and opting to route its data through the ArbiVeil confidential endpoint.

---

## Quick Start

To run the agent workflow locally:

**1. Install dependencies**
```bash
npm install
```

**2. Configure Environment**
Create a `.env` file in the root directory:
```env
PRIVATE_KEY="your_wallet_private_key"
```

**3. Launch the Skill API**
```bash
node server.js
```

**4. Execute the Agent**
In a separate terminal window, trigger the autonomous agent:
```bash
node agent.js
```

You will see the agent evaluate its strategy, encrypt its data, and successfully execute a confidential transaction on Arbitrum Sepolia.