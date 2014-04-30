sap.ui.controller("com_mycompany.my_app.controllers.Home", {

	app : liberty.getViewer().getApp(),

	gotoGetStarted : function(){
		this.app.getFrame().setPage({
			viewName : "com_mycompany.my_app.views.GetStarted",
			transition : "transition-flip",
			target : "content"
		});
	},

	gotoAbout : function(){
		this.app.getFrame().setPage({
			viewName : "com_mycompany.my_app.views.About",
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
		
		
	}
});