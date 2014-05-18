sap.ui.controller("com_mycompany.my_app.controllers.Controls", {

	app : liberty.getViewer().getApp(),

	showModal : function(){
		this.getView().byId('myModal').show();
	}
	
});