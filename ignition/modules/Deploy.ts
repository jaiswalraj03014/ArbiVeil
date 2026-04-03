import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ConfidentialComputeModule", (m) => {
  const confidentialCompute = m.contract("ConfidentialCompute");
  return { confidentialCompute };
});