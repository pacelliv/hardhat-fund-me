# Hardhat Fund Me

Use this repo to deploy and test a crowfunding contract.

Check the package.json to see scripts for a quicker debugging.

# Getting Started #
## Requirements:

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - After installing the package run in the terminal `git --version` and if the installation was successfull the output should look like: `git version x.xx.x` 
- [Nodejs](https://nodejs.org/en/)
    - In the terminal run the command `node --version`, if the output looks like `vxx.xx.x` that means the package was installed.
- [Yarn](https://yarnpkg.com/getting-started/install)
    - In the terminal run the command `yarn --version`, if the output looks like `x.xx.xx` that means the package was installed.

## Quickstart

Clone this repo, cd into the folder and run yarn to install all missing dependencies: 
```
git clone https://github.com/PacelliV/hardhat-fund-me.git
cd hardhat-fund-me
yarn

```
## Usage

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