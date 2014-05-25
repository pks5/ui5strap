sap.ui.controller("com_mycompany.my_app.controllers.Home", {

	app : liberty.getViewer().getApp(),

	onPageShow : function(){
		this.app.getFrame().getNavContainer().setOption('sidebar', false);
	},

	gotoInstallation : function(){
		this.app.getFrame().gotoPage({
			id : 'my-app-installation',
			viewName : "com_mycompany.my_app.views.Installation",
			transition : "transition-flip",
			target : "content"
		});
	},

	gotoThemes : function(){
		this.app.getFrame().gotoPage({
			id : 'my-app-themes',
			viewName : "com_mycompany.my_app.views.Themes",
			transition : "transition-flip",
			target : "content"
		});
	},

	gotoControls : function(){
		this.app.setLoaderVisible(true, function(){
			this.getFrame().gotoPage({
				id : 'my-app-controls',
				viewName : "com_mycompany.my_app.views.Controls",
				transition : "transition-flip",
				target : "content"
			});
		});
		
	},

	gotoSupport : function(){
		this.app.getFrame().gotoPage({
			id : 'my-app-support',
			viewName : "com_mycompany.my_app.views.Support",
			transition : "transition-flip",
			target : "content"
		});
	}
	
});