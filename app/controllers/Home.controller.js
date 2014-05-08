sap.ui.controller("com_mycompany.my_app.controllers.Home", {

	app : liberty.getViewer().getApp(),

	gotoInstallation : function(){
		this.app.getFrame().setPage({
			id : 'my-app-installation',
			viewName : "com_mycompany.my_app.views.Installation",
			transition : "transition-flip",
			target : "content"
		});
	},

	gotoThemes : function(){
		this.app.getFrame().setPage({
			id : 'my-app-themes',
			viewName : "com_mycompany.my_app.views.Themes",
			transition : "transition-flip",
			target : "content"
		});
	},

	gotoControls : function(){
		this.app.getFrame().setPage({
			id : 'my-app-controls',
			viewName : "com_mycompany.my_app.views.Controls",
			transition : "transition-flip",
			target : "content"
		});
	},

	gotoSupport : function(){
		this.app.getFrame().setPage({
			id : 'my-app-support',
			viewName : "com_mycompany.my_app.views.Support",
			transition : "transition-flip",
			target : "content"
		});
	},

	switchTheme : function(oEvent){
		var app = this.app;
		app.setLoaderVisible(true);
		
		var btn = oEvent.getSource();
		var newTheme = btn.getCustomData()[0].getValue('theme');
		if('default' === newTheme){
			newTheme = jQuery.sap.getModulePath('ui5strap') + '/bootstrap-3.1.1-dist/css/bootstrap.min.css';
		}
		if(!this.activeButton){
			this.activeButton = this.getView().byId('defaultThemeButton');
		}
		this.activeButton.setSelected(false);
		btn.setSelected(true);
		this.activeButton = btn;
		jQuery.sap.includeStyleSheet(newTheme, 'ui5strap-css-0', function(){
			app.setLoaderVisible(false);
		}, null);
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