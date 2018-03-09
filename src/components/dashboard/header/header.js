import "document-register-element";
import $ from "jquery";
// import template from "./dark-admin/index.html";
import template from "./header.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"

export default class Header extends HTMLElement
{

	constructor(inInfo = {})
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
		$(this).addClass("header");
		this.bindAndInit();
	}

	bindAndInit() {

	    var pageContent = $('.page-content');

	    $(document).on('sidebarChanged', function () {
	        adjustFooter();
	    });

	    $(window).on('resize', function(){
	        adjustFooter();
	    })

	    function adjustFooter() {
	        var footerBlockHeight = $('.footer__block').outerHeight();
	        pageContent.css('padding-bottom', footerBlockHeight + 'px');
	    }

	    $('.search-open').on('click', function (e) {
	        e.preventDefault();
	        $('.search-panel').fadeIn(100);
	    })
	    $('.search-panel .close-btn').on('click', function () {
	        $('.search-panel').fadeOut(100);
	    });

	    $('.sidebar-toggle').on('click', function () {
	        $(this).toggleClass('active');

	        $('#sidebar').toggleClass('shrinked');
	        $('.page-content').toggleClass('active');
	        $(document).trigger('sidebarChanged');

	        if ($('.sidebar-toggle').hasClass('active')) {
	            $('.navbar-brand .brand-sm').addClass('visible');
	            $('.navbar-brand .brand-big').removeClass('visible');
	            $(this).find('i').attr('class', 'fa fa-long-arrow-right');
	        } else {
	            $('.navbar-brand .brand-sm').removeClass('visible');
	            $('.navbar-brand .brand-big').addClass('visible');
	            $(this).find('i').attr('class', 'fa fa-long-arrow-left');
	        }
	    });

	}
}

customElements.define("crwnrr-header", Header);
