import "document-register-element";
import $ from "jquery";
import template from "./wallet.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"
import Chart from "chart.js";
import DashboardAccount from "../account/account";
import WalletGenerator from "../../wallet-generator/wallet-generator-3";

export default class DashboardWallet extends HTMLElement
{
	constructor(inInfo = {}, inWeb3)
	{
		super();
    this.classList.add("container-fluid");
    this._mInfo = inInfo;
    this.web3 = inWeb3;
    this.innerHTML = template;
    // this._mWallet = inWeb3.eth.accounts.wallet;
		web3.eth.getAccounts()
		.then((accounts)=>{
			console.log(accounts);
			this.updateWalletInfo(accounts);
		});
	}

	// Fires when an instance was removed from the document.
	disconnectedCallback()
	{

	}

	// Fires when an instance was inserted into the document.
	connectedCallback()
	{
		
	}

  updateWalletInfo(inWallet)
  {
    for(let curAccount = 0; curAccount < inWallet.length; curAccount++)
    {
      const acct = inWallet[curAccount];
      this.appendChild(new DashboardAccount(acct, this.web3));
    }
  }

  addAccount()
  {

  }

}

customElements.define("crwnrr-dashboard-wallet", DashboardWallet);
