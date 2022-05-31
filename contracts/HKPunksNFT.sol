// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract HKPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;  // current outputted supply
    uint256 public maxSupply;  // maximum supply
    uint256 public maxPerWallet; // maximum NFT per wallet can get
    bool public isPublicMintEnabled;  // public sales or private
    string internal baseTokenUri;  // used to determine where the images are located
    address payable public withdrawWallet;  // where to withdraw money to (receiver wallet)
    mapping(address => uint256) public walletMints;  // dictionary data-type that maps wallet address to int to track how many NFT per wallet mints

    constructor() payable ERC721('HKPunks', 'HP') {
        mintPrice = 0.01 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 10;
        withdrawWallet = payable(0x7809f0B63ac39a97f2D6216Fb0B954393Eb1BB35); // set withdraw wallet address here
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    // display images on OpenSea
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), 'Token does not exist!');
        return string (abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        // withdraw funds to the withdrawWallet address specified
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }(''); // emptied the funds in the contract
        require(success, 'withdraw failed');
    }

    function mint(uint256 _quantity) public payable {
        // payable means requires a value trasactions (ethers)
        require(isPublicMintEnabled, 'Minting is not public/enabled yet!');
        require(msg.value == _quantity * mintPrice, 'Wrong mint value (Maybe not enough balance)');
        require(totalSupply + _quantity <= maxSupply, 'The supply of mint is not enough! (SOLD OUT)');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Exceed amount of mints per wallet!');

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;  // make sure variable changes (effect) happens before interaction like _safeMint() function below
            walletMints[msg.sender]++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}