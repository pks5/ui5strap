sap.ui.controller("com_mycompany.my_app.controllers.Controls", {

	app : liberty.getViewer().getApp(),

	onAfterRendering : function(){
		//this.app.setLoaderVisible(false);
	},	

	showModal : function(){
		this.getView().byId('myModal').show();
	}
	
});