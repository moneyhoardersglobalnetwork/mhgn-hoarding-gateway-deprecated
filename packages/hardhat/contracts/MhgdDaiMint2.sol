// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IMhgdToken {
    function mint(address, uint256) external;
    function balanceOf(address, uint256) external;
    function transfer(address, uint256) external;
}

contract MhgdDaiMint2 is ReentrancyGuard {
    address public immutable owner;
      struct Minter {
        uint256 minted;
        uint256 mintedAtBlock;
        bool hasMintedBefore;
        uint256 minter_AllTime_Minted;
    }


    uint256 public constant SWAP_FEE = 1e16; // 0.01 DAI
    uint256 public Total_Mint_Transactions = 0;
    uint256 public Total_Mhgd_Swap_Transactions = 0;
    uint256 public Total_Dai_Swap_Transactions = 0;
    uint256 public Total_AllTime_Minted;
    mapping (address => Minter) public minters;

    IERC20 public daiToken;
    IMhgdToken public mhgdToken;
    uint256 public daiReserve;
    uint256 public mhgdReserve;
    uint256 public feesCollected;
    
    

    constructor (address _owner) {
        // Address of the DAI token on Sepolia
        daiToken = IERC20(0xd0e81dE7F68A1AA2bdFdfDd2016ef313700e1Ef3);
        // Address of the MhgdToken contract
        mhgdToken = IMhgdToken(0x649220e012e6D760502964b56B5a7E387084cA8C);
        owner = _owner;
    }

    	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

    /**
     * @dev Mints an equivalent amount of MhgdToken for the transferred DAI
     */
    function mint(uint256 daiAmount) external nonReentrant {
        require(daiToken.balanceOf(msg.sender) >= 0, "You need more Dai to Mint MHGD Tokens SORRY!");
        require(daiToken.transferFrom(msg.sender, address(this), daiAmount), "Transfer of DAI failed");
        mhgdToken.mint(msg.sender, daiAmount);
        minters[msg.sender].minted += daiAmount;
        minters[msg.sender].mintedAtBlock = block.timestamp;
        minters[msg.sender].hasMintedBefore = true;
        minters[msg.sender].minter_AllTime_Minted += daiAmount;
        Total_AllTime_Minted += daiAmount;
        Total_Mint_Transactions += 1;
        daiReserve += daiAmount;
    }
    
    /**
     * @dev Swaps the MhgdToken to DAI less the swap fee.
     */
    function swapMhgd(uint256 mhgdAmount) external nonReentrant {
        require(daiToken.balanceOf(address(this)) >= (mhgdAmount - SWAP_FEE), "Not enough DAI in reserve");
        require(IERC20(address(mhgdToken)).transferFrom(msg.sender, address(this), mhgdAmount), "Transfer of MHGD failed");
        require(daiToken.transfer(msg.sender, mhgdAmount - SWAP_FEE), "Transfer of DAI failed");
        daiReserve -= mhgdAmount;
        mhgdReserve += mhgdAmount;
        feesCollected += SWAP_FEE;
        daiReserve += SWAP_FEE;
        Total_Mhgd_Swap_Transactions += 1;
    }
 
      /**
     * @dev Swaps the DAI to MHGD plus the swap fee 0.01 DAI.
     */
    function swapDai(uint256 daiAmount) external nonReentrant {
        require(daiToken.balanceOf(msg.sender) >= daiAmount + SWAP_FEE, "You need more Dai to Swap for MHGD Tokens SORRY!");
        require(daiToken.transferFrom(msg.sender, address(this), daiAmount + SWAP_FEE), "Transfer of DAI failed");
        mhgdToken.transfer(msg.sender, daiAmount);
        daiReserve += daiAmount;
        daiReserve += SWAP_FEE;
        feesCollected += SWAP_FEE;
        mhgdReserve -= daiAmount;
        Total_Dai_Swap_Transactions += 1;
    }

}