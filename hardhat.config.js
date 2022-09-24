require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-waffle")

/** @type import('hardhat/config').HardhatUserConfig */

const RPC_URL_GOERLI = process.env.RPC_URL_GOERLI || "https://goerli.net/"
const RPC_URL_POLYGON =
    process.env.RPC_URL_POLYGON || "https://polygonscan.com/"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xKey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

module.exports = {
    //solidity: "0.8.9",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: RPC_URL_GOERLI || "https://goerli.net/",
            chainId: 5,
            accounts: [PRIVATE_KEY],
            blockConfirmations: 6,
        },
        polygon: {
            url: RPC_URL_POLYGON || "https://polygonscan.com/",
            chainId: 137,
            accounts: [],
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gasReport.txt",
        noColors: true,
        //coinmarketcap: COINMARKETCAP_API_KEY,
        // token: "MATIC",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
