import "document-register-element";
import $ from "jquery";
// import template from "./dark-admin/index.html";
import template from "./sidebar.html";
import Popper from "popper.js";
import bootstrap from "bootstrap"

export default class Sidebar extends HTMLElement
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
		$(this).addClass("d-flex align-items-stretch");
		this.bindAndInit();
	}

	bindAndInit() {

	    // ------------------------------------------------------- //
	    // Material Inputs
	    // ------------------------------------------------------ //

	    var materialInputs = $('input.input-material');

	    // activate labels for prefilled values
	    materialInputs.filter(function() { return $(this).val() !== ""; }).siblings('.label-material').addClass('active');

	    // move label on focus
	    materialInputs.on('focus', function () {
	        $(this).siblings('.label-material').addClass('active');
	    });

	    // remove/keep label on blur
	    materialInputs.on('blur', function () {
	        $(this).siblings('.label-material').removeClass('active');

	        if ($(this).val() !== '') {
	            $(this).siblings('.label-material').addClass('active');
	        } else {
	            $(this).siblings('.label-material').removeClass('active');
	        }
	    });

	    // ------------------------------------------------------- //
	    // Footer
	    // ------------------------------------------------------ //

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

	    // ------------------------------------------------------- //
	    // Adding fade effect to dropdowns
	    // ------------------------------------------------------ //
	    $('.dropdown').on('show.bs.dropdown', function () {
	        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(100).addClass('active');
	    });
	    $('.dropdown').on('hide.bs.dropdown', function () {
	        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(100).removeClass('active');
	    });



	    // ------------------------------------------------------- //
	    // Sidebar Functionality
	    // ------------------------------------------------------ //
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

	    if ($('#style-switch').length > 0) {
	        var stylesheet = $('link#theme-stylesheet');
	        $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
	        var alternateColour = $('link#new-stylesheet');

	        if ($.cookie("theme_csspath")) {
	            alternateColour.attr("href", $.cookie("theme_csspath"));
	        }

	        $("#colour").change(function () {

	            if ($(this).val() !== '') {

	                var theme_csspath = 'css/style.' + $(this).val() + '.css';

	                alternateColour.attr("href", theme_csspath);

	                $.cookie("theme_csspath", theme_csspath, {
	                    expires: 365,
	                    path: document.URL.substr(0, document.URL.lastIndexOf('/'))
	                });

	            }

	            return false;
	        });
	    }

	}
}

customElements.define("crwnrr-sidebar", Sidebar);
