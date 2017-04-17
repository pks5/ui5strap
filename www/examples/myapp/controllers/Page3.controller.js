sap.ui.define(['pks/ui5strap/viewer/Controller'], function(Controller){
		
	return Controller.extend("tld__domain.product__app.controllers.Page3", {
		
		onInit : function(oEvent){
			
		},
	
		toggleSidebar : function(oEvent){
			var srcButton = oEvent.getSource(),
				oFrame = this.getApp().getFrame();
	
			srcButton.setSelected(!srcButton.getSelected());
	
			oFrame.options.sidebar = srcButton.getSelected();
			
			oFrame.getRootControl().setOptionsEnabled({
				"sidebar" : srcButton.getSelected()
			});
		},
	
		toggleSidenav : function(oEvent){
			var srcButton = oEvent.getSource(),
				oFrame = this.getApp().getFrame();
	
			srcButton.setSelected(!srcButton.getSelected());
			
			oFrame.options.sidenav = srcButton.getSelected();
	
			oFrame.getRootControl().setOptionsEnabled({
				"sidenav" : srcButton.getSelected()
			});
		},
	
		toggleSidebarOptions : function(oEvent){
			var srcButton = oEvent.getSource(),
				oFrame = this.getApp().getFrame(),
				text = oEvent.getParameter("button").getText();
	
			var options = {
				"sidebar-small" : false,
				"sidebar-2nav" : false
			};
	
			if(text !== 'default'){
				options[text] = true;
			}
	
			oFrame.getRootControl().setOptionsEnabled(options);
		},
	
		toggleNavbar : function(oEvent){
			var srcButton = oEvent.getSource(),
				oFrame = this.getApp().getFrame();
			
			srcButton.setSelected(!srcButton.getSelected());
			
			oFrame.options.navbar = srcButton.getSelected();
			
			oFrame.getRootControl().setOptionsEnabled({
				"navbar" : srcButton.getSelected()
			});
		},
	
		showOverlay : function(oEvent){
			
			this.getApp().showOverlay({ "id" : "my-app-overlay" }, null, 'slide-ttb');
		}
	
	});
	
});