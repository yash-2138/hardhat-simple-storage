const {ethers} = require("hardhat")
const {expect, assert} = require("chai")

describe("SimpleStorage", function () {
    // beforeEach will tell what to do before the its 
    let simpleStorage, SimpleStorageFactory
    beforeEach(async function (){
        SimpleStorageFactory = await ethers.getContractFactory(
            "SimpleStorage"
        )
        simpleStorage = await SimpleStorageFactory.deploy()
        
    })  

    it("Should start with favourite number of 0",async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    }) //will tell what this test should do

    it("Should update value when call store",async function (){
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)  -->will do exact same as above line

    })
    

    /*it("Should update add person", async function(){
        let name = "yash"
        let favno = "89"
        const addPersonResponse = await simpleStorage.addPerson(name, favno)
        await addPersonResponse.wait(1)
        const getNo = await simpleStorage.getPerson(name)
        assert.equal(getNo.toString(), favno);
    })
    */
    // it.only("ajf") -->this will only run this task 
})