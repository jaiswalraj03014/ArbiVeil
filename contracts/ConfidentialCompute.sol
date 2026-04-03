// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20;

import "@fhenixprotocol/contracts/FHE.sol";

contract ConfidentialCompute {
    euint32 private encryptedData;

    // AI Agent privately stores/updates data without leaking to the mempool
    function setEncryptedData(inEuint32 calldata inData) public {
        encryptedData = FHE.asEuint32(inData);
    }
}