const express = require('express');
const { ethers, JsonRpcProvider } = require('ethers');
const QRCode = require('qrcode');
const dotenv = require('dotenv');
const hre = require('hardhat');
const provider = new JsonRpcProvider('https://rpc.sepolia-api.lisk.com');
console.log(provider);
dotenv.config();

const app = express();
app.use(express.json());

// Initialize Ethereum provider and contract
const wallet = new ethers.Wallet(process.env.WALLET_KEY, provider);
const contractABI = require('./artifacts/contracts/RWAToken.sol/RWAToken.json').abi;
const contractAddress = '0x5b3808cA145Ff92190aDf242cbAD06cef5eA08da';
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Register product endpoint
app.post('/register', async (req, res) => {
    try {
        const { productId, name, description } = req.body;
        console.log(productId, name, description);

        // Register product on blockchain
        const tx = await contract.registerProduct('https://metadata.com', productId, name, description, {
            gasLimit: 500000,
        });

        // console.log(1, tx);
        const receipt = await tx.wait();

        // Generate QR code
        const qrCodeData = `http://localhost:3000/verify/${productId}`;
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        console.log(receipt);
        res.json({
            success: true,
            message: 'Product registered successfully',
            transactionHash: receipt.hash,
            qrCode: qrCodeImage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
    }
});

// Verify product endpoint
app.get('/verify/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        // Verify product on blockchain
        const tokenId = await contract.getTokenIdByProductId(productId);

        res.json({
            success: true,
            message: 'Product verified successfully',
            tokenId: tokenId.toString(),
            transactionHash: tokenId.hash, // Note: You might need to adjust this based on how you're storing the transaction hash
        });
    } catch (error) {
        console.error(error);
        if (error.message.includes('Product ID not found')) {
            res.status(404).json({ success: false, message: 'Product not found', error: error.message });
        } else {
            res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
