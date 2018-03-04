import "document-register-element";
import $ from "jquery";
// import template from "./dark-admin/index.html";
// // <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Muli:300,400,700">
import template from "./dashboard.html";
import "font-awesome/css/font-awesome.min.css";
import "./css/font.css";
import "./css/style-blue.css";
import "./css/custom.css"
import "bootstrap/dist/css/bootstrap.css"
import Popper from "popper.js";
import bootstrap from "bootstrap"
import Header from "./header/header";
import Footer from "./footer/footer";
import Dropdown from "./dropdown/dropdown";
import Sidebar from "./sidebar/sidebar";
import Chart from "./charts/chart";
import Tables from "./tables/tables";
import Wallet from "./wallet/wallet";
// import Login from "./login/login";


export default class Dashboard extends HTMLElement
{

	constructor(inWeb3, inProfileInfo = {})
	{
		super();
		this.web3 = inWeb3;
		this._mProfileInfo = inProfileInfo;
		this.innerHTML = template;
	}

	// Fires when an instance was removed from the document.
	disconnectedCallback()
	{

	}

	// Fires when an instance was inserted into the document.
	connectedCallback()
	{
		this._mHeader = new Header(this._mProfileInfo);
		this._mSidebar = new Sidebar(this._mProfileInfo);
		this._mFooter = new Footer(this._mProfileInfo);
		this._mPageContent = $(this).find(".page-content");
		this._mPageContentHeader = $(this._mPageContent).children("page-header");
		//using RPC for now
		$(this).find("header.header").append(this._mHeader);
		$(this).find("div.main").prepend(this._mSidebar);
		$(this).append(this._mFooter);
		this.addWidget(Wallet, this._mProfileInfo, this.web3);
		// this.addWidget(Charts, this._mProfileInfo);
		this.bindAndInit();

		// console.log(firebase);
		// firebase.database.ref('/$uid/__coomands').push({'eth':{'getBalance':{inAddress}}});
		// firebase.database.ref('/$uid/__commands/$mid/').on(function(event) {
		// 	let response = event.data;
		// 	//...
		// })


	}

	addWidget(inWidgetCtor, inWidgetInfo = {}, inWeb3Instance)
	{
		let section = document.createElement("section");
		let widget = new inWidgetCtor(inWidgetInfo, inWeb3Instance);
		$(this._mPageContent).append(section);
		$(section).append(widget);
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
	    // Search Popup
	    // ------------------------------------------------------ //
	    $('.search-open').on('click', function (e) {
	        e.preventDefault();
	        $('.search-panel').fadeIn(100);
	    })
	    $('.search-panel .close-btn').on('click', function () {
	        $('.search-panel').fadeOut(100);
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

	}
}

customElements.define("crwnrr-dashboard", Dashboard);
