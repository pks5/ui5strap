/*
 * 
 * UI5Strap
 *
 * FrameController Example
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

	//Change this if you renamed the package in the app.json
	var _moduleName = "com_mycompany.my_app.modules.MyFrameController";

	jQuery.sap.declare(_moduleName);
	
	jQuery.sap.require("ui5strap.AppFrame");

	jQuery.sap.require("ui5strap.Sidebar");
	jQuery.sap.require("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.Nav");
	jQuery.sap.require("ui5strap.ListNavItem");
	jQuery.sap.require("ui5strap.Link");
	jQuery.sap.require("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.Button");
	jQuery.sap.require("ui5strap.Icon");

	//FrameControllers must extend the AppFrame class
	ui5strap.AppFrame.extend(_moduleName);

	var FrameController = jQuery.sap.getObject(_moduleName),
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
		var _navContainer = null;

		/*
		 * Creates the NavContainer if no instance has created yet, otherwise it returns the existing instance.
		 * @Singleton
		 * @Override
		 * @Public
		 */
		_this.getNavContainer = function(){
			//This method is a singleton - return existing instance if there is one
			if(null !== _navContainer){
				return _navContainer;
			}

			//Get the frame options
			var frameOptions = _this.getConfig().getFrame();
			
			//Navbar
			var navBar = new ui5strap.NavBar({ inverse : true, fluid : true, position : ui5strap.NavBarPosition.StaticTop });

			//Sidenav toggle
			var toggle = new ui5strap.Button( { 
					align : ui5strap.Alignment.NavBarLeft
				} 
			);
			toggle.addContent(new ui5strap.Icon( { icon : 'columns', size : ui5strap.IconSize.Large } ));

			toggle.attachEvent('tap', {}, function(){
				_this.getNavContainer().toggleOption('sidenav');
			});

			navBar.addContentLeft(toggle);

			//Brand
			var brand = new ui5strap.Link();
			brand.bindProperty('text', {path : 'i18n>MENU_BRAND'});
			
			brand.attachEvent('tap', {}, function(){
				_this.showInitialContent();
			});

			navBar.setBrand(brand);

			//Main menu
			var navLeft = new ui5strap.Nav();
			navLeft.setAlign(ui5strap.Alignment.NavBarLeft);
			
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

			navBar.addCollapse(navLeft);
			_this._navNavbar = navLeft;

			//Language select buttons
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

			//Nav menu toggle
			var toggleRight = new ui5strap.Button( { 
					align : ui5strap.Alignment.NavBarRight
				} 
			);
			
			toggleRight.addContent(new ui5strap.Icon( { icon : 'bars', size : ui5strap.IconSize.Large } ));

			toggleRight.attachEvent('tap', {}, function(){
				navBar.toggle();
			});

			navBar.addContentRight(toggleRight);

			//Sidebar / Sidenav
			var sidebar = new ui5strap.Sidebar(),
				navSidebar = new ui5strap.Nav({ type : ui5strap.NavType.PillsStacked, align : ui5strap.Alignment.Sidebar });

			navSidebar.attachEvent('tap', {}, function(oEvent){
				_this.gotoPage(oEvent.getParameter('listItem').data());
			});

			sidebar.addContent(navSidebar);
			_this._navSidebar = navSidebar;
			
			//NavContainer
			//Check if a NavContainer is defined in the configuration
			if(!("navContainer" in frameOptions)){
				throw new Error('Invalid frame options: no nav container defined.');
			}

			//Create the NavContainer instance
			var navContainerModule = frameOptions.navContainer;

			jQuery.sap.require(navContainerModule);
			var NavContainerConstructor = jQuery.sap.getObject(navContainerModule);

			_navContainer = new NavContainerConstructor();

			//Append bars to the NavContainer
			_navContainer.setSidebar(sidebar);
			_navContainer.setNavbar(navBar);

			return _navContainer;
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
		ui5strap.AppFrame.prototype.init.call(this);

		_createPrivateProperties(this);
	};

	/*
	*
	* Returns the reference to the Nav Control within the navbar
	*
	* @Public
	*/
	FrameControllerProto.getNavNavbar = function(){
		return this._navNavbar;
	};

	/*
	*
	* Returns the reference to the Nav Control within the sidebar
	*
	* @Public
	*/
	FrameControllerProto.getNavSidebar = function(){
		return this._navSidebar;
	};

	/*
	*
	* Updates the menus
	*
	* @Public
	*/
	FrameControllerProto.updateMenu = function(viewName){
		jQuery.sap.log.trace('FrameController.updateMenu ("' + viewName + '")');

		var navSidebar = this.getNavSidebar();

		if(this.sidebarMenu){
			var sidebarMenu = this.getConfig().getMenuData(this.sidebarMenu);
			
			if(null !== sidebarMenu && 'items' in sidebarMenu){
				var sidebarMenuIndex = -1,
					sidebarItems = sidebarMenu.items;
				
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
			else{
				throw new Error('Invalid sidebar menu: ' + this.sidebarMenu);
			}
		}

		var frameOptions = this.getConfig().getFrame();
		if(frameOptions.navbarMenu){
			var menu = this.getConfig().getMenuData(frameOptions.navbarMenu);

			if(null !== menu && 'items' in menu){
				var menuIndex = -1,
					menuItems = menu.items;

				for(var i=0; i<menuItems.length; i++){
					if(viewName === menuItems[i].viewName || (this.sidebarMenu && this.sidebarMenu === menuItems[i].sidebarMenu)){
						menuIndex = i;
						break;
					}
				}

				if(menuIndex !== -1){
					this._navNavbar.setSelectedIndex(menuIndex);
				}
				else{
					this._navNavbar.setSelectedControl(null);
				}
			}
			else{
				throw new Error('Invalid navbar menu: ' + frameOptions.navbarMenu);
			}
		}
	};

	/*
	* Shows / hides the sidebar
	* @Public
	*/
	FrameControllerProto.setSidebarVisible = function(visible){
		this.getNavContainer().setOptionsEnabled(
			{ 
				'sidebar' : visible, 
				'sidebar2bottom' : visible
			}
		);
	};

	/*
	* Shows / hides the sidenav
	* @Public
	*/
	FrameControllerProto.setSidenavVisible = function(visible){
		this.getNavContainer().setOptionsEnabled({ 'sidenav' : visible });
	};

	/*
	* Shows / hides the navbar
	* @Public
	*/
	FrameControllerProto.setNavbarVisible = function(visible){
		this.getNavContainer().setOptionsEnabled({ 'navbar' : visible });
	};

	/*
	* Sets the sidebar menu to the menu with name menuName defined in configuration
	* @Public 
	*/
	FrameControllerProto.setSidebarMenu = function(menuName){
		var navSidebar = this.getNavSidebar(),
			_this = this;
		
		if(menuName === this.sidebarMenu){
			return;
		}

		navSidebar.removeAllItems();

		this.sidebarMenu = menuName;

		if(!menuName){
			return;
		}

		var sidebarMenu = this.getConfig().getMenuData(menuName);

		if(null !== sidebarMenu && "items" in sidebarMenu){

			var items = sidebarMenu.items;
			for(var i = 0; i < items.length; i++){
				var menuItemData = items[i],
					navItem = new ui5strap.ListNavItem();

				navItem.bindProperty('text', menuItemData.label);
				navItem.data(menuItemData);

				if(menuItemData.icon){
					navItem.addContent(new ui5strap.Icon({ 'icon' : menuItemData.icon}));
				}
				
				navSidebar.addItems(navItem);
			}

		}
		else{

			throw new Error('Invalid sidebar menu: ' + menuName);

		}
	};

	/*
	* Navigates to a page defined in the data parameter 
	*
	* @Public
	* @Override
	*/
	FrameControllerProto.gotoPage = function (data, callback) {
		var _this = this;

		if(data.sidebarMenu && !data.viewName){
			//if the data contains no viewName but a sidebarMenu only, show the first entry of the submenu

			var submenu = this.getConfig().getMenuData(data.sidebarMenu);
			if("items" in submenu && submenu.items.length > 0){
				this.gotoPage(submenu.items[0], callback);
			}
			else{
				throw new Error('Invalid sidebar menu: ' + data.sidebarMenu);
			}

			return;
		}

		var viewData = this.validatePage(data);

		jQuery.sap.log.debug('FrameController.gotoPage (' + viewData.target + ')');

		this.setSidebarVisible(viewData.sidebar);
		this.setNavbarVisible(viewData.navbar);
		this.setSidenavVisible(viewData.sidenav);
		
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