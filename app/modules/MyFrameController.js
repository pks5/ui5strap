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
	
	jQuery.sap.require("ui5strap.FrameControllerBase");

	jQuery.sap.require("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.Nav");
	jQuery.sap.require("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.Link");
	jQuery.sap.require("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.Button");

	ui5strap.FrameControllerBase.extend(moduleName);

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
			
			frame.setPage({
				viewName : listItem.data('viewName'),
				target : "content"
			});

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
		ui5strap.FrameControllerBase.prototype.init.call(this, frameOptions);

		_createNavContainer(this);
	};

	StrapFrameProto.setPage = function (data) {
		ui5strap.FrameControllerBase.prototype.setPage.call(this, data);

		var menuIndex = -1;

		for(var i=0; i<this.options.menu.length; i++){
			if(data.viewName === this.options.menu[i].viewName){
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
	};

}());