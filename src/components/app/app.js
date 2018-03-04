// Import the page's CSS. Webpack will know what to do with it.
import "./app.css";
import $ from "jquery";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Dashboard from "../dashboard/dashboard";
// import Web3 from "../../../web3.js-1.0/dist/web3.js";
import Web3 from "web3";

export default class App
{
  constructor(inWeb3)
  {
    this.web3 = inWeb3;
  }

  start(inWeb3)
  {
    $("body").append(new Dashboard(this.web3));
    // $("body").append(new WalletGenerator());
    // $("body").append(new ContractGenerator());
    // Connect to the network
    // let provider = new providers.Web3Provider( window.web3.currentProvider);
    // let wallet CRWNRR_Token.new({from: creator});
    // // let provider = ethers.providers.getDefaultProvider();
    // let contract = new ethers.Contract(address, abi, provider);
    // // Create a wallet to deploy the contract with
    // let privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
    // let wallet = new ethers.Wallet(privateKey, provider);
    //
    // // Send the transaction
    // let sendPromise = wallet.sendTransaction(deployTransaction);
    // // Get the transaction
    // sendPromise.then(function(transaction) {
    //     console.log(transaction);
    // });
    //
    // web3Provider.listAccounts().then(function(accounts) {
    //     var signer = web3Provider.getSigner(accounts[1]);
    //     console.log(signer);
    // });
  }

}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  }
  else
  {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3();
  }
  // window.web3.setProvider("ws://localhost:8546");
  // window.web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
  window.web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
  window.app = new App(window.web3);
  window.app.start();
});
