import React from 'react';
import { Heading, Text, HStack, Box } from '@chakra-ui/react';
import { ethers, BigNumber } from 'ethers';
import hkPunksNFT from '../HKPunksNFT.json';
import './Styles/MainMint.css';

// get the contract address from etherscan
const contractAddress = '0x3d7460dF61a646d39AABd3A4729DFAa164dc680D';

export default function MainMint({ accounts, setAccounts }) {
    const [mintAmount, setMintAmount] = React.useState(1);

    async function connectWallet() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    
    // call mint method of the contract
    async function handleMint() {
        const ABI = hkPunksNFT.abi;
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // to make connections to contract deployed, you'll need 3 things:
            // 1. contract address, 2. contract's ABI, 3. signer instance
            const contract = new ethers.Contract(contractAddress, ABI, signer);
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.01 * mintAmount).toString())
                });
                console.log('response:', response);
            } catch(err) {
                console.error(err);
            }
        }
        setMintAmount(1);
    }

    // increase and decrease mint amount
    function handleDecrement() {
        if (mintAmount > 1)
            setMintAmount((oldMintAmount) => oldMintAmount - 1);
    }

    function handleIncrement() {
        if (mintAmount < 3)
            setMintAmount((oldMintAmount) => oldMintAmount + 1);
    }

    return (
        <main className={"mint-area " + (accounts.length > 0 ? "connected" : "not-connected")}>
            <Heading className="mint-title">
                {/* Welcome to RoboPunks */}
                WELCOME TO MINT WEBSITE
            </Heading>

            <Text color='gray.600' className="mint-text">
                {/* Hello there! This is RoboPunksNFT Minting website! You can Mint various types of RoboPunks NFT's image that are cute and futuristic! Only 1000 NFTs are supplied, please do not hesitate! */}
                Hello there! This is a minting website! You can Mint various types of NFT's image that are cute and has potentital in its value. Only 1000 NFTs are supplied, please do not hesitate!
            </Text>

            {
                accounts.length > 0 ?
                <div className="mint-now">
                    <HStack
                        className="quantity-meter" 
                        justifyContent="center"
                        columnGap={8}
                        fontSize={48}
                    >
                        <Box className="mint-amount-actions" onClick={(event) => handleDecrement()}>-</Box>
                        <Box className="mint-amount">{ mintAmount }</Box>
                        <Box className="mint-amount-actions" onClick={(event) => handleIncrement()}>+</Box>
                    </HStack>
                    <button
                        className="mint-button" 
                        onClick={() => handleMint()}
                    >
                        Mint now!
                    </button>
                </div>
                :
                <button 
                    className="connect-wallet mint-button" 
                    onClick={() => connectWallet()}
                >
                    Connect to wallet now!
                </button>
            }
        </main>
    );
}