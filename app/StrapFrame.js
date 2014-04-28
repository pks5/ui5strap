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

	var packageName = "com_mycompany.my_app",
		moduleName = packageName + ".StrapFrame";

	jQuery.sap.declare(moduleName);
	jQuery.sap.require("ui5strap.NavContainer");
	jQuery.sap.require("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.Nav");
	jQuery.sap.require("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.Link");
	jQuery.sap.require("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.Button");

	sap.ui.base.Object.extend(moduleName);

	var StrapFrame = com_mycompany.my_app.StrapFrame,
		StrapFrameProto = StrapFrame.prototype,
		configuration = sap.ui.getCore().getConfiguration();

	/*
	* available pages
	*/
	var _pages = {

		// EXAMPLE
		//
		//'myPage': {
		//	target : 'content',
		//	id : 'my-page-in-my-app',
		//	viewName : 'my_company.my_app.views.MyView',
		//	type : 'HTML',
		//	label : 'i18n>MENU_MY_PAGE'
		//},
		
		'home' : {
			target : 'content',
			id : 'home-ui5strap',
			viewName : packageName + '.views.Home',
			type : 'HTML',
			label : 'i18n>MENU_HOME'
		},

		'getStarted' : {
			target : 'content',
			id : 'get-started-ui5strap',
			viewName : packageName + '.views.GetStarted',
			type : 'HTML',
			label : 'i18n>MENU_GET_STARTED'
		},
		
		'controls' : {
			target : 'content',
			id : 'controls-ui5strap',
			viewName : packageName + '.views.Controls',
			type : 'HTML',
			label : 'i18n>MENU_CONTROLS'
		},
		
		'about' : {
			target : 'content',
			id : 'about-ui5strap',
			viewName : packageName + '.views.About',
			type : 'HTML',
			label : 'i18n>MENU_ABOUT'
		},
		
		'support': {
			target : 'content',
			id : 'support-ui5strap',
			viewName : packageName + '.views.Support',
			type : 'HTML',
			label : 'i18n>MENU_SUPPORT'
		}

	};

	/*
	* pages that should be shown in the menu specified by _pages keys.
	*/
	var _menu = ['about', 'getStarted', 'controls', 'support'];

	/*
	 * creates the nav container
	 */
	var _createNavContainer = function(frame){
		var navContainer = new ui5strap.NavContainer();
		var navBar = new ui5strap.NavBar();

		navBar.bindProperty('brand', {path : 'i18n>MENU_BRAND'});
		navBar.setInverse(true);
		navBar.setPosition(ui5strap.NavBarPosition.FixedTop);

		navBar.attachEvent('brandTap', {}, function(){
			frame.gotoHome();
		});

		navContainer.setNavBar(navBar);

		var navLeft = new ui5strap.Nav();
		frame.nav = navLeft;
		navLeft.setNavbarAlign(ui5strap.NavBarAlignment.Left);
		navBar.addCollapse(navLeft);

		for (var i = 0; i < _menu.length; i++){
			var pageKey = _menu[i];
			var menuPage = _pages[pageKey];
			
			var navItem = new ui5strap.ListItem();
			navItem.data('pageKey', pageKey);
			var navItemLink = new ui5strap.Link();
			navItemLink.bindProperty('text', {path : menuPage.label});
			navItem.addContent(navItemLink);
			navLeft.addItems(navItem);
		}

		navLeft.attachEvent('tap', {}, function(oEvent){
			var listItem = oEvent.getParameter('listItem');
			
		
			frame.gotoPage(listItem.data('pageKey'));
		});


		var navButtons = new ui5strap.ButtonGroup({navbarAlign : ui5strap.NavBarAlignment.Right});
		var buttonDe = new ui5strap.Button({'text' : "DE" });
		var buttonEn = new ui5strap.Button({'text' : "EN" });
		navButtons.addButtons(buttonEn);
		navButtons.addButtons(buttonDe);
		navBar.addCollapse(navButtons);

		navButtons.attachEvent('tap', {}, function(oEvent){
			var srcButton = oEvent.getParameter('button');
			navButtons.setSelectedButton(srcButton);

			if(buttonEn === srcButton){
				configuration.setLanguage('en-us');
			}
			else if(buttonDe === srcButton){
				configuration.setLanguage('de-de');
			}
			
		});

		if('de-de' === configuration.getLanguage()){
			buttonDe.setActive(true);
		}
		else{
			buttonEn.setActive(true);
		}

		frame.navContainer = navContainer;
		frame.mainMenu = navLeft;
	};

	/*
	* create the goto* methods for navigation
	*/
	var _createGotoMethods = function(frame){
		for (var pageKey in _pages){
			var menuPage = _pages[pageKey];
			frame['goto' + jQuery.sap.charToUpperCase(pageKey, 0)] = (function(pk, ii){ 
				return function(){
					frame.gotoPage(pk);
				}
			})(pageKey, jQuery.inArray(pageKey, _menu));
		}
	};

	/*
	 * called by constructor
	 */
	StrapFrameProto.init = function(){
		this._pages = {};
		
		_createGotoMethods(this);
		_createNavContainer(this);

		//this._initHistory();
	};

	/*
	 * places this frame in dom
	 */
	StrapFrameProto.placeAt = function(domId){
		return this.navContainer.placeAt(domId);
	};

	/*
	* shows a page defined in _pages
	*/
	StrapFrameProto.gotoPage = function(pageKey){
		if(!(pageKey in _pages)){
			throw new Error('Invalid page: ' + pageKey);
		}
		var menuIndex = jQuery.inArray(pageKey, _menu);
		if(menuIndex !== -1){
			this.nav.setSelectedIndex(menuIndex);
		}
		else{
			this.nav.setSelectedItem(null);
		}
		this.showPage(_pages[pageKey]);
	};

	/*
	 * shows a page defined by given data
	 */
	StrapFrameProto.showPage = function (data) {
		var page = this._addPage(data);
		
		var historyPath = null;
		if(data.target === 'content'){
			this.navContainer.removeAllContent();
			this.navContainer.addContent(page);
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
	 * adds a page to the internal cache
	 */
	StrapFrameProto._addPage = function(pageProperties){
		if(this._pages[pageProperties.id]){
			return this._pages[pageProperties.id];
		}

		var page = new sap.ui.view(pageProperties);
			
		this._pages[pageProperties.id] = page;
		
		return page;
	};

	/*
	
	StrapFrameProto._registerNavHandlers = function(){
		var oBus = sap.ui.getCore().getEventBus();
		
		oBus.subscribe("nav", "to", jQuery.proxy(this._navTo, this));
		oBus.subscribe("nav", "back", jQuery.proxy(this._navBack, this));
	};

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
}());