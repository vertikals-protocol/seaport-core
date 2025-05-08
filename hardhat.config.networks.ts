import type { NetworksUserConfig } from 'hardhat/types'
import { localNodeConfig } from './hardhat.config.helper'

export const getHardhatConfigNetworks = (
  PRIVATE_KEYS: string[],
): NetworksUserConfig => ({
  sepolia: {
    accounts: PRIVATE_KEYS,
    gas: 'auto',
    gasMultiplier: 2,
    url: `https://ethereum-sepolia.publicnode.com`,
  },

  bsctestnet: {
    accounts: PRIVATE_KEYS,
    chainId: 97,
    gas: 'auto',
    gasMultiplier: 3,
    url: `https://rpc.ankr.com/bsc_testnet_chapel`,
  },

  docker: {
    url: 'http://blockchain:8545',
  },

  zeta_testnet: {
    accounts: PRIVATE_KEYS,
    chainId: 7001,
    gas: 5000000,
    gasPrice: 80000000000,
    url: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public'
  },

  zeta_mainnet: {
    accounts: PRIVATE_KEYS,
    chainId: 7000,
    gas: "auto",
    gasMultiplier: 3,
    url: `https://zetachain-evm.blockpi.network/v1/rpc/public`,
  },
  // HH
  hardhat: {
    ...localNodeConfig(),
  },

  mainnet: {
    accounts: PRIVATE_KEYS,
    gas: 'auto',
    gasMultiplier: 3,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    live: true,

    saveDeployments: true,
    timeout: 3600000,
    url: `https://rpc.ankr.com/eth`, //1hr
  },

  // MATIC
  'polygon-mumbai': {
    accounts: PRIVATE_KEYS,
    // gas: 5000000,
    // gasPrice: 80000000000,
    gas: 'auto',

    gasMultiplier: 3,
    url: 'https://rpc.ankr.com/polygon_mumbai',
  },

  // ARB
  rinkArby: {
    accounts: PRIVATE_KEYS,
    chainId: 421611,
    gas: 'auto',
    gasMultiplier: 3,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    live: true,

    saveDeployments: true,
    url: 'https://rinkeby.arbitrum.io/rpc',
  },

})
