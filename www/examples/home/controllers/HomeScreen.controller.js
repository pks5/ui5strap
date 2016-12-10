sap.ui.define(['pks/ui5strap/viewer/Controller'], function(Controller){

	return Controller.extend("com.ui5strap.apps.home.controllers.HomeScreen", {
		onPageShown : function(){
			var view = this.getView();
			view.byId("homeScreen").showIcons();
			jQuery.sap.log.debug("Page shown")
		},
		
		onAfterRendering : function(){
			jQuery.sap.log.info("Rendered Home View.");
		}
	});
	
});