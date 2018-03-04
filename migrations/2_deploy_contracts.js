
var CRWNRR_Crowdsale = artifacts.require("./CRWNRR_Crowdsale.sol");

module.exports = function(deployer, network, accounts){
  deployTestCrowdsale(deployer, accounts);
};

function deployTestCrowdsale(deployer, accounts) {

   // const startTime = latestTime();
   // const endTime = startTime + (86400 * 20) // 20 days
   // const rate = new web3.BigNumber(1000);
   // const goal = web3.toWei(250, 'ether');
   // const cap = web3.toWei(4000, 'ether');
   // const wallet = accounts[0];

   //return deployer.deploy(CRWNRR_SimpleCrowdsale, startTime, endTime, rate, wallet, {gas: 4712388, from: wallet});
   // return deployer.deploy(CRWNRR_Crowdsale, startTime, endTime, rate, goal, cap, wallet, {gas: 5712388, from: wallet});

}

function latestTime() {
  return web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1
}
