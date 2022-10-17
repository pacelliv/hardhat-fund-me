const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", () => {
          let fundMe
          let deployer
          let mockV3Aggregator
          const sendValue = ethers.utils.parseEther("1") // 1 ETH
          beforeEach(async () => {
              //deploy our fundMe contract using hardhat-deploy
              await deployments.fixture(["all"])
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })
          describe("constructor", () => {
              it("sets the aggregator address correctly", async () => {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          describe("constructor", () => {
              it("sets the deployer as the owner", async () => {
                  const response = await fundMe.getOwner()
                  assert.equal(response, deployer)
              })
          })

          describe("fund", () => {
              it("fails if you don't send enought ETH", async () => {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })
              it("update the amount funded data structure", async () => {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer
                  )
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("add funder to the getFunder array", async () => {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.getFunder(0)
                  assert.equal(funder, deployer)
              })
          })

          describe("receive", () => {
              beforeEach(async () => {
                  await fundMe.signer.sendTransaction({
                      value: sendValue,
                      from: deployer,
                      to: fundMe.address,
                      gasLimit: 420000,
                  })
              })
              it("invokes the receive function", async () => {
                  const currentBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  assert.equal(currentBalance, sendValue.toString())
              })
          })

          describe("fallback", () => {
              beforeEach(async () => {
                  await fundMe.signer.sendTransaction({
                      value: sendValue,
                      from: deployer,
                      to: fundMe.address,
                      gasLimit: 420000,
                      data: "0x90abf2",
                  })
              })
              it("invokes the fallback function", async () => {
                  const currentBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  assert.equal(currentBalance, sendValue.toString())
              })
          })

          describe("withdraw", () => {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              })
              it("can withdraw from a single funder", async () => {
                  //arrange
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  //assert
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance.add(startingDeployerBalance),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })

              it("allows to withdraw with multiple funders", async () => {
                  //arrange
                  const accounts = await ethers.getSigners()

                  //i starts at 1 because zero is the deployer
                  for (i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      )
                      await fundMeConnectedContract.fund({ value: sendValue })
                  }
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  //act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)
                  //assert
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  //gasCost
                  //assert
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
                  // make sure getFunders are reset properly
                  await expect(fundMe.getFunder(0)).to.be.reverted

                  for (i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.getAddressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      )
                  }
              })
          })
          describe("cheaper withdraw", () => {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              })
              it("allows to cheaperWithdraw from a single funder", async () => {
                  //arrange
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  //act
                  const transactionResponse = await fundMe.cheaperWithdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  //assert
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance.add(startingDeployerBalance),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
              it("only allows the owner to withdraw", async () => {
                  const accounts = await ethers.getSigners()
                  const attacker = accounts[1]
                  const attackerConnectedContract = await fundMe.connect(
                      attacker
                  )
                  await expect(
                      attackerConnectedContract.cheaperWithdraw()
                  ).to.be.revertedWith("FundMe__NotOwner")
              })
          })
          it("allows to cheaperWithdraw with multiple funders", async () => {
              //arrange
              const accounts = await ethers.getSigners()

              //i starts at 1 because zero is the deployer
              for (i = 1; i < 6; i++) {
                  const fundMeConnectedContract = await fundMe.connect(
                      accounts[i]
                  )
                  await fundMeConnectedContract.fund({ value: sendValue })
              }
              const startingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              const startingDeployerBalance = await fundMe.provider.getBalance(
                  deployer
              )
              //act
              const transactionResponse = await fundMe.cheaperWithdraw()
              const transactionReceipt = await transactionResponse.wait(1)
              const { gasUsed, effectiveGasPrice } = transactionReceipt
              const gasCost = gasUsed.mul(effectiveGasPrice)
              //assert
              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              const endingDeployerBalance = await fundMe.provider.getBalance(
                  deployer
              )
              //gasCost
              //assert
              assert.equal(endingFundMeBalance, 0)
              assert.equal(
                  startingFundMeBalance.add(startingDeployerBalance).toString(),
                  endingDeployerBalance.add(gasCost).toString()
              )
              // make sure getFunders are reset properly
              await expect(fundMe.getFunder(0)).to.be.reverted

              for (i = 1; i < 6; i++) {
                  assert.equal(
                      await fundMe.getAddressToAmountFunded(
                          accounts[i].address
                      ),
                      0
                  )
              }
          })
      })
