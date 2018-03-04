import "document-register-element";
import $ from "jquery";
import template from "./wallet-generator-3.html";

export default class WalletGenerator extends HTMLElement
{

	constructor(inWeb3Instance, inWalletReadyCallback)
	{
		super();
		this.innerHTML = template;
    this._mWeb3Instance = inWeb3Instance;
    this.classList.add("col-12-lg");
    this._walletReady = inWalletReadyCallback;
	}

	// Fires when an instance was removed from the document.
	disconnectedCallback()
	{
		//$(this).find("button.brain-gen.create").off("click");
	}

	// Fires when an instance was inserted into the document.
	connectedCallback()
	{
		$(this).find("button.brain-gen.create").on("click", this.createWallet.bind(this));
		this.createWeb3Wallet();
	}

	createWeb3Wallet()
	{
			let wallet = this._mWeb3Instance.eth.accounts.wallet.create(0);
			this._walletReady(wallet);
			$(this).remove();
	}

	createWallet(inEvent)
	{
    let inputFieldValues = $(this).find("input.brain-gen");
    if($(this).find("input.brain-gen.pw").val() === $(this).find("input.brain-gen.confirm").val())
    {
      var username = new ethers.utils.toUtf8Bytes($(this).find("input.brain-gen.user").val());
      var password = new ethers.utils.toUtf8Bytes($(this).find("input.brain-gen.pw").val());
      $(this).find("button.close").trigger("click");
      $(this).find(".progress-area").removeClass("hidden").siblings().addClass("hidden");
      let progressBar = $(this).find(".progress-bar");
      let completed = $(this).find(".title");
      this._mWeb3Instance.eth.accounts.wallet.create(2);

    }
	}

  _createBrainWallet()
  {
		ethers.Wallet.fromBrainWallet(username, password, (progress)=>{
		  $(completed).text("Working to create your wallet...");
		  $(progressBar).width(progress * 100 + "%");
		}).then((wallet)=> {
		    this._walletReady(wallet);
		},(error)=> {
		    if (error.message !== 'cancelled') {
		        alert('Unknown error');
		    }
		});
  }

  _createSeedWallet()
  {
    const new_seed = lightwallet.keystore.generateRandomSeed();
  }

	addAccount()
	{

	}

	generateAddress(seed)
	{

	}

	sendEther()
	{

	}

  // generateId :: Integer -> String
  generateEntropy (inLength = 32) {
    var arr = new Uint8Array(inLength)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec=>{
      return ('0' + dec.toString(16)).substr(-2);
    }).join('');
  }

}

customElements.define("wallet-generator", WalletGenerator);
