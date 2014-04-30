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
		moduleName = packageName + ".modules.MyFrameController";

	jQuery.sap.declare(moduleName);
	
	jQuery.sap.require("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.Nav");
	jQuery.sap.require("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.Link");
	jQuery.sap.require("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.Button");

	sap.ui.base.Object.extend(moduleName);

	var StrapFrame = com_mycompany.my_app.modules.MyFrameController,
		StrapFrameProto = StrapFrame.prototype,
		configuration = sap.ui.getCore().getConfiguration();

	/*
	 * creates the nav container
	 */
	var _createNavContainer = function(frame){
		jQuery.sap.require("com_mycompany.my_app.modules.MyNavContainer");
		var navContainer = new com_mycompany.my_app.modules.MyNavContainer();

		var navBar = new ui5strap.NavBar();

		navBar.bindProperty('brand', {path : 'i18n>MENU_BRAND'});
		navBar.setInverse(true);
		navBar.setPosition(ui5strap.NavBarPosition.FixedTop);

		navBar.attachEvent('brandTap', {}, function(){
			frame.showInitialContent();
		});

		navContainer.setNavBar(navBar);

		var navLeft = new ui5strap.Nav();
		frame.nav = navLeft;

		navLeft.setNavbarAlign(ui5strap.NavBarAlignment.Left);
		navBar.addCollapse(navLeft);

		var menu = frame.options.menu;
		for (var i = 0; i < menu.length; i++){
			var menuPage = menu[i];
			
			var navItem = new ui5strap.ListItem();
			navItem.data('viewName', menuPage.viewName);
			var navItemLink = new ui5strap.Link();
			navItemLink.bindProperty('text', {path : menuPage.label});
			navItem.addContent(navItemLink);
			navLeft.addItems(navItem);
		}


		navLeft.attachEvent('tap', {}, function(oEvent){
			var listItem = oEvent.getParameter('listItem');
			
			var viewData = liberty.getViewer().getApp().getViewData(listItem.data('viewName'));

			if(viewData === null){
				throw new Error('Cannot show menu item: the view must be defined in configuration.');
			}

			viewData.target = "content";

			frame.setPage(viewData);

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
			buttonDe.setSelected(true);
		}
		else{
			buttonEn.setSelected(true);
		}

		frame.getNavContainer = function(){
			return navContainer;
		};
	};

	/*
	 * called by constructor
	 */
	StrapFrameProto.init = function(frameOptions){
		this.options = frameOptions;

		this._pages = {};
		
		_createNavContainer(this);

		//this._initHistory();
	};

	StrapFrameProto.showInitialContent = function(){
		var initialViews = this.options.initialViews;

		for(var target in initialViews){
			var pageData = initialViews[target];
			
			var viewData = liberty.getViewer().getApp().getViewData(pageData.viewName);
			
			if(viewData === null){
				throw new Error('Cannot show initial view: the view must be defined in configuration.');
			}

			jQuery.extend(viewData, pageData);
			viewData.target = target;

			this.setPage(viewData);
		}

	};


	/*
	 * places this frame in dom
	 */
	StrapFrameProto.placeAt = function(domId){
		return this.getNavContainer().placeAt(domId);
	};

	/*
	 * adds a page to the internal cache
	 */
	var _addPageToCache = function(frame, pageProperties){
		if(!("id" in pageProperties)){
			return new sap.ui.view(pageProperties);
		}

		var pageId = pageProperties.id;
		
		if(frame._pages[pageId]){
			return frame._pages[pageId];
		}

		var page = new sap.ui.view(pageProperties);
			
		this._pages[pageId] = page;
		
		return page;
	};

	/*
	 * shows a page defined by given data
	 */
	StrapFrameProto.setPage = function (data) {

		var viewData = liberty.getViewer().getApp().getViewData(data.viewName);
		
		if(null === viewData){
			viewData = {};
		}

		jQuery.extend(viewData, data);

		var page = _addPageToCache(this, viewData);
		
		this.getNavContainer().setPage(page, viewData.target, 'transition' in viewData ? viewData.transition : 'transition-slide');
		
		
		var menuIndex = -1;

		for(var i=0; i<this.options.menu.length; i++){
			if(viewData.viewName === this.options.menu[i].viewName){
				menuIndex = i;
				break;
			}
		}

		if(menuIndex !== -1){
			this.nav.setSelectedIndex(menuIndex);
		}
		else{
			this.nav.setSelectedItem(null);
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