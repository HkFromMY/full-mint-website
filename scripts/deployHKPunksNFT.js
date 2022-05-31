const hre = require('hardhat');

async function main() {
    const HKPunksNFT = await hre.ethers.getContractFactory("HKPunksNFT");
    // only pass arguments into deploy method if the constructor of the contract has a parameter
    const hkPunksNFT = await HKPunksNFT.deploy();

    await hkPunksNFT.deployed();

    // print out message informing that success deployment and its contract address
    console.log("HKPunksNFT deployed to:", hkPunksNFT.address);
}

// this pattern is to allow the usage of async/await anywhere
main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });