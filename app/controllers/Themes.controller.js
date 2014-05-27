sap.ui.controller("com_mycompany.my_app.controllers.Themes", {

	app : liberty.getViewer().getApp(),

	onPageShown : function(){
		this.app.getFrame().getNavContainer().setOption('sidebar', true);
		var navSidebar = this.app.getFrame().getNavSidebar();

		navSidebar.removeAllItems();

		var navItem = new ui5strap.ListNavItem();
			navItem.setText('Themes');
			navSidebar.addItems(navItem);
			navSidebar.setSelectedControl(navItem);
	},

	onPageHide : function(){
		this.app.getFrame().getNavContainer().setOption('sidebar', false);
	},

	switchTheme : function(oEvent){
		var app = this.app,
			_this = this,
			btn = oEvent.getSource();

		app.setLoaderVisible(true, function(){
			var newTheme = btn.getCustomData()[0].getValue('theme');
			if('default' === newTheme){
				newTheme = jQuery.sap.getModulePath('ui5strap') + '/bootstrap-3.1.1-dist/css/bootstrap.min.css';
			}
			if(!_this.activeButton){
				_this.activeButton = _this.getView().byId('defaultThemeButton');
			}
			_this.activeButton.setSelected(false);
			btn.setSelected(true);
			_this.activeButton = btn;
			window.setTimeout(function(){
				jQuery.sap.includeStyleSheet(newTheme, 'bootstrap-css', function(){
					window.setTimeout(function(){
						app.setLoaderVisible(false);
					}, 500);
				}, null);
			}, 500);
		}, 'opaque');
	},

	submitThemeForm : function(oEvent){
		var app = this.app;
		

		var newTheme = this.getView().byId('themeInput').getValue();

		if('' === newTheme){
			return false;
		}

		if(!this.isValidBootstrapTheme(newTheme)){
			//Todo Change to BS Modal

			alert(newTheme + ' is not a valid Bootstrap theme!');

			return false;
		}
		else{
			app.setLoaderVisible(true);
		
			if(this.activeButton){
				this.activeButton.setSelected(false);
			}

			jQuery.sap.includeStyleSheet(newTheme, 'ui5strap-css-0', function(){
				app.setLoaderVisible(false);
			}, null);
		}
	},

	isValidBootstrapTheme : function(themeUrl){
 		return /bootstrap(\.min)?\.css$/.test(themeUrl);
	}
	
});