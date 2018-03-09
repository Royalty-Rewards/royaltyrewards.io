import "document-register-element";
import Web3 from "web3";
import ethers from "ethers";
import lightwallet from "eth-lightwallet/index.js";
import HookedWeb3Provider from "hooked-web3-provider";
import $ from "jquery";
import template from "./wallet-generator-v2.html";

const kEnterSeedPrompt = "Please enter a valid seed";
//Generate 2 address for each wallet by default..()
const kNumInitialAddresses = 1;
//Ethereum test network port...
const kNetworkAddress = "http://localhost:8545";
const kMaxGasPerTransaction = 21000;

//Creates an instance of a Hierarchical Derivation Wallet aka HD Wallet
export default class WalletGenerator extends HTMLElement{

	constructor()
	{
		super();
    this.innerHTML = template;
	}

	// Fires when an instance was removed from the document.
	disconnectedCallback()
	{

	}

	// Fires when an instance was inserted into the document.
	connectedCallback()
	{
    loadExample();
	}
}

customElements.define("wallet-generator-v2", WalletGeneratorV2);

function loadExample()
{

function setEnter(source, target) {
		source.onkeyup = function(e) {
				if (e.which === 13) { target.click(); }
		}
}
var cancelScrypt = false;
document.getElementById('loading-cancel').onclick = function() {
		cancelScrypt = true;
};
var updateLoading = (function() {
		var loadingStatus = document.getElementById('loading-status');
		return (function(progress) {
				loadingStatus.value = (parseInt(progress * 100)) + '%';
				return cancelScrypt;
		});
})();
(function() {
		var inputUsername = document.getElementById('select-brainwallet-username');
		var inputPassword = document.getElementById('select-brainwallet-password');
		var inputConfirmPassword = document.getElementById('select-brainwallet-confirm-password');
		var submit = document.getElementById('select-submit-brainwallet');
		function checkBrainwallet() {
				if (inputUsername.value && inputPassword.value && inputPassword.value === inputConfirmPassword.value) {
						submit.classList.remove('disable');
				} else {
						submit.classList.add('disable');
				}
		}
		inputUsername.oninput = checkBrainwallet;
		inputPassword.oninput = checkBrainwallet;
		inputConfirmPassword.oninput = checkBrainwallet;
		setEnter(inputUsername, submit);
		setEnter(inputPassword, submit);
		setEnter(inputConfirmPassword, submit);
		submit.onclick = function() {
				if (submit.classList.contains('disable')) { return; }
				var username = new ethers.utils.toUtf8Bytes(inputUsername.value);
				var password = new ethers.utils.toUtf8Bytes(inputPassword.value);
				showLoading('Summoning Brain Wallet...');
				cancelScrypt = false;
				ethers.Wallet.fromBrainWallet(username, password, updateLoading).then(function(wallet) {
						showWallet(wallet);
						document.getElementById('wallet-username').textContent = inputUsername.value;
				}, function (error) {
						if (error.message !== 'cancelled') {
								alert('Unknown error');
						}
						showSelect();
				});
		};
})();
(function() {
		var inputFile = document.getElementById('select-wallet-file');
		var targetDrop = document.getElementById('select-wallet-drop');
		var inputPassword = document.getElementById('select-wallet-password');
		var submit = document.getElementById('select-submit-wallet');
		function check() {
				if (inputFile.files && inputFile.files.length === 1) {
						submit.classList.remove('disable');
						targetDrop.textContent = inputFile.files[0].name;
				} else {
						submit.classList.add('disable');
				}
		}
		inputFile.onchange = check;
		inputPassword.oninput = check;
		setEnter(inputPassword, submit);
		inputFile.addEventListener('dragover', function(event) {
				event.preventDefault();
				event.stopPropagation();
				targetDrop.classList.add('highlight');
		}, true);
		inputFile.addEventListener('drop', function(event) {
				targetDrop.classList.remove('highlight');
		}, true);
		submit.onclick = function() {
				if (submit.classList.contains('disable')) { return; }
				var fileReader = new FileReader();
				fileReader.onload = function(e) {
						var json = e.target.result;
						if (ethers.Wallet.isCrowdsaleWallet(json)) {
								showWallet(Wallet.decryptCrowdsale(json, password));
						} else if (ethers.Wallet.isValidWallet(json)) {
								showLoading('Decrypting Wallet...');
								var password = new ethers.Wallet.utils.Buffer(inputPassword.value);
								cancelScrypt = false;
								ethers.Wallet.decrypt(json, password, function(error, wallet, progress) {
										if (error) {
												if (error.message === 'invalid password') {
														alert('Wrong Password');
												} else {
														console.log(error);
														alert('Error Decrypting Wallet');
												}
												showSelect();
										} else if (wallet) {
												showWallet(wallet);
										} else {
												updateLoading(progress);
										}
										return cancelScrypt;
								});
						} else {
								alert('Unknown JSON wallet format');
						}
				};
				fileReader.readAsText(inputFile.files[0]);
		};
})();
(function() {
		var inputPrivatekey = document.getElementById('select-privatekey');
		var submit = document.getElementById('select-submit-privatekey');
		function check() {
				if (inputPrivatekey.value.match(/^(0x)?[0-9A-fa-f]{64}$/)) {
						submit.classList.remove('disable');
				} else {
						submit.classList.add('disable');
				}
		}
		inputPrivatekey.oninput = check;
		setEnter(inputPrivatekey, submit);
		submit.onclick = function() {
				if (submit.classList.contains('disable')) { return; }
				var privateKey = inputPrivatekey.value;
				if (privateKey.substring(0, 2) !== '0x') { privateKey = '0x' + privateKey; }
				showWallet(new ethers.Wallet(privateKey));
		}
})();
var activeWallet = null;
function showError(error) {
		alert('Error \u2014 ' + error.message);
}
// Refresh balance and transaction count in the UI
var refresh = (function() {
		var inputBalance = document.getElementById('wallet-balance');
		var inputTransactionCount = document.getElementById('wallet-transaction-count');
		var submit = document.getElementById('wallet-submit-refresh');
		function refresh() {
				addActivity('> Refreshing details...');
				activeWallet.getBalance('pending').then(function(balance) {
						addActivity('< Balance: ' + balance.toString(10));
						inputBalance.value = ethers.utils.formatEther(balance, {commify: true});
				}, function(error) {
						showError(error);
				});
				activeWallet.getTransactionCount('pending').then(function(transactionCount) {
						addActivity('< TransactionCount: ' + transactionCount);
						inputTransactionCount.value = transactionCount;
				}, function(error) {
						showError(error);
				});
		}
		submit.onclick = refresh;
		return refresh;
})();
var addActivity = (function() {
		var activity = document.getElementById('wallet-activity');
		return function(message, url) {
				var line = document.createElement('a');
				line.textContent = message;
				if (url) { line.setAttribute('href', url); }
				activity.appendChild(line);
		}
})();
// Set up the wallet page
(function() {
		var inputTargetAddress = document.getElementById('wallet-send-target-address');
		var inputAmount = document.getElementById('wallet-send-amount');
		var submit = document.getElementById('wallet-submit-send');
		// Validate the address and value (to enable the send button)
		function check() {
				try {
						ethers.utils.getAddress(inputTargetAddress.value);
						ethers.utils.parseEther(inputAmount.value);
				} catch (error) {
						submit.classList.add('disable');
						return;
				}
				submit.classList.remove('disable');
		}
		inputTargetAddress.oninput = check;
		inputAmount.oninput = check;
		var optionTestnet = document.getElementById('option-testnet');
		var optionMainnet = document.getElementById('option-mainnet');
		// Select the testnet network
		optionTestnet.onclick = function() {
				if (optionTestnet.classList.contains('selected')) { return; }
				addActivity('! Switched network: Testnet');
				activeWallet.provider = new ethers.providers.getDefaultProvider(true);
				optionTestnet.classList.add('selected');
				optionMainnet.classList.remove('selected');
				refresh();
		}
		// Select the mainnet network
		optionMainnet.onclick = function() {
				if (optionMainnet.classList.contains('selected')) { return; }
				addActivity('! Switched network: Mainnet');
				activeWallet.provider = new ethers.providers.getDefaultProvider(false);
				optionTestnet.classList.remove('selected');
				optionMainnet.classList.add('selected');
				refresh();
		}
		// Send ether
		submit.onclick = function() {
				// Matt (from Etherscan) is working on a gasPrice API call, which
				// should be done within a week or so.
				// @TODO
				var gasPrice = (activeWallet.provider.testnet ? 0x4a817c800: 0xba43b7400);
				console.log('GasPrice: ' + gasPrice);
				var targetAddress = ethers.utils.getAddress(inputTargetAddress.value);
				var amountWei = ethers.utils.parseEther(inputAmount.value);
				activeWallet.send(targetAddress, amountWei, {
						gasPrice: gasPrice,
						gasLimit: 21000,
				}).then(function(txid) {
						var url = (activeWallet.provider.testnet ? 'https://testnet.etherscan.io/tx/': 'https://etherscan.io/tx/') + txid;
						addActivity('< Transaction sent: ' + txid.substring(0, 20) + '...', url);
						alert('Success!');
						inputTargetAddress.value = '';
						inputAmount.value = '';
						submit.classList.add('disable');
						refresh();
				}, function(error) {
						showError(error);
				});
		}
})();
function showSelect() {
		document.getElementById('screen-select').style.display = 'block';
		document.getElementById('screen-loading').style.display = 'none';
		document.getElementById('screen-wallet').style.display = 'none';
}
function showLoading(title) {
		document.getElementById('screen-select').style.display = 'none';
		document.getElementById('screen-loading').style.display = 'block';
		document.getElementById('screen-wallet').style.display = 'none';
		document.getElementById('loading-header').textContent = title;
}
function showWallet(wallet) {
		var testnet = document.getElementById('option-testnet').classList.contains('selected');
		activeWallet = wallet;
		activeWallet.provider = new ethers.providers.getDefaultProvider(testnet);
		document.getElementById('screen-select').style.display = 'none';
		document.getElementById('screen-loading').style.display = 'none';
		document.getElementById('screen-wallet').style.display = 'block';
		var inputWalletAddress = document.getElementById('wallet-address');
		inputWalletAddress.value = wallet.address;
		inputWalletAddress.onclick = function() {
				this.select();
		};
		refresh();
}
}
