sap.ui.define(['pks/ui5strap/viewer/Controller'], function(Controller){
		
	return Controller.extend("tld__domain.product__app.controllers.Page3", {
		onInit : function(oEvent){
			this.nc = this.getApp().getFrame().getRootControl(); 
		},
	
		toggleSidebar : function(oEvent){
			var srcButton = oEvent.getSource();
	
			srcButton.setSelected(!srcButton.getSelected());
	
			this.nc.setOptionsEnabled({
				"sidebar" : srcButton.getSelected()
			});
		},
	
		toggleSidenav : function(oEvent){
			var srcButton = oEvent.getSource();
	
			srcButton.setSelected(!srcButton.getSelected());
	
			this.nc.setOptionsEnabled({
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
	
			this.nc.setOptionsEnabled(options);
		},
	
		toggleNavbar : function(oEvent){
			var srcButton = oEvent.getSource();
	
			srcButton.setSelected(!srcButton.getSelected());
	
			this.nc.setOptionsEnabled({
				"navbar" : srcButton.getSelected()
			});
		},
	
		showOverlay : function(oEvent){
			
			this.getApp().showOverlay({ "id" : "my-app-overlay" }, null, 'slide-ttb');
		}
	});
});