# Hardhat Fund Me

Use this repo to test and deploy a crowfunding contract using the `hardhat-deploy` plugin.

Check the `package.json` file to see a list of scripts for a quicker debugging.

# Getting Started #
## Requirements:
To run this repo you need to install the following packages:

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - After installing the package run in the terminal the command `git --version` and if the installation was successful the output should look like this: `git version x.xx.x` 
- [Nodejs](https://nodejs.org/en/)
    - In the terminal run the command `node --version`, if the output looks like `vxx.xx.x` that means the package was installed.
- [Yarn](https://yarnpkg.com/getting-started/install)
    - In the terminal run the command `yarn --version`, if the output looks like `x.xx.xx` that means the package was installed.

## Quickstart

Clone this repo, cd into the folder and run `yarn` to install all missing dependencies: 
```
git clone https://github.com/PacelliV/hardhat-fund-me.git
cd hardhat-fund-me
yarn
```
## Usage

- Compile:
```
yarn hardhat compile
```
- Deployment: 
```
yarn hardhat deploy
```
- Testing:
```
yarn hardhat test
```
- Test Coverage:
```
yarn hardhat coverage
```
# Deployment to a testnet or mainnet

1. Setup environment variables:

You'll need to set your `RPC_URL_GOERLI` and `PRIVATE_KEY` as enviroment variables. You can add them in an `.env` file.

-  `PRIVATE_KEY`: The private key of your account (like from [Metamask](https://metamask.io/)). <b>NOTE: IT IS RECOMMENDED TO CREATE A NEW ACCOUNT FOR TESTING PURPOSES AND NEVER USE AN ACCOUNT WITH REAL FUNDS.</b>
    - You can learn how to export a private key [here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
-  `RPC_URL_GOERLI`: This is the url of the goerli node you are working with. You can set up one for free in [Alchemy](https://www.alchemy.com/).

2. Get test ETH

Go to https://goerlifaucet.com/ to get free goerliETH.

3. Deploy

```
yarn hardhat deploy --network goerli
```

# Scripts

After deploying to a tesnet or local net, you can test the functions of the contract by running the following scripts:

```
yarn hardhat run scripts/fund.js --network goerli
```
or
```
yarn hardhat run scripts/withdraw.js --network goerli
```
To run the scripts in hardhat localhost add a new terminal, run `yarn hardhat node` and replace `goerli` for `localhost`.

# Gas estimation

To know how much gas will cost running things in your contract, first go to the `hardhat.config.js` file, change the status of the `gasReporter` from `false` to `true` and run the following command:
```
yarn hardhat test 
```
You'll see the cost report in a new file called `gasReport.txt`. 

The Polygon network is added for comparison, to see how much gas will cost deploying and running your contract in this network just uncomment the lines of code in the `hardhat.config.js` file or add any other network of your interest.

# Estimate gas cost in USD

To get an USD estimation of gas you will need an API to get price of different cryptocurrencies, you can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/account) and set up this API as `COINMARKETCAP_API_KEY`, this variable aslo goes in the `.env` file.

Then, uncomment the line `coinmarketcap: COINMARKETCAP_API_KEY,` in the `hardhat.config.js` file to get the USD estimation. It's worth noting that everytime you run your tests it will use an API call, so it might make sense to have the variable `coinmarketcap` disabled until you need it. All you need to do to disable it is commenting the line.

# Verify on Etherscan

If you deploy to a tesnet or mainnet you can verify your contract if you get an API Key from [Etherscan](https://etherscan.io/login?cmd=last) and set it as `ETHERSCAN_API_KEY` in your `.env` file as seen in `.env.example`.

In it's current state, if you have your API Key set, it will auto verify contracts goerli contracts.

However, you can manually verify with:

```
yarn hardhat verify <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGUMENTS>
```

# Acknowledgements

I want to thanks [PatrickAlphaC](https://github.com/PatrickAlphaC) for teaching me the necessary tools to complete this project in my journey to become a full stack developer.

# Thanks you! 🎉 🎉
I hope you like this repo and it ends up being useful for you 👨‍💻
