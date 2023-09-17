// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/**
 * @title BOP Token Faucet Contract a.k.a "The gift that keeps on giving!"
 * @author @moneyhoardermike with help from Polygon Copilot
 * @notice This contract is a faucet which allows to get random number of given ERC20 token in between 1 & 6000 or a set amount by deployer We plan to integrate chainlink VRF Raffle.
 *//*
 This M.H.G.N  contract was written by @moneyhoardermike with help from Polygon Co-Pilot.
Its follows MHGN's Project 6 model drips 600 BOP tokens at time for a max of 6000 BOP Tokens.
It also requires users balance to be zero to prevent spamming and encourage 
hoarding, swapping, or donating BOP tokens where you can then with a zero wallet balance catch a drip from the faucet. 
This Contract is for BOP "Blocks Of Passion Token" a.k. BOP by M.H.G.N.*/
contract BopFaucetContract is Ownable {
   struct Dripper {
        uint256 timeDripped;
        bool gotDripped;
        uint256 Total_AllTime_Dripped;
    }


    mapping (address => Dripper) public drippers;
    ERC20 public driptoken;
    event GotDripped(address indexed user, uint256 amount);
    event Pooled(address indexed user, uint256 amount);
    
    constructor(address _tokenAddress) {
        driptoken = ERC20(_tokenAddress);
    }
    uint256 internal GotDrippedMax = 5400000000000000000000;  //We use 5400 as max this should allow 6000 tokens to drip before revert and error message
    uint256 public Limit = 6000000000000000000000; // We make the limt publicly visible here
    uint256 public Total_Donated;
    uint256 public Total_Drip_Pool;
    uint256 public Total_Dripped;
    
    /**
    * @notice This function allows user to get 600 BOP tokens.
    * @dev Owner must have enough balance of token to use this function.
    */
    function drip() public {
        uint256 _amount = 600000000000000000000;
        require(driptoken.balanceOf(address(this)) >= _amount, "Not enough tokens in faucet to drip");
        require(driptoken.balanceOf(msg.sender) <= 6, " This faucet only drips to the less fortunate, on-boarders or those hoarding their total balance if you have tokens already you could donate, swap, or hoard them to use faucet again");
        require(drippers[msg.sender].Total_AllTime_Dripped <= GotDrippedMax, "You reached the max drips of 6000");
        driptoken.transfer(msg.sender, _amount);
        drippers[msg.sender].gotDripped = true;
        drippers[msg.sender].timeDripped = block.timestamp;
        drippers[msg.sender].Total_AllTime_Dripped += _amount;
        
        Total_Drip_Pool -= _amount;
        Total_Dripped += _amount;
        emit GotDripped(msg.sender, _amount);
    }

     //Transfers tokens to the hoarding rewards pool as a donation the tokens can't be withdrawn!
    function DonationPool(uint256 _amount) public  {
        require(driptoken.balanceOf(msg.sender) >= 0, "You cannot pool more tokens than you hold");
        driptoken.transferFrom(msg.sender, address(this), _amount);
        Total_Drip_Pool += _amount;
        Total_Donated += _amount;
        emit Pooled(msg.sender, _amount);
    }

/*
Experiment with on-chain randomness the chainlink Raffle Contract should be integrated keeping a 6000 token limit
Work on tracking the donors activity more like putting total_donated in Struct 
Warning: Since the VM version paris, "difficulty" was replaced by "prevrandao", which now returns a random number based on the beacon chain.
  --> contracts/BopFaucetContract.sol:61:65:
   |
61 |         return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%6000; Switch back for live
    function _random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao)))%600000000000000000000;
    }*/
}