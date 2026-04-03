console.log("🤖 [Agent] Evaluating high-yield DeFi position...");
console.log("🤖 [Agent] I must not leak my strategy to the public mempool.");
console.log("🤖 [Agent] Calling Fhenix Confidential Skill on Arbitrum...");

fetch("http://localhost:3000/verify-risk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ riskScore: 820 }) // The agent's private data
})
.then(res => res.json())
.then(data => {
    console.log("\n✅ [Agent] Execution Complete:");
    console.log(data);
    console.log(`🔍 View on Arbiscan: https://sepolia.arbiscan.io/tx/${data.txHash}`);
})
.catch(err => console.error("Error:", err));