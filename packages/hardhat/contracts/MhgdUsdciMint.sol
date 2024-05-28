// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IMhgdToken {
    function mint(address, uint256) external;
    function balanceOf(address, uint256) external;
    function transfer(address, uint256) external;
}
//Allows for the minting of MHGD stable coin and locks USCD into the contract. 

//In production we will remove the withdraw function
//All MHGD will be created by the two mint contracts for usdc and USDC
//Liquidity pools can then be created on DEXs using minted MHGD with 1:1 ratio for usdc and USDC 
contract MhgdUsdcMint is ReentrancyGuard {
    address public immutable owner;
      struct Minter {
        uint256 minted;
        uint256 mintedAtBlock;
        bool hasMintedBefore;
        uint256 minter_AllTime_Minted;
    }

    error NothingToWithdraw(); // Used when trying to withdraw Ether but there's nothing to withdraw.

    uint256 public constant SWAP_FEE = 10; // 0.01 Usdc
    uint256 public Total_Mint_Transactions = 0;
    uint256 public Total_Mhgd_Swap_Transactions = 0;
    uint256 public Total_Usdc_Swap_Transactions = 0;
    uint256 public Total_AllTime_Minted;
    mapping (address => Minter) public minters;

    IERC20 public usdcToken;
    IMhgdToken public mhgdToken;
    uint256 public usdcReserve;
    uint256 public mhgdReserve;
    uint256 public feesCollected;
    
    constructor (address _owner) {
        // Address of the USDC token on Sepolia
        usdcToken = IERC20(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238);
        // Address of the MhgdToken contract
        mhgdToken = IMhgdToken(0x649220e012e6D760502964b56B5a7E387084cA8C);
        owner = _owner;
    }

    /**
     * @dev Mints an equivalent amount of MhgdToken for the transferred USDC 
     */
    function mint(uint256 usdcAmount) external  {
        require(usdcToken.balanceOf(msg.sender) >= 0, "You need more USDC to Mint MHGD Tokens SORRY!");
        require(usdcToken.transferFrom(msg.sender, address(this), usdcAmount), "Transfer of USDC failed");
        mhgdToken.mint(msg.sender, usdcAmount * 1000000000000);
        minters[msg.sender].minted += usdcAmount * 1000000000000;
        minters[msg.sender].mintedAtBlock = block.timestamp;
        minters[msg.sender].hasMintedBefore = true;
        minters[msg.sender].minter_AllTime_Minted += usdcAmount * 1000000000000;
        Total_AllTime_Minted += usdcAmount * 1000000000000;
        Total_Mint_Transactions += 1;
        usdcReserve += usdcAmount;
    }

    /**
     * @dev Swaps the MhgdToken to usdc less the swap fee.
     */
    function swapMhgd(uint256 mhgdAmount) external nonReentrant {
        require(usdcToken.balanceOf(address(this)) >= (mhgdAmount / 1000000000000 - SWAP_FEE), "Not enough usdc in reserve");
        require(IERC20(address(mhgdToken)).transferFrom(msg.sender, address(this), mhgdAmount + SWAP_FEE), "Transfer of MHGD failed");
        require(usdcToken.transfer(msg.sender, mhgdAmount / 1000000000000 - SWAP_FEE), "Transfer of usdc failed");
        usdcReserve -= mhgdAmount / 1000000000000;
        mhgdReserve += mhgdAmount;
        feesCollected += SWAP_FEE;
        usdcReserve += SWAP_FEE;
        Total_Mhgd_Swap_Transactions += 1;
    }
 
      /**
     * @dev Swaps the usdc to MHGD plus the swap fee 0.01 usdc.
     */
    function swapusdc(uint256 usdcAmount) external nonReentrant {
        require(usdcToken.balanceOf(msg.sender) >= usdcAmount + SWAP_FEE, "You need more usdc to Swap for MHGD Tokens SORRY!");
        require(usdcToken.transferFrom(msg.sender, address(this), usdcAmount + SWAP_FEE), "Transfer of usdc failed");
        mhgdToken.transfer(msg.sender, usdcAmount * 1000000000000);
        usdcReserve += usdcAmount;
        usdcReserve += SWAP_FEE;
        feesCollected += SWAP_FEE;
        mhgdReserve -= usdcAmount * 1000000000000;
        Total_Usdc_Swap_Transactions += 1;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    // Should be removed in production so liquidity is locked in contract it is add here for testing contract.
     function withdrawToken(
        address _beneficiary,
        address _token
    ) public onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();
        IERC20(_token).transfer(_beneficiary, amount);
    }

}