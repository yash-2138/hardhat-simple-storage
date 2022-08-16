//imports
const { ethers, run, network } = require("hardhat") //ehters dosent know about the contracts whereas hardhat knows
//run allows us to run any hardhat task
//network to get network configuration information
//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy() //deploying
    await SimpleStorage.deployed() //wait to be deployed
    //no need of rpcurl or private key to deploy
    console.log(`deployed contract t0:${SimpleStorage.address}`)

    //interacting with contract

    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current Value: ${currentValue}`)
      
        //updating value
    const transactionResponse = await SimpleStorage.store(5)
    await transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve();
    console.log(`Updated value: ${updatedValue}`)
    
    //verify only when we are using testnet

    if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
        await SimpleStorage.deployTransaction.wait(6) //wait for some blocks to be mined so that etherscan can know about the transaction
        await verify(SimpleStorage.address,[])  //need to add await as verify is a async function so we need to wait until it is fully executed
    }
}       

//verify
//since there are no constructors the arguments will be blank otherwise they will be populated
async function verify(contractAddress, args){
    console.log("Verifying contract..")
    
    try{ 
        await run("verify:verify",{            //verify function with verify task
            address: contractAddress,
            constructorArguments: args,
        })
    }catch (e){
        if(e.message.toLowerCase().includes("already verified")){
            console.log("Already Verified")
        }
        else{
            console.log(e);
        }
    }
}
//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
