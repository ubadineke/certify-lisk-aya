const hre = require('hardhat');

async function main() {
    const [owner, addr1] = await hre.ethers.getSigners();
    // return console.log(owner, addr1);

    // Get the deployed contract
    const RWAToken = await hre.ethers.getContractFactory('RWAToken');
    const rwaToken = await RWAToken.attach('0x7E21b006fa2dB5b374C4A311BC074d7abB76ff8f');
    // return console.log(rwaToken);

    // Register a product
    const tx = await rwaToken.registerProduct('https://example.com/metadata', 'PROD006', 'ZOBO SICT', 'nice car');

    const receipt = await tx.wait();
    console.log('Product registered. Transaction hash:', receipt.transactionHash);
    return console.log(1, receipt);

    // Get token ID by product ID0x7E21b006fa2dB5b374C4A311BC074d7abB76ff8f
    const tokenId = await rwaToken.getTokenIdByProductId('PROD001');
    console.log('Token ID for PROD001:', tokenId.toString());
    return tokenId;
    // Get token URI
    const tokenURI = await rwaToken.tokenURI(tokenId);
    console.log('Token URI:', tokenURI);
    return tokenURI;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
