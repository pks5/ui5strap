/*
 * 
 * MyFrameController
 *
 * Author: [Your Name]
 * 
 * Copyright (c) 2014 [Your Company]
 * 
 * [Website]
 *
 * [License information]
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

	FrameControllerProto._initControl = function(){
		var _this = this;
		ui5strap.AppFrame.prototype._initControl.call(this);

		//Get the frame options
		var frameOptions = this.options;
		
		//Navbar
		var navbar = new ui5strap.NavBar({ 
			inverse : true, 
			fluid : true, 
			position : ui5strap.NavBarPosition.StaticTop
		});

		this.navbar = navbar;

		//Sidenav toggle
		var toggle = new ui5strap.Button( { 
				align : ui5strap.Alignment.NavBarLeft,
				bsAction : ui5strap.BsAction.ToggleSidenav
			} 
		);
		toggle.addContent(new ui5strap.Icon( { icon : 'columns', size : ui5strap.IconSize.Large } ));

		toggle.attachEvent('tap', {}, function(){
			_this.control.toggleOption('sidenav');
		});

		navbar.addContentLeft(toggle);

		//Brand
		var brand = new ui5strap.Link();
		brand.bindProperty('text', {path : 'i18n>MENU_BRAND'});
		
		brand.attachEvent('tap', {}, function(){
			_this.showInitialContent();
		});

		navbar.setBrand(brand);

		//Main menu
		var navNavbar = new ui5strap.Nav(),
			menu = this.app.config.getMenuData(frameOptions.navbarMenu);
		
		if(menu){
			//If a navbarMenu is specified in frameOptions, create the nav menu from it
			for (var i = 0; i < menu.items.length; i++){
				var menuPage = menu.items[i],
					navItem = new ui5strap.ListItem(),
					navItemLink = new ui5strap.Link();
				
				navItemLink.bindProperty('text', {path : menuPage.label});
				
				navItem.addContent(navItemLink);
				
				navItem.data(menuPage);
				navNavbar.addItems(navItem);
			}
		}

		navNavbar.attachEvent('tap', {}, function(oEvent){
			_this.gotoPage(oEvent.getParameter('listItem').data());

			navbar.setCollapsed(true);
		});
		navNavbar.setAlign(ui5strap.Alignment.NavBarLeft);

		navbar.addCollapse(navNavbar);
		this.navNavbar = navNavbar;

		//Language select buttons
		var navButtons = new ui5strap.ButtonGroup({align : ui5strap.Alignment.NavBarRight}),
			buttonDe = new ui5strap.Button({'text' : "DE" }),
			buttonEn = new ui5strap.Button({'text' : "EN" });
		
		navButtons.addButtons(buttonEn);
		navButtons.addButtons(buttonDe);
		navbar.addCollapse(navButtons);

		navButtons.attachEvent('tap', {}, function(oEvent){
			var srcButton = oEvent.getParameter('button');
			navButtons.setSelectedControl(srcButton);

			if(buttonEn === srcButton){
				configuration.setLanguage('en-us');
			}
			else if(buttonDe === srcButton){
				configuration.setLanguage('de-de');
			}
			//alert(configuration.getLanguage());
		});

		if(jQuery.sap.startsWithIgnoreCase(configuration.getLanguage(), 'de')){
			buttonDe.setSelected(true);
		}
		else{
			buttonEn.setSelected(true);
		}

		//Nav menu toggle
		var toggleRight = new ui5strap.Button( { 
				align : ui5strap.Alignment.NavBarRight,
				bsAction : ui5strap.BsAction.ToggleNavbar
			} 
		);
		
		toggleRight.addContent(new ui5strap.Icon( { icon : 'bars', size : ui5strap.IconSize.Large } ));

		toggleRight.attachEvent('tap', {}, function(){
			navbar.toggle();
		});

		navbar.addContentRight(toggleRight);

		//Sidebar / Sidenav
		var sidebar = new ui5strap.Sidebar({ "inverse" : true }),
			navSidebar = new ui5strap.Nav({ type : ui5strap.NavType.PillsStacked, align : ui5strap.Alignment.Sidebar });

		this.sidebar = sidebar;

		navSidebar.attachEvent('tap', {}, function(oEvent){
			_this.gotoPage(oEvent.getParameter('listItem').data());
		});

		sidebar.addContent(navSidebar);
		this.navSidebar = navSidebar;
	};

	FrameControllerProto._initHistory = function(){
		var _this = this;

		if(!this.app.config.data.app.history){
			return false;
		}

		jQuery.sap.history({
			routes : [
				{
					path : "content",
					handler : function (params, navType) {
						if(_this.initialized){
							params.writeHistory = false;
							_this.gotoPage(params);
						}
						else{
							params.writeHistory = true;
							params.transition = 'none';
							_this.oTargets["content"] = params;
						}
					}
				}
			],
			defaultHandler : function (navType) {

				if(_this.initialized){
					_this.showInitialContent();
				}

			}
		});
	};

	/*
	*
	* Updates the menus
	*
	* @Public
	*/
	FrameControllerProto.updateMenu = function(viewName){
		jQuery.sap.log.debug('[MFR] updateMenu ("' + viewName + '")');

		var navSidebar = this.navSidebar;

		if(this.sidebarMenu){
			var sidebarMenu = this.app.config.getMenuData(this.sidebarMenu);
			
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

		var frameOptions = this.options;
		if(frameOptions.navbarMenu){
			var menu = this.app.config.getMenuData(frameOptions.navbarMenu);

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
					this.navNavbar.setSelectedIndex(menuIndex);
				}
				else{
					this.navNavbar.setSelectedControl(null);
				}
			}
			else{
				jQuery.sap.log.debug("No navbar menu is set.");
				//throw new Error('Invalid navbar menu: ' + frameOptions.navbarMenu);
			}
		}
	};

	/*
	* Sets the sidebar menu to the menu with name menuName defined in configuration
	* @Public 
	*/
	FrameControllerProto.setSidebarMenu = function(menuName){
		var navSidebar = this.navSidebar,
			_this = this;
		
		if(menuName === this.sidebarMenu){
			return;
		}

		navSidebar.removeAllItems();

		this.sidebarMenu = menuName;

		if(!menuName){
			return;
		}

		var sidebarMenu = this.app.config.getMenuData(menuName);

		if(null !== sidebarMenu && "items" in sidebarMenu){

			var items = sidebarMenu.items;
			for(var i = 0; i < items.length; i++){
				var menuItemData = items[i],
					navItem = new ui5strap.ListNavItem();

				navItem.bindProperty('text', menuItemData.label);
				navItem.data(menuItemData);

				if(menuItemData.icon){
					navItem.addContent(new ui5strap.Icon({ 'icon' : menuItemData.icon, 'fixedWidth' : true }));
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
		var _this = this,
			frameOptions = this.options;
		
		if(data.sidebarMenu && !data.viewName){
			//if the data contains no viewName but a sidebarMenu only, show the first entry of the submenu

			var submenu = this.app.config.getMenuData(data.sidebarMenu);
			if("items" in submenu && submenu.items.length > 0){
				this.gotoPage(submenu.items[0], callback);
			}
			else{
				throw new Error('Invalid sidebar menu: ' + data.sidebarMenu);
			}

			return;
		}

		var viewData = this.validatePage(data);

		if(this.isBusy(viewData.target)){
			jQuery.sap.log.debug('[MFR][' + viewData.target + '] is busy!');

			return false;
		}
		else{
			jQuery.sap.log.debug('[MFR][' + viewData.target + '] gotoPage ("' + viewData.viewName + '#' + viewData.id + '")');
		}

		var navbarEnabled = frameOptions.navbar;
		if("navbar" in viewData){
			navbarEnabled = viewData.navbar;
		}

		var sidebarEnabled = frameOptions.sidebar;
		if("sidebar" in viewData){
			sidebarEnabled = viewData.sidebar;
		}

		var sidebarSmall = frameOptions.sidebarSmall;
		if("sidebarSmall" in viewData){
			sidebarSmall = viewData.sidebarSmall;
		}

		var sidenavEnabled = frameOptions.sidenav;
		if("sidenav" in viewData){
			sidenavEnabled = viewData.sidenav;
		}

		this.control.setOptionsEnabled({
			'navbar' :  navbarEnabled,
			'sidebar' : sidebarEnabled,
			'sidenav' : sidenavEnabled,
			
			'sidebar-2nav' : viewData.sidebar2nav,
			'sidebar-small' : sidebarSmall,
			'sidenav-toggle' : viewData.sidenavToggle
		});

		if("sidebarMenu" in viewData){
			this.setSidebarMenu(viewData.sidebarMenu);
		}
		else if("sidebarMenu" in frameOptions){
			this.setSidebarMenu(frameOptions.sidebarMenu);
		}

		this.control.toPage(this.sidebar, 'sidebar');
		this.control.toPage(this.navbar, 'navbar');

		var currentPage = this.getCurrentPage(viewData.target);
		if(
			_this.control.getDomRef() 
			&& viewData.id 
			&& currentPage 
			&& viewData.id === currentPage.getId()
		){
			this.updatePage(currentPage, viewData.parameters);

			jQuery.sap.log.debug('[MFR] is current page: ' + viewData.id);
			return false;
		}

		if(viewData.documentTitle){
			var titlePath = viewData.documentTitle.split('>');
			if(titlePath.length === 2){ 
				var ressourceModel = this.app.getRootControl().getModel(titlePath[0]);
				if(ressourceModel){
					document.title = ressourceModel.getProperty(titlePath[1]);
				}
			}
		}

		this.updateMenu(viewData.viewName);

		if(viewData.showLoader){
			this.app.setLoaderVisible(true, function(){
				_this.toPage(viewData, callback);
			})
		}
		else{
			this.toPage(viewData, callback);
		}

		return true;
	};

}());