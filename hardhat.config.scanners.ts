export const getHardhatConfigScanners = () => ({
  apiKey: {
    // BSC
    bscTestnet: process.env.BSCSCAN_API_KEY || '',

    mainnet: process.env.ETHERSCAN_API_KEY || '',

    // MATIC
    polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',

    rinkeby: process.env.ETHERSCAN_API_KEY || '',

    // ETH
    sepolia: process.env.ETHERSCAN_API_KEY || '',

    zeta_mainnet: "NO_TOKEN",
    
    zeta_testnet: "NO_TOKEN",
  },
})
