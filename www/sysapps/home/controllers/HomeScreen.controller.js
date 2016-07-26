sap.ui.define(['ui5strap/Controller'], function(Controller){

	return Controller.extend("com.ui5strap.apps.home.controllers.HomeScreen", {
		onPageShown : function(){
			var view = this.getView();
			view.byId("homeScreen").showIcons();
		}
	});
	
});