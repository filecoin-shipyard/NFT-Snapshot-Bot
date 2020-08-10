pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// TODO add access controls to ensure only bot can mint and only admin can call admin functions

// TODO - is there a twitter ID we can use to enforce uniqueness in the thread being rolled up?
// TODO - look at Filecoin hash length validation - is it the same as IPFS?
// TODO - Pricing models?
// TODO - ability to set base price fee as admin / or is the price variable - how to get base base?
// TODO - setting expiry on NFT - user has to maintain valida Filecoin has the NFT to be valid?

/**
 * @title Twitter Thread Snapshot / Tokenization Smart Contact
 * @notice Tokenizes twitter threads stored on the Filecoin network
 * @author BlockRocket.tech
*/
contract TwitterThreadSnapshot is ERC721 {
    uint256 tokenSupply;

    mapping(uint256 => string) public tokenIdToSnapshotHashes;
    mapping(string => uint256) public snapshotHashesToTokenId;

    constructor () public ERC721("TwitterThreadSnapshot", "THRD") {}

    function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal virtual override(ERC721) {
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    /**
     * @notice Utility method for checking whether an NFT exists
     * @param _tokenId ID of the NFT
     * @return bool True if an NFT exists, false if not
    */
    function exists(uint256 _tokenId) public view returns (bool) {
        return _exists(_tokenId);
    }

    /**
     * @notice Admin method for updating the token URI of a snapshot
     * @param _tokenId ID of the snapshot
     * @param _uri New token URI
    */
    function setTokenURI(uint256 _tokenId, string memory _uri) public {
        _setTokenURI(_tokenId, _uri);
    }

    /**
     * @notice Admin method for updating the base token URI of a snapshot
     * @param _baseURI Base URI for all tokens
    */
    function setBaseURI(string memory _baseURI) public {
        _setBaseURI(_baseURI);
    }

    /**
     * @notice Performs the tokenisation of a given twitter thread
     * @dev A twitter thread can only be tokenised once
     * @param _snapshotFilecoinHash Base 58 string pointing to the twitter thread content
     * @param _recipient Eth address for the new owner of the twitter thread snapshot
    */
    function mint(string calldata _snapshotFilecoinHash, address _recipient) external {
        require(snapshotHashesToTokenId[_snapshotFilecoinHash] == 0, "Mint: Thread snapshot has already been tokenised");

        tokenSupply = tokenSupply + 1;

        uint256 tokenId = tokenSupply;

        tokenIdToSnapshotHashes[tokenId] = _snapshotFilecoinHash;
        snapshotHashesToTokenId[_snapshotFilecoinHash] = tokenId;

        _mint(_recipient, tokenId);
        _setTokenURI(tokenId, _snapshotFilecoinHash);
    }
}
