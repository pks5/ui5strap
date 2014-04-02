/*
 * 
 * UI5Strap
 *
 * Standard Frame Manager
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("de_pksoftware.ui5strap_docs.StrapFrame");
	jQuery.sap.require("de_pksoftware.ui5strap.controls.NavContainer");
	jQuery.sap.require("de_pksoftware.ui5strap.controls.NavBar");
	jQuery.sap.require("de_pksoftware.ui5strap.controls.Nav");
	jQuery.sap.require("de_pksoftware.ui5strap.controls.NavItem");
	jQuery.sap.require("de_pksoftware.ui5strap.controls.Link");

	sap.ui.base.ManagedObject.extend("de_pksoftware.ui5strap_docs.StrapFrame", {
		metadata : {
			
			publicMethods : [],
			
			properties : {
				"root" : {
					type : "string", 
					group : "Misc", 
					defaultValue : "sapUiBody"
				}
			}
		
		}
	});

	var StrapFrame = de_pksoftware.ui5strap_docs.StrapFrame,
		StrapFrameProto = StrapFrame.prototype;


	/*
	 * Initializes the Managed object
	 * TODO Ensure its allowed to override init method
	 */
	StrapFrameProto.init = function(){
		this._pages = {};
		
		this._createUi5App();

		this._placeUi5App();
	    
	    this._registerNavHandlers();
	    
	    //this._initHistory();
	};

	/*
	 * Creates the ui5 app control
	 */
	StrapFrameProto._createUi5App = function(){
		var frame = this;
		var navContainer = new de_pksoftware.ui5strap.controls.NavContainer();

		var navBar = new de_pksoftware.ui5strap.controls.NavBar();

		

		navBar.setBrand('UI5Strap');
		navBar.setInverse(true);
		navBar.setAlign('fixed-top');
		navContainer.setNavBar(navBar);

		var navLeft = new de_pksoftware.ui5strap.controls.Nav();
		this._navLeft = navLeft;
		navLeft.setInNavbar(true);
		navBar.addCollapse(navLeft);

		var navItemHome = new de_pksoftware.ui5strap.controls.NavItem();
		
		var navItemHomeLink = new de_pksoftware.ui5strap.controls.Link();
		navItemHomeLink.setText('Home');
		navItemHome.addContent(navItemHomeLink);
		navLeft.addItems(navItemHome);

		var navItemGetStarted = new de_pksoftware.ui5strap.controls.NavItem();
		var navItemGetStartedLink = new de_pksoftware.ui5strap.controls.Link();
		navItemGetStartedLink.setText('Get Started');
		navItemGetStarted.addContent(navItemGetStartedLink);
		navLeft.addItems(navItemGetStarted);

		var navItemControls = new de_pksoftware.ui5strap.controls.NavItem();
		var navItemControlsLink = new de_pksoftware.ui5strap.controls.Link();
		navItemControlsLink.setText('Controls');
		navItemControls.addContent(navItemControlsLink);
		navLeft.addItems(navItemControls);

		var navItemAbout = new de_pksoftware.ui5strap.controls.NavItem();
		var navItemAboutLink = new de_pksoftware.ui5strap.controls.Link();
		navItemAboutLink.setText('About');
		navItemAbout.addContent(navItemAboutLink);
		navLeft.addItems(navItemAbout);



		var navItemContact = new de_pksoftware.ui5strap.controls.NavItem();
		var navItemContactLink = new de_pksoftware.ui5strap.controls.Link();
		navItemContactLink.setText('Contact');
		navItemContact.addContent(navItemContactLink);
		navLeft.addItems(navItemContact);

		//TODO a better solution for switching active state!!!
		navItemHomeLink.attachEvent('click', {}, function(){
			frame.gotoHome();
		});

		navItemGetStartedLink.attachEvent('click', {}, function(){
			frame.gotoGetStarted();
		});

		navItemControlsLink.attachEvent('click', {}, function(){
			frame.gotoControls();
		});

		navItemAboutLink.attachEvent('click', {}, function(){
			frame.gotoAbout();
		});

		navItemContactLink.attachEvent('click', {}, function(){
			frame.gotoContact();
		});

		this._app = navContainer;
	};

	StrapFrameProto.gotoHome = function(){
		this._navLeft.setItemActive(0);
		this._navTo(null, null, {
			target : 'content',
			id : 'home',
			viewName : 'de_pksoftware.ui5strap_docs.views.Home',
			type : 'HTML'
		});
	};

	StrapFrameProto.gotoGetStarted = function(){
		this._navLeft.setItemActive(1);
		this._navTo(null, null, {
			target : 'content',
			id : 'get-started',
			viewName : 'de_pksoftware.ui5strap_docs.views.GetStarted',
			type : 'HTML'
		});
	};

	StrapFrameProto.gotoControls = function(){
		this._navLeft.setItemActive(2);
		this._navTo(null, null, {
			target : 'content',
			id : 'controls',
			viewName : 'de_pksoftware.ui5strap_docs.views.Controls',
			type : 'HTML'
		});
	};

	StrapFrameProto.gotoAbout = function(){
		this._navLeft.setItemActive(3);
		this._navTo(null, null, {
			target : 'content',
			id : 'about-ui5strap',
			viewName : 'de_pksoftware.ui5strap_docs.views.About',
			type : 'HTML'
		});
	};

	StrapFrameProto.gotoContact = function(){
		this._navLeft.setItemActive(4);
		this._navTo(null, null, {
			target : 'content',
			id : 'contact-ui5strap',
			viewName : 'de_pksoftware.ui5strap_docs.views.Contact',
			type : 'HTML'
		});
	};

	

	

	/*
	 * Places the ui5 app control in DOM
	 */
	StrapFrameProto._placeUi5App = function(){
		this._app.placeAt(this.getRoot());
	};

	/*
	 * Registers the navigation handlers
	 */
	StrapFrameProto._registerNavHandlers = function(){
		var oBus = sap.ui.getCore().getEventBus();
		
		oBus.subscribe("nav", "to", jQuery.proxy(this._navTo, this));
		oBus.subscribe("nav", "back", jQuery.proxy(this._navBack, this));
	};

	/*
	 * Evemt handler for back events
	 * @TODO to be implemented
	 */
	StrapFrameProto._navBack = function (channelId, eventId, data) {
		
		
	};

	/*
	 * Evemt handler for nav-to events
	 */
	StrapFrameProto._navTo = function (channelId, eventId, data) {
		var page = this._addPage(data);
		
		var historyPath = null;
		if(data.target === 'content'){
			this._app.removeAllContent();
			this._app.addContent(page);
			//historyPath = HISTORY_PATH_MASTER;
		}
		
		/*
		// write browser history
		if (historyPath && data.writeHistory) {
			var bookmarkable = false;
			jQuery.sap.history.addHistory(historyPath, data, bookmarkable);
		}
		*/
	};

	/*
	StrapFrameProto._initHistory = function () {

		_self = this;
		jQuery.sap.require("jquery.sap.history");
		jQuery.sap.history({
			routes : [
				{
					path : HISTORY_PATH_MASTER,
					handler : function (params, navType) {
						
						if (navType === jQuery.sap.history.NavType.Back) {
								
							}
						params.writeHistory = false;
						_self._navTo("nav", "to", params);
					}
				},
				{
					path : HISTORY_PATH_DETAIL,
					handler : function (params, navType) {
						
						if (navType === jQuery.sap.history.NavType.Back) {
								
							}
						params.writeHistory = false;
						_self._navTo("nav", "to", params);
					}
				}
			],
			defaultHandler : function (navType) {

				if (navType === jQuery.sap.history.NavType.Back) {
					
				}
				console.log("route");
			}
		});
	};
	*/

	/*
	 * Adds a new page to the ui5 app control
	 */
	StrapFrameProto._addPage = function(pageProperties){
		if(this._pages[pageProperties.id]){
			return this._pages[pageProperties.id];
		}

		var page = new sap.ui.view(pageProperties);
			
		this._pages[pageProperties.id] = page;
		
		return page;
	};

}());


