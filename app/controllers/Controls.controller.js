sap.ui.controller("com_mycompany.my_app.controllers.Controls", {

	app : liberty.getViewer().getApp(),

	onAfterRendering : function(){
		this.app.setLoaderVisible(false);
	},	

	showModal : function(){
		this.getView().byId('myModal').show();
	},

	_showStatusMessage : function(message){
		alert(message);
	},

	newAlert : function(oEvent){
		var al = new ui5strap.Alert({ visible : true, closable : true, text : 'Just a new alert!' });
		al.placeAt(this.getView().byId('alerts').getId());
	},

	buttonTap : function(oEvent){
		oEvent.getSource().setText("Tapped!");
	},

	buttonDropdownTap : function(oEvent){
		var newText = oEvent.getParameter('srcControl').getText();
		oEvent.getSource().getParent().setText(newText);
	},

	alertClosed : function(oEvent){
		this._showStatusMessage('You just closed an alert!');
	},

	closeOtherAlert : function(oEvent){
		this.getView().byId('otherAlertId').close();
	},

	modalShown : function(oEvent){
		this._showStatusMessage('A modal has just been shown!');
	},

	modalHidden : function(oEvent){
		this._showStatusMessage('A modal has just been hidden!');
	},

	popoverShown : function(oEvent){
		this.getView().byId('popoverEventIndicator').setText('Popover shown!');
	},

	popoverHidden : function(oEvent){
		this.getView().byId('popoverEventIndicator').setText('Popover hidden!');
	},

	popoverFromOutside : function(oEvent){
		this.getView().byId('popoverBottom').toggle();
	},

	tooltipFromOutside : function(oEvent){
		this.getView().byId('tipTop').toggle();
	},

	tooltipShown : function(oEvent){
		this.getView().byId('tooltipEventIndicator').setText('Tooltip shown!');
	},

	tooltipHidden : function(oEvent){
		this.getView().byId('tooltipEventIndicator').setText('Tooltip hidden!');
	}
	
});