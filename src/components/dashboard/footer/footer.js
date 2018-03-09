import "document-register-element";
import $ from "jquery";
import template from "./footer.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"

export default class Footer extends HTMLElement
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
    this.classList.add("footer");
	}
}

customElements.define("crwnrr-footer", Footer);
