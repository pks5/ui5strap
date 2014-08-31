jQuery.sap.require('ui5strap.Action');

ui5strap.controller("com_mycompany.my_app.controllers.Page3", {

	toggleSidebar : function(oEvent){
		var srcButton = oEvent.getSource();

		srcButton.setSelected(!srcButton.getSelected());

		var frame = this.getView().getViewData().app.getFrame();

		frame.getNavContainer().setOptionsEnabled({
			"sidebar" : srcButton.getSelected()
		});
	},

	toggleSidenav : function(oEvent){
		var srcButton = oEvent.getSource();

		srcButton.setSelected(!srcButton.getSelected());

		var frame = this.getView().getViewData().app.getFrame();

		frame.getNavContainer().setOptionsEnabled({
			"sidenav" : srcButton.getSelected()
		});
	},

	toggleSidebarOptions : function(oEvent){
		var srcButton = oEvent.getSource();

		var text = oEvent.getParameter("button").getText();

		var frame = this.getView().getViewData().app.getFrame();

		var options = {
			"sidebar-small" : false,
			"sidebar-2nav" : false
		};

		if(text !== 'default'){
			options[text] = true;
		}

		frame.getNavContainer().setOptionsEnabled(options);
	},

	toggleNavbar : function(oEvent){
		var srcButton = oEvent.getSource();

		srcButton.setSelected(!srcButton.getSelected());

		var frame = this.getView().getViewData().app.getFrame();

		frame.getNavContainer().setOptionsEnabled({
			"navbar" : srcButton.getSelected()
		});
	}
	
});