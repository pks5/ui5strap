sap.ui.controller("com_mycompany.my_app.controllers.Home", {

	app : com_mycompany.my_app.App.getInstance(),

	gotoGetStarted : function(){
		this.app.gotoPage({
			viewName : "com_mycompany.my_app.views.GetStarted",
			transition : "transition-flip",
			target : "content"
		});
	},

	gotoAbout : function(){
		this.app.getFrame().gotoAbout();
	},

	switchTheme : function(oEvent){
		var app = this.app;
		app.showLoader(true);
		
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
			app.showLoader(false);
		}, null);
		
		
	}
});