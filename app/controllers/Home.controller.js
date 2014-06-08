jQuery.sap.require('a__.Action');

sap.ui.controller("com_mycompany.my_app.controllers.Home", {

	app : liberty.getViewer().getApp(),

	onInit : function(){
		//console.log(ui5strap);
		//console.log(sap.ui.getCore().getLoadedLibraries() );
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
			viewName : "com_mycompany.my_app.views.configuration.Theme",
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
		/*
		this.app.getFrame().gotoPage({
			id : 'my-app-support',
			viewName : "com_mycompany.my_app.views.Support",
			transition : "transition-flip",
			target : "content"
		});
		*/

		a__.Action.run({
			"parameters" : {
				"a__modules" : "a__.GotoPageAction",
				"gotoPage" : {
					id : 'my-app-support',
					viewName : "com_mycompany.my_app.views.Support",
					transition : "transition-flip",
					target : "content"
				}
			},
			"app" : this.getView().getViewData().app
		});
	}
	
});