# Hardhat Fund Me

Use this repo to test and deploy a crowfunding contract using the `hardhat-deploy` plugin.

Check the `package.json` file to see a list of scripts for a quicker debugging.

# Getting Started #
## Requirements:
To run this repo first you need to install the following packages:

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - After installing the package run in the terminal the command `git --version` and if the installation was successfull the output should look like this: `git version x.xx.x` 
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
Test Coverage:
```
yarn hardhat coverage
```
# Deployment to a testnet or mainnet

1. Set up environment variables:

You'll need to set your `RPC_URL_GOERLI` and `PRIVATE_KEY` as enviroment variables. Yo can add them to an `.env` file.

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

After deploying to a tesnet or local net, for a quicker testing of the functions you can run the following scripts:

```
yarn hardhat run scripts/fund.js --network goerli
```
or
```
yarn hardhat run scripts/withdraw.js --network goerli
```
To run the scripts in hardhat localhost add a new terminal, run `yarn hardhat node` and replace `goerli` for `localhost`.

# Gas estimation

To know how much gas will cost running things in your contract run the command:
```
yarn hardhat test 
```
You'll see the cost report in a new file called `gasReport.txt`. The Polygon network is added for comparison, just uncomment the lines of code in the `hardhat.config.js` file or add any other network.

# Estimate gas cost in USD

To get a USD estimation of gas you will need a `COINMARKETCAP_API_KEY` environment variable. You can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/account).

Then, uncomment the line `coinmarketcap: COINMARKETCAP_API_KEY,` in the `hardhat.config.js` file to get the USD estimation. It's worth noting that everytime you run your tests it will use an API call, so it might make sense to have the variable `coinmarketcap` disabled until you need it. All you need to do to disable it is commenting the line.

# Verify on Etherscan

If you deploy to a tesnet or mainnet you can verify your contract if you get an API Key from [Etherscan](https://etherscan.io/login?cmd=last) and set it as `ETHERSCAN_API_KEY` in your `.env` file as seen in `.env.example`.

In it's current state, if you have your API Key set, it will auto verify contracts goerli contracts.

# Thanks you!
I hope you like this repo and it ends up being useful for you.