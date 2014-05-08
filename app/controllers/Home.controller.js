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
	}
	
});