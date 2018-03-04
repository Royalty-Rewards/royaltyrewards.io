import "document-register-element";
import $ from "jquery";
import template from "./tables.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"

export default class Table extends HTMLElement
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

customElements.define("crwnrr-tables", Table);
