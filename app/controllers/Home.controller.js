sap.ui.controller("de_pksoftware.ui5strap_docs.controllers.Home", {

	gotoGetStarted : function(){
		de_pksoftware.ui5strap_docs.StrapApp.getInstance().getFrame().gotoGetStarted();
	},

	switchTheme : function(oEvent){
		var btn = oEvent.getSource();
		var newTheme = btn.getCustomData()[0].getValue('theme');
		if('default' === newTheme){
			newTheme = de_pksoftware.ui5strap_docs.StrapApp.getInstance().sheets[0];
		}
		if(!this.activeButton){
			this.activeButton = this.getView().byId('defaultThemeButton');
		}
		this.activeButton.setActive(false);
		btn.setActive(true);
		this.activeButton = btn;
		jQuery.sap.includeStyleSheet(newTheme, 'style-sheet-0', null, null);
		
	}
});