import "document-register-element";
import $ from "jquery";
import template from "./contract-generator.html";

export default class ContractGenerator extends HTMLElement
{

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

	}
}

customElements.define("contract-generator", ContractGenerator);
