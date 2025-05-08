import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from "hardhat/builtin-tasks/task-names";
import { subtask, task } from "hardhat/config";

import { getHardhatConfigNetworks } from "./hardhat.config.networks";
import { getHardhatConfigScanners } from "./hardhat.config.scanners";


import type { HardhatUserConfig } from "hardhat/config";

import "dotenv/config";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

const PRIVATE_KEYS =
  process.env.PRIVATE_KEY !== undefined ? [`0x${process.env.PRIVATE_KEY}`] : [];

// Filter Reference Contracts
subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(
  async (_, __, runSuper) => {
    const paths = await runSuper();

    return paths.filter((p: any) => !p.includes("contracts/reference/"));
  }
);

const optimizerSettingsNoSpecializer = {
  enabled: true,
  runs: 4_294_967_295,
  details: {
    peephole: true,
    inliner: true,
    jumpdestRemover: true,
    orderLiterals: true,
    deduplicate: true,
    cse: true,
    constantOptimizer: true,
    yulDetails: {
      stackAllocation: true,
      optimizerSteps:
        "dhfoDgvulfnTUtnIf[xa[r]EscLMcCTUtTOntnfDIulLculVcul [j]Tpeulxa[rul]xa[r]cLgvifCTUca[r]LSsTOtfDnca[r]Iulc]jmul[jul] VcTOcul jmul",
    },
  },
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          evmVersion: "london", // Changed from "cancun" to "london"
          viaIR: true,
          optimizer: {
            ...(process.env.NO_SPECIALIZER
              ? optimizerSettingsNoSpecializer
              : { enabled: true, runs: 4_294_967_295 }),
          },
          metadata: {
            bytecodeHash: "none",
          },
          outputSelection: {
            "*": {
              "*": ["evm.assembly", "irOptimized", "devdoc"],
            },
          },
        },
      },
    ],
    overrides: {
      "contracts/conduit/Conduit.sol": {
        version: "0.8.14",
        settings: {
          viaIR: true,
          evmVersion: "london", // Added evmVersion
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
      "contracts/conduit/ConduitController.sol": {
        version: "0.8.14",
        settings: {
          viaIR: true,
          evmVersion: "london", // Added evmVersion
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
      "contracts/helpers/TransferHelper.sol": {
        version: "0.8.14",
        settings: {
          viaIR: true,
          evmVersion: "london", // Added evmVersion
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
      "contracts/helpers/order-validator": {
        version: "0.8.17",
        settings: {
          viaIR: false,
          evmVersion: "london", // Added evmVersion
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    },
  },
  // @ts-ignore
  etherscan: {
    ...getHardhatConfigScanners(),
    // @ts-ignore
    customChains: [
      {
        chainId: 7000,
        network: "zeta_mainnet",
        urls: {
          apiURL: "https://zetachain.blockscout.com/api",
          browserURL: "https://zetachain.blockscout.com",
        },
      },
      {
        chainId: 7001,
        network: "zeta_testnet",
        urls: {
          apiURL: "https://zetachain-testnet.blockscout.com/api",
          browserURL: "https://zetachain-testnet.blockscout.com",
        },
      },
    ],
  },
  networks: {
    ...getHardhatConfigNetworks(PRIVATE_KEYS),
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  // specify separate cache for hardhat, since it could possibly conflict with foundry's
  paths: {
    sources: "./src",
    cache: "./hh-cache",
  },
};

export default config;
