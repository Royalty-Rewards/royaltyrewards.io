import "document-register-element";
import $ from "jquery";
// import template from "./dark-admin/index.html";
import template from "./dropdown.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"

export default class Dropdown extends HTMLElement
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
		this._mDropdown = $(this).find('.dropdown');
		$(this._mDropdown).on('show.bs.dropdown', function () {
				$(this).find('.dropdown-menu').first().stop(true, true).fadeIn(100).addClass('active');
		});
		$(this._mDropdown).on('hide.bs.dropdown', function () {
				$(this).find('.dropdown-menu').first().stop(true, true).fadeOut(100).removeClass('active');
		});
	}

	addItem(inInfo)
	{
		let newItem = '<li><a href="#">Page</a></li>';
		$(this._mDropdown).append(newItem);
		//populate new item with data from inInfo parameter...
	}
}

customElements.define("crwnrr-dropdown", Dropdown);
