const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed(); //deploy the NFTMarket contract
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress); //////////////////////////////
    await nft.deployed(); //deploy the NFT contract
    const nftContractAddress = nft.address;

    //get the listing price
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    //set an auction price
    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    //create 2 test tokens
    await nft.createToken("http://www.mytokenlocation.com");
    await nft.createToken("http://www.mytokenlocation2.com");

    //create 2 test nfts
    await market.createMarketItem(nftContractAddress, 1, auctionPrice,
      {value: listingPrice});
    await market.createMarketItem(nftContractAddress, 2, auctionPrice,
      {value: listingPrice});
    const [_, buyerAddress] = await ethers.getSigners();

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1,
      {value: auctionPrice})
    
      //fetch market items
      const items = await market.fetchMarketItems();

      console.log('items: ', items);
  });
});
