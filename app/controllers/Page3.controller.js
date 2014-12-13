jQuery.sap.require('ui5strap.Action');

ui5strap.controller("com_mycompany.my_app.controllers.Page3", {

	toggleSidebar : function(oEvent){
		var srcButton = oEvent.getSource();

		srcButton.setSelected(!srcButton.getSelected());

		this.getView().getViewData().app.getFrame().control.setOptionsEnabled({
			"sidebar" : srcButton.getSelected()
		});
	},

	toggleSidenav : function(oEvent){
		var srcButton = oEvent.getSource();

		srcButton.setSelected(!srcButton.getSelected());

		this.getView().getViewData().app.getFrame().control.setOptionsEnabled({
			"sidenav" : srcButton.getSelected()
		});
	},

	toggleSidebarOptions : function(oEvent){
		var srcButton = oEvent.getSource();

		var text = oEvent.getParameter("button").getText();

		var options = {
			"sidebar-small" : false,
			"sidebar-2nav" : false
		};

		if(text !== 'default'){
			options[text] = true;
		}

		this.getView().getViewData().app.getFrame().control.setOptionsEnabled(options);
	},

	toggleNavbar : function(oEvent){
		var srcButton = oEvent.getSource();

		srcButton.setSelected(!srcButton.getSelected());

		this.getView().getViewData().app.getFrame().control.setOptionsEnabled({
			"navbar" : srcButton.getSelected()
		});
	}
	
});