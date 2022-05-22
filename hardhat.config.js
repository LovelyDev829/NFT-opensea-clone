require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "8043824f000a4dd9b5581d543d1b21f4"
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      account: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      account: [privateKey]
    }
  },
  solidity: "0.8.4",
};
