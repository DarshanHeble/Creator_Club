// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorClubToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("CreatorClubToken", "CCT") Ownable(initialOwner) {
        _mint(initialOwner, 1_000_000 * 10 ** decimals()); // Mint 1M tokens to initialOwner
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferTokens(address to, uint256 amount) public {
        transfer(to, amount);
    }
}