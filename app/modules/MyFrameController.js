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

	jQuery.sap.require("ui5strap.Sidebar");
	jQuery.sap.require("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.Nav");
	jQuery.sap.require("ui5strap.ListNavItem");
	jQuery.sap.require("ui5strap.Link");
	jQuery.sap.require("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.Button");
	jQuery.sap.require("ui5strap.Icon");

	ui5strap.LibertyFrame.extend(_moduleName);

	var FrameController = com_mycompany.my_app.modules.MyFrameController,
		FrameControllerProto = FrameController.prototype,
		configuration = sap.ui.getCore().getConfiguration();

	/*
	*
	* PRIVATE METHODS
	*
	*/

	/*
	* Creates private properties for this object
	* @Private
	*/
	var _createPrivateProperties = function(_this){
		var navContainer = null;

		/*
		 * Creates the NavContainer if no instance has created yet, otherwise it returns the existing instance.
		 * @Singleton
		 * @Override
		 * @Public
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
			
			var navBar = new ui5strap.NavBar({ fluid : true, position : ui5strap.NavBarPosition.StaticTop });

			var brand = new ui5strap.Link();

			var toggle = new ui5strap.Button( { 
					align : ui5strap.Alignment.NavBarLeft
				} 
			);
			toggle.addContent(new ui5strap.Icon( { icon : 'columns', size : ui5strap.IconSize.Large } ));

			toggle.attachEvent('tap', {}, function(){
				_this.getNavContainer().toggleOption('sidenav');
			});

			navBar.addContentLeft(toggle);


			brand.bindProperty('text', {path : 'i18n>MENU_BRAND'});
			navBar.setBrand(brand);

			brand.attachEvent('tap', {}, function(){
				_this.showInitialContent();
			});

			navContainer.setNavbar(navBar);

			var navLeft = new ui5strap.Nav();
			_this.nav = navLeft;

			navLeft.setAlign(ui5strap.Alignment.NavBarLeft);
			navBar.addCollapse(navLeft);

			var menu = _this.getConfig().getMenuData(frameOptions.navbarMenu);
			for (var i = 0; i < menu.items.length; i++){
				var menuPage = menu.items[i];
				
				var navItem = new ui5strap.ListItem();
				navItem.data(menuPage);
				var navItemLink = new ui5strap.Link();
				navItemLink.bindProperty('text', {path : menuPage.label});
				navItem.addContent(navItemLink);
				navLeft.addItems(navItem);
			}


			navLeft.attachEvent('tap', {}, function(oEvent){
				var listItem = oEvent.getParameter('listItem');
				
				_this.gotoPage(listItem.data());

				navBar.setCollapsed(true);
			});

			var navButtons = new ui5strap.ButtonGroup({align : ui5strap.Alignment.NavBarRight});
			var buttonDe = new ui5strap.Button({'text' : "DE" });
			var buttonEn = new ui5strap.Button({'text' : "EN" });
			navButtons.addButtons(buttonEn);
			navButtons.addButtons(buttonDe);
			navBar.addCollapse(navButtons);

			navButtons.attachEvent('tap', {}, function(oEvent){
				var srcButton = oEvent.getParameter('button');
				navButtons.setSelectedControl(srcButton);

				if(buttonEn === srcButton){
					configuration.setLanguage('en-us');
				}
				else if(buttonDe === srcButton){
					configuration.setLanguage('de-de');
				}
				
			});

			if(jQuery.sap.startsWithIgnoreCase(configuration.getLanguage(), 'de')){
				buttonDe.setSelected(true);
			}
			else{
				buttonEn.setSelected(true);
			}


			var toggleRight = new ui5strap.Button( { 
					align : ui5strap.Alignment.NavBarRight
				} 
			);
			toggleRight.addContent(new ui5strap.Icon( { icon : 'bars', size : ui5strap.IconSize.Large } ));

			navBar.addContentRight(toggleRight);
			toggleRight.attachEvent('tap', {}, function(){
				navBar.toggle();
			});


			var sidebar = new ui5strap.Sidebar();

			var navSidebar = new ui5strap.Nav({ type : ui5strap.NavType.PillsStacked });
			_this._navSidebar = navSidebar;
			navSidebar.addStyleClass('nav-sidebar');
			sidebar.addContent(navSidebar);

			navContainer.setSidebar(sidebar);

			return navContainer;
		};

	};

	/*
	*
	* PUBLIC METHODS
	*
	*/

	/*
	* @Public
	*/
	FrameControllerProto.init = function(){
		ui5strap.LibertyFrame.prototype.init.call(this);

		_createPrivateProperties(this);
	};

	/*
	* @Public
	*/
	FrameControllerProto.getNavSidebar = function(){
		return this._navSidebar;
	};

	/*
	* @Public
	*/
	FrameControllerProto.updateMenu = function(viewName){
		

		if(this.sidebarMenu){
			var sidebarMenuIndex = -1;
			var navSidebar = this.getNavSidebar();
			var sidebarMenu = this.getConfig().getMenuData(this.sidebarMenu);
			var sidebarItems = sidebarMenu.items;
			for(var i=0; i<sidebarItems.length; i++){
				if(viewName === sidebarItems[i].viewName){
					sidebarMenuIndex = i;
					break;
				}
			}

			if(sidebarMenuIndex !== -1){
				navSidebar.setSelectedIndex(sidebarMenuIndex);
			}
			else{
				navSidebar.setSelectedControl(null);
			}
		}

		var frameOptions = this.getConfig().getFrame();
		var menu = this.getConfig().getMenuData(frameOptions.navbarMenu);

		var menuIndex = -1;

		for(var i=0; i<menu.items.length; i++){
			if(viewName === menu.items[i].viewName || (this.sidebarMenu && this.sidebarMenu === menu.items[i].sidebarMenu)){
				menuIndex = i;
				break;
			}
		}

		if(menuIndex !== -1){
			this.nav.setSelectedIndex(menuIndex);
		}
		else{
			this.nav.setSelectedControl(null);
		}

		
	};

	FrameControllerProto.setSidebarVisible = function(visible){
		this.getNavContainer().setOptionEnabled('sidebar', visible);
	};

	FrameControllerProto.setSidenavVisible = function(visible){
		this.getNavContainer().setOptionEnabled('sidenav', visible);
	};

	FrameControllerProto.setNavbarVisible = function(visible){
		this.getNavContainer().setOptionEnabled('navbar', visible);
	};

	FrameControllerProto.setSidebarMenu = function(menuData){
		var navSidebar = this.getNavSidebar(),
			_this = this;
		
		if(menuData === this.sidebarMenu){
			return;
		}

		navSidebar.removeAllItems();

		this.sidebarMenu = menuData;

		if(!menuData){
			return;
		}

		navSidebar.attachEvent('tap', {}, function(oEvent){
			_this.gotoPage(oEvent.getParameter('listItem').data());
		});

		var items = this.getConfig().getMenuData(menuData).items;
		for(var i = 0; i < items.length; i++){
			var menuData = items[i];
			var navItem = new ui5strap.ListNavItem();
				navItem.bindProperty('text', menuData.label);
				navItem.data(menuData);
				navSidebar.addItems(navItem);
		}
	};

	/*
	* @Public
	* @Override
	*/
	FrameControllerProto.gotoPage = function (data, callback) {
		var _this = this;

		if(data.sidebarMenu && !data.viewName){
			var submenu = this.getConfig().getMenuData(data.sidebarMenu);
			this.gotoPage(submenu.items[0], callback);
			return;
		}

		var viewData = this.validatePage(data);

		jQuery.sap.log.debug('FrameController.gotoPage (' + viewData.target + ')');

		this.setSidebarVisible(viewData.sidebar);
		this.setNavbarVisible(viewData.navbar);
		this.setSidenavVisible(false);
		
		this.setSidebarMenu(viewData.sidebarMenu);
		

		var currentPage = this.getCurrentPage(viewData.target);

		if(this.isBusy(viewData.target) || viewData.id && currentPage && viewData.id === currentPage.getId()){
			jQuery.sap.log.debug('FrameController.gotoPage: is current page: ' + viewData.id);
			return false;
		}

		this.updateMenu(viewData.viewName);

		if(viewData.showLoader){
			liberty.getViewer().getApp().setLoaderVisible(true, function(){
				_this.toPage(viewData, callback);
			})
		}
		else{
			this.toPage(viewData, callback);
		}

		return true;
	};

}());