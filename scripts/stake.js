// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const name = "Stake EthlinQ LP";
  const symbol = "SELP";
  const ethlinqPair = "0x2afb813363F9339bb9C7ab59C0D33f11dE1bfaeF";
  // We get the contract to deploy
  const stakeEthlinqLP = await hre.ethers.getContractFactory("EthlinQStaking");

  const selp = await stakeEthlinqLP.deploy(name, symbol, ethlinqPair);
  await selp.deployed();
  console.log("selp deployed to:", selp.address);

  const args = [name, symbol, ethlinqPair];
  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await selp.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
  await run(`verify:verify`, {
    address: selp.address,
    constructorArguments: [name, symbol, ethlinqPair],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
