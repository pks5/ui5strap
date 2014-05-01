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

	var _packageName = "com_mycompany.my_app",
		_moduleName = _packageName + ".modules.MyFrameController";

	jQuery.sap.declare(_moduleName);
	
	jQuery.sap.require("ui5strap.LibertyFrame");

	jQuery.sap.require("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.Nav");
	jQuery.sap.require("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.Link");
	jQuery.sap.require("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.Button");

	ui5strap.LibertyFrame.extend(_moduleName);

	var FrameController = com_mycompany.my_app.modules.MyFrameController,
		FrameControllerProto = FrameController.prototype,
		configuration = sap.ui.getCore().getConfiguration();

	var _createPrivateProperties = function(_this){
		var navContainer = null;

		/*
		 * creates the nav container
		 */
		_this.getNavContainer = function(){
			if(null !== navContainer){
				return navContainer;
			}

			var frameOptions = _this.getConfig().getFrame();
			
			if(!("navContainer" in frameOptions)){
				throw new Error('Invalid frame options: no nav container defined.');
			}

			var navContainerModule = frameOptions.navContainer;

			jQuery.sap.require(navContainerModule);
			var NavContainerConstructor = jQuery.sap.getObject(navContainerModule);

			navContainer = new NavContainerConstructor();

			var navBar = new ui5strap.NavBar();

			navBar.bindProperty('brand', {path : 'i18n>MENU_BRAND'});
			navBar.setInverse(true);
			navBar.setPosition(ui5strap.NavBarPosition.FixedTop);

			navBar.attachEvent('brandTap', {}, function(){
				_this.showInitialContent();
			});

			navContainer.setNavBar(navBar);

			var navLeft = new ui5strap.Nav();
			_this.nav = navLeft;

			navLeft.setNavbarAlign(ui5strap.NavBarAlignment.Left);
			navBar.addCollapse(navLeft);

			var menu = frameOptions.menu;
			for (var i = 0; i < menu.length; i++){
				var menuPage = menu[i];
				
				var navItem = new ui5strap.ListItem();
				navItem.data({
					viewName : menuPage.viewName,
					target : menuPage.target,
					id : menuPage.id
				});
				var navItemLink = new ui5strap.Link();
				navItemLink.bindProperty('text', {path : menuPage.label});
				navItem.addContent(navItemLink);
				navLeft.addItems(navItem);
			}


			navLeft.attachEvent('tap', {}, function(oEvent){
				var listItem = oEvent.getParameter('listItem');
				
				_this.setPage(listItem.data());
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

			
			return navContainer;
		};

	};

	FrameControllerProto.init = function(){
		ui5strap.LibertyFrame.prototype.init.call(this);

		_createPrivateProperties(this);
	};

	FrameControllerProto.setPage = function (data) {
		ui5strap.LibertyFrame.prototype.setPage.call(this, data);

		var frameOptions = this.getConfig().getFrame();

		var menuIndex = -1;

		for(var i=0; i<frameOptions.menu.length; i++){
			if(data.viewName === frameOptions.menu[i].viewName){
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