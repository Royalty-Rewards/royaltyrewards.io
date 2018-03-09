import "document-register-element";
import $ from "jquery";
import template from "./account.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"
import Chart from "chart.js";
import WalletGenerator from "../../wallet-generator/wallet-generator-3";

export default class DashboardAccount extends HTMLElement
{
	constructor(inAccount, inWeb3)
	{
		super();
		this.web3 = inWeb3;
		this.innerHTML = template;
		this.classList.add("container-fluid");
		if(typeof inAccount === "string")
		{
			this._mInfo = {};
			this._mInfo.address = inAccount;
		}
		else
		{
			this._mInfo = inAccount;
			this._mPrivKey = inAccount.privateKey;
			this._mAddr = inAccount.address;
		}
	}

	// Fires when an instance was removed from the document.
	disconnectedCallback()
	{

	}

	// Fires when an instance was inserted into the document.
	connectedCallback()
	{
		this.updateAccountInfo(this._mInfo);
	}

  updateAccountInfo(inWallet)
  {
    for(let field in inWallet)
    {
      $(this).find("."+field).text(inWallet[field]);
    }
    let chartEl = $(this).find("canvas.chart")[0];
    this.getBalance(inWallet.address);
    this._mChart = new Chart(chartEl, {
        type: 'doughnut',
        options: {
            cutoutPercentage: 90,
            legend: {
                display: false
            }
        },
        data: {
            labels: [
                "Balance",
            ],
            datasets: [
                {
                    data: [100],
                    borderWidth: [0],
                    backgroundColor: [
                        '#6933b9',
                    ],
                    hoverBackgroundColor: [
                        '#6933b9',
                    ]
                }]
        }
    });
  }

getBalance (inAddress)
{
	// firebase.database.ref('/$uid/__coomands').push({'eth':{'getBalance':{inAddress}}});
	// firebase.database.ref('/$uid/__commands/$mid/').on(function(event) {
	// 	let response = event.data;
	// 	//...
	// })
  //
  this.web3.eth.getBalance(inAddress)
  .then((result)=> {
        let balance = self.web3.utils.fromWei(result, "ether");
        $(this).find(".balance").text(balance);
    });
}

}

customElements.define("crwnrr-dashboard-account", DashboardAccount);
