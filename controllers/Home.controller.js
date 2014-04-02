sap.ui.controller("de_pksoftware.ui5strap.controllers.Home", {

	gotoGetStarted : function(){
		de_pksoftware.ui5strap.StrapApp.getInstance().getFrame().gotoGetStarted();
	},

	switchTheme : function(oEvent){
		var newTheme = oEvent.getSource().getCustomData()[0].getValue('theme');
		if('default' === newTheme){
			newTheme = de_pksoftware.ui5strap.StrapApp.getInstance().sheets[0];
		}
		jQuery.sap.includeStyleSheet(newTheme, 'style-sheet-0', null, null);
		
	}
});