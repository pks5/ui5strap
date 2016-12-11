sap.ui.define([
               "ui5strap/library",
               'pks/ui5strap/viewer/AppFrame', 
               "ui5strap/Bar", 
               "ui5strap/NavBar", 
               "ui5strap/Nav", 
               "ui5strap/ListNavItem",
               "ui5strap/Link",
               "ui5strap/ButtonGroup",
               "ui5strap/Button",
               "ui5strap/Icon"
               ], function(ui5strapBs3Lib, AppFrame, Bar, NavBar, Nav, ListNavItem, Link, ButtonGroup, Button, Icon){

	var jQuerySap = jQuery.sap;
	
	jQuerySap.require("jquery.sap.history");
	
	//FrameControllers must extend the AppFrame class
	var FrameController = AppFrame.extend("tld__domain.product__app.modules.AppFrameExample"),
		FrameControllerProto = FrameController.prototype,
		configuration = sap.ui.getCore().getConfiguration();


	FrameControllerProto.showInitialContent = function(callback){
		this.app.log.debug('[APP_FRAME_EXAMPLE] Show initial content...');
		var _this = this;
		var complete = function(){
			_this.initialized = true;
			callback && callback();
		};
		
		try{
			/*
			 * We want to show the intro only for the first time
			 */
			if(!this.app.getLocalStorageItem("skipIntro")){
				//Now we set the skipIntro flag in local storage to true.
				//Next time, we won't see the Intro
				this.app.setLocalStorageItem("skipIntro", true);
				
				this.gotoPage({ 
					"viewName" : "tld__domain.product__app.views.Intro",
					"transition" : "transition-none"
				}, complete);
			}
			else{
				this.gotoPage({ 
					"viewName" : "tld__domain.product__app.views.Page1",
					"transition" : "transition-none"
				}, complete);
			}
		}
		catch(e){
			//If localStorage is not supported, always show the Intro (IE9)
			this.gotoPage({ 
				"viewName" : "tld__domain.product__app.views.Intro",
				"transition" : "transition-none"
			}, complete);
		}
		
		
	};

	/*
	* Create the nav container control used by this frame.
	*/
	FrameControllerProto._createControl = function(){
		var _this = this,
			navContainer = AppFrame.prototype._createControl.call(this);

		//Get the frame options
		var frameOptions = this.options;
		
		//Navbar
		var navbar = new NavBar({ 
			inverse : true, 
			fluid : true, 
			position : ui5strapBs3Lib.NavBarPosition.StaticTop
		});

		this.navbar = navbar;

		//Sidenav toggle
		var toggle = new Button( { 
				align : ui5strapBs3Lib.Alignment.NavBarLeft
			} 
		);
		toggle.addStyleClass("btn-toggle-sidenav");
		toggle.addContent(new Icon( { icon : 'columns', size : ui5strapBs3Lib.IconSize.Large } ));

		toggle.attachEvent('tap', {}, function(){
			_this.getRootControl().toggleOption('sidenav');
		});

		navbar.addContentLeft(toggle);

		//Brand
		var brand = new Link();
		brand.bindProperty('text', {path : 'i18n>MENU_BRAND'});
		
		brand.attachEvent('tap', {}, function(){
			_this.showInitialContent();
		});

		navbar.setBrand(brand);

		//Main menu
		var navNavbar = new Nav(),
			menu = this.app.config.getMenuData(frameOptions.navbarMenu);
		
		if(menu){
			//If a navbarMenu is specified in frameOptions, create the nav menu from it
			for (var i = 0; i < menu.items.length; i++){
				var menuPage = menu.items[i],
					navItem = new ListItem(),
					navItemLink = new Link();
				
				navItemLink.bindProperty('text', {path : menuPage.label});
				
				navItem.addContent(navItemLink);
				
				navItem.data(menuPage);
				navNavbar.addItem(navItem);
			}
			
		}

		navNavbar.attachEvent('tap', {}, function(oEvent){
			var listItem = oEvent.getParameter('listItem');
			if(listItem){
				_this.gotoPage(listItem.data());

				navbar.setCollapsed(true);
			}
		});
		navNavbar.setAlign(ui5strapBs3Lib.Alignment.NavBarLeft);

		navbar.addCollapse(navNavbar);
		this.navNavbar = navNavbar;

		//Language select buttons
		var navButtons = new ButtonGroup({align : ui5strapBs3Lib.Alignment.NavBarRight}),
			buttonDe = new Button({'text' : "DE" }),
			buttonEn = new Button({'text' : "EN" });
		
		navButtons.addButton(buttonEn);
		navButtons.addButton(buttonDe);
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
		});

		if(jQuery.sap.startsWithIgnoreCase(configuration.getLanguage(), 'de')){
			buttonDe.setSelected(true);
		}
		else{
			buttonEn.setSelected(true);
		}

		//Nav menu toggle
		var toggleRight = new Button( { 
				align : ui5strapBs3Lib.Alignment.NavBarRight
			} 
		);
		toggle.addStyleClass("btn-toggle-navbar");
		toggleRight.addContent(new Icon( { icon : 'bars', size : ui5strapBs3Lib.IconSize.Large } ));

		toggleRight.attachEvent('tap', {}, function(){
			navbar.toggle();
		});

		navbar.addContentRight(toggleRight);

		//Sidebar / Sidenav
		var sidebar = new Bar({ "fullHeight" : true, "inverse" : true }),
			navSidebar = new Nav({ type : ui5strapBs3Lib.NavType.PillsStacked, align : ui5strapBs3Lib.Alignment.Sidebar });
		
		navSidebar.addStyleClass("sidebar-nav")
		
		
		this.sidebar = sidebar;

		navSidebar.attachEvent('tap', {}, function(oEvent){
			var listItem = oEvent.getParameter('listItem');
			if(listItem){
				_this.gotoPage(listItem.data());
			}
		});

		sidebar.addContent(navSidebar);
		this.navSidebar = navSidebar;

		return navContainer;
	};

	/*
	* Init navigation history
	*/
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
							params.transition = 'transition-none';
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
	* Navigate to a page
	*
	* @Public
	* @Override
	*/
	FrameControllerProto.gotoPage = function (viewDef, callback) {
		var _this = this,
			frameOptions = this.options;
		
		//If "sidebarMenu" is set, and no "viewName" specified, goto first page of sidebarMenu.
		if(viewDef.sidebarMenu && !viewDef.viewName){
			//if the viewDef contains no viewName but a sidebarMenu only, show the first entry of the submenu

			var submenu = this.app.config.getMenuData(viewDef.sidebarMenu);
			if("items" in submenu && submenu.items.length > 0){
				this.gotoPage(submenu.items[0], callback);
			}
			else{
				throw new Error('Invalid sidebar menu: ' + viewDef.sidebarMenu);
			}

			return;
		}

		//Get final view configuration
		var viewConfig = this.getViewConfig(viewDef),
			target = viewConfig.target;

		if(this.isBusy(target)){
			this.app.log.debug('[APP_FRAME_EXAMPLE] Target is busy: "' + target + '"');

			return false;
		}
		
		this.app.log.debug('[APP_FRAME_EXAMPLE] Navigate Target "' + target + '" to View "' + viewConfig.viewName + '"');
		
		var navbarEnabled = frameOptions.navbar;
		if("navbar" in viewConfig){
			navbarEnabled = viewConfig.navbar;
		}

		var sidebarEnabled = frameOptions.sidebar;
		if("sidebar" in viewConfig){
			sidebarEnabled = viewConfig.sidebar;
		}

		var sidenavEnabled = frameOptions.sidenav;
		if("sidenav" in viewConfig){
			sidenavEnabled = viewConfig.sidenav;
		}

		var sidebar2Nav = frameOptions.sidebar2Nav;
		if("sidebar2Nav" in viewConfig){
			sidebar2Nav = viewConfig.sidebar2Nav;
		}

		var sidebarSmall = frameOptions.sidebarSmall;
		if("sidebarSmall" in viewConfig){
			sidebarSmall = viewConfig.sidebarSmall;
		}

		var sidenavToggle = frameOptions.sidenavToggle;
		if("sidenavToggle" in viewConfig){
			sidenavToggle = viewConfig.sidenavToggle;
		}

		this.getRootControl().setOptionsEnabled({
			'navbar' :  navbarEnabled,
			'sidebar' : sidebarEnabled,
			'sidenav' : sidenavEnabled,
			
			'sidebar-2nav' : sidebar2Nav,
			'sidebar-small' : sidebarSmall,
			'sidenav-toggle' : sidenavToggle
		});

		if("sidebarMenu" in viewConfig){
			this.setSidebarMenu(viewConfig.sidebarMenu);
		}
		else if("sidebarMenu" in frameOptions){
			this.setSidebarMenu(frameOptions.sidebarMenu);
		}

		this.getRootControl().toPage(this.sidebar, 'sidebar', "transition-none");
		this.getRootControl().toPage(this.navbar, 'navbar', "transition-none");

		var currentPage = this.getCurrentPage(target);
		if(
			_this.getRootControl().getDomRef() 
			&& viewConfig.id 
			&& currentPage 
			&& viewConfig.id === currentPage.getId()
		){
			this.updatePage(currentPage, viewConfig.parameters);

			this.app.log.debug('[APP_FRAME_EXAMPLE] Page is current: "' + viewConfig.id + '"');
			
			return false;
		}

		if(viewConfig.documentTitle){
			var titlePath = viewConfig.documentTitle.split('>');
			if(titlePath.length === 2){ 
				document.title = this.app.getLocaleString(titlePath[1], titlePath[0]);
			}
		}

		this.updateMenu(viewConfig.viewName);

		if(viewConfig.showLoader){
			this.app.setLoaderVisible(true, function(){
				_this.toPage(viewConfig, callback);
			})
		}
		else{
			this.toPage(viewConfig, callback);
		}

		//Write history entry for back/forward navigation in browser / using javascript.
		if (viewConfig.writeHistory && this.app.config.data.app.history) {
			jQuery.sap.history.addHistory(target, viewDef, viewConfig.bookmarkable, viewConfig.virtual);
		}

		return true;
	};

	
	/*
	*
	* Update menu and highlight items that match to current view
	*
	* @Public
	*/
	FrameControllerProto.updateMenu = function(viewName){
		this.app.log.debug('[APP_FRAME_EXAMPLE] updateMenu "' + viewName + '"');

		var navSidebar = this.navSidebar;

		if(this.sidebarMenu){
			var sidebarMenu = this.app.config.getMenuData(this.sidebarMenu);
			
			if(null !== sidebarMenu && 'items' in sidebarMenu){
				var sidebarMenuIndex = -1,
					sidebarItems = sidebarMenu.items;
				
				for(var i=0; i<sidebarItems.length; i++){
					if(viewName === this.app.config.resolvePackage(sidebarItems[i].viewName, "views")){
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
			
		}
	};

	/*
	* Sets the sidebar menu
	* @param menuName Name of menu defined in configuration
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
					navItem = new ListNavItem();

				navItem.bindProperty('text', menuItemData.label);
				navItem.data(menuItemData);

				if(menuItemData.icon){
					navItem.addContent(new Icon({ 'icon' : menuItemData.icon, 'fixedWidth' : true }));
				}
				
				navSidebar.addItem(navItem);
			}

		}
		else{

			throw new Error('Invalid sidebar menu: ' + menuName);

		}
	};

	return FrameController;
});