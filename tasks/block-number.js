const {task} = require("hardhat/config")

task("block-number","Prints the current block number").setAction(
    //function without name :anonymous function
    //hre -> hardhat runtime environment , can access packages that hardhat package can
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}