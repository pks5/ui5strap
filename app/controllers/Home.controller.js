sap.ui.controller("com_mycompany.my_app.controllers.Home", {

	app : com_mycompany.my_app.StrapApp.getInstance(),

	gotoGetStarted : function(){
		this.app.getFrame().gotoGetStarted();
	},

	switchTheme : function(oEvent){
		var app = this.app;
		app.showLoader(true);
		var btn = oEvent.getSource();
		var newTheme = btn.getCustomData()[0].getValue('theme');
		if('default' === newTheme){
			newTheme = app.sheets[0];
		}
		if(!this.activeButton){
			this.activeButton = this.getView().byId('defaultThemeButton');
		}
		this.activeButton.setActive(false);
		btn.setActive(true);
		this.activeButton = btn;
		jQuery.sap.includeStyleSheet(newTheme, 'style-sheet-0', function(){
			app.showLoader(false);
		}, null);
		
		
	}
});