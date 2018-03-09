import "document-register-element";
import Web3 from "web3";
import lightwallet from "eth-lightwallet/index.js";
import HookedWeb3Provider from "hooked-web3-provider";
import $ from "jquery";
import template from "./wallet-generator.html";

const kEnterSeedPrompt = "Please enter a valid seed";
//Generate 2 address for each wallet by default..()
const kNumInitialAddresses = 1;
//Ethereum test network port...
const kNetworkAddress = "http://localhost:8545";
const kMaxGasPerTransaction = 21000;
const kMMHDPathtring = " m/44'/60'/0'/0";
const kHDPathtring = "m/0'/0'/0'";

let keystore;
//Creates an instance of a Hierarchical Derivation Wallet aka HD Wallet
export default class WalletGenerator extends HTMLElement{

	constructor()
	{
		super();
		this.innerHTML = template;

		//FOR DEV PURPOSES ONLY!!
		this._mSeedToKSMap = new Map();
		this._mSeedToPwMap = new Map();
	}

	// Fires when an instance was removed from the document.
	disconnectedCallback()
	{
		$(this).find("button.gen-send").off("click");
		$(this).find("button.wallet-gen-addr").off("click");
		$(this).find("button.wallet-gen-seed").off("click");
	}

	// Fires when an instance was inserted into the document.
	connectedCallback()
	{
		$(this).find("button.wallet-gen-send").on("click", this.send_ether.bind(this));
		$(this).find("button.wallet-gen-addr").on("click", this.addAccount.bind(this));
		$(this).find("button.wallet-gen-seed").on("click", this.createWallet.bind(this));
		this._mWalletSelect = $(this).find(".wallet-id");
	}

	createWallet()
	{
		const new_seed = lightwallet.keystore.generateRandomSeed();
		document.getElementById("seed").value = new_seed;
		const password = prompt('Enter password for encryption', 'password');
		this._mSeedToPwMap.set(new_seed, password);
		lightwallet.keystore.createVault({
			password: password,
			seedPhrase: new_seed,
			hdPathString: kHDPathtring
			},
		(err, ks)=>
		{
			this._mSeedToKSMap.set(new_seed, ks);
			let newWalletSeedOption = document.createElement("option");
			newWalletSeedOption.label = new_seed;
			newWalletSeedOption.value = new_seed;
			$(this._mWalletSelect).append(newWalletSeedOption);
		});
	}

	addAccount()
	{
		let curWalletSeed = $(this._mWalletSelect).val();
		this.generateAddress(curWalletSeed);
	}

	generateAddress(seed)
	{
		if(!this._mSeedToPwMap.has(seed))
		{
			return;
		}
		const keystore = this._mSeedToKSMap.get(seed);
		const password = this._mSeedToPwMap.get(seed);
		keystore.keyFromPassword(password, function (err, pwDerivedKey) {
			if(err)
			{
				console.warn("unable to derive private key from password");
				return;
			}
			else
			{
				keystore.generateNewAddress(pwDerivedKey, 1);
				const addresses = keystore.getAddresses();
				const web3 = new Web3(new Web3.providers.HttpProvider(kNetworkAddress));
				let html = "";
				for(let address of addresses)
				{
					try
					{
						let list = document.getElementById("list");
						if(!list){ throw("address list not found"); }
					}
					catch (e)
					{
						return;
					}
					let balance = web3.eth.getBalance(address);
					let privateKey = keystore.exportPrivateKey(address, pwDerivedKey);
					list.innerHTML += generateAddrListItemEl(seed, address, privateKey, balance);
				}
			}
		});
	}

	send_ether()
	{
		const	seed = $(this._mWalletSelect).val();
		const keyStore = this._mSeedToKSMap.get(seed)
		if(!keyStore.isSeedValid(seed))
		{
			console.warn("Invalid seed value");
			return;
		}
		const password = this._mSeedToPwMap.get(seed).toString();
		keyStore.keyFromPassword(password, function (err, pwDerivedKey) {
			if(err)
			{
				console.warn("unable to generate key from password");
				return;
			}
			const provider = new HookedWeb3Provider({
					host: kNetworkAddress,
					transaction_signer: keystore
			});
			const web3 = new Web3(provider);
			const from = document.getElementById("address1").value;
			const to = document.getElementById("address2").value;
			const value = web3.toWei(document.getElementById("ether").value, "ether");
			web3.eth.sendTransaction(
			{
				from: from,
				to: to,
				value: value,
				gas: kMaxGasPerTransaction
			},
			function(error, result)
			{
				if(error)
				{
					console.warn("unable to send send transaction...");
				}
				else
				{
					document.getElementById("info").innerHTML = "Txn hash: " + result;
				}
			})
		});
	}
}

function generateAddrListItemEl(wallet, address, privKey, balance)
{
	return "<li>"
					+ "<p><b>Wallet: </b>0x" + wallet + "</p>"
					+ "<p><b>Address: </b>0x" + address + "</p>"
					+ "<p><b>Private Key: </b>0x" + privKey + "</p>"
					+ "<p><b>Balance: </b>" + balance + " ether</p>"
					+ "</li>";
}

customElements.define("wallet-generator", WalletGenerator);
