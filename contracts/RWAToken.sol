// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RWAToken is ERC721URIStorage {
    uint256 private _tokenIdCounter;
    mapping(string => uint256) private _productIdToTokenId;
    mapping(uint256 => string) private _tokenIdToName;

    // Define a struct for the NFT metadata
    struct ProductMetadata {
        string name; // Name of the product
        string description; // Description of the product
    }

    // Mapping from token ID to metadata
    mapping(uint256 => ProductMetadata) private _tokenIdToMetadata;

    event ProductRegistered(address indexed producer, uint256 tokenId, string tokenURI, string productId, string name);

    // Fixed values for the name and symbol of the NFT
    constructor() ERC721("RWAToken", "RWA") {
        _tokenIdCounter = 0;
    }

    function registerProduct(string memory tokenURI, string memory productId, string memory name, string memory description) public returns (uint256) {
        require(_productIdToTokenId[productId] == 0, "Product ID already registered");

        uint256 newTokenId = _tokenIdCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIdCounter++;

        _productIdToTokenId[productId] = newTokenId;
        _tokenIdToName[newTokenId] = name;

        // Set the metadata for the token
        _tokenIdToMetadata[newTokenId] = ProductMetadata(name, description);

        emit ProductRegistered(msg.sender, newTokenId, tokenURI, productId, name);

        return newTokenId;
    }

    function getTokenIdByProductId(string memory productId) public view returns (uint256) {
        require(_productIdToTokenId[productId] != 0, "Product ID not found");
        return _productIdToTokenId[productId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
