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

	buttonTap : function(oEvent){
		this._showStatusMessage('You just tapped a button!');
	},

	buttonDropdownTap : function(oEvent){
		this._showStatusMessage('You just tapped an item within a button dropdown menu!');
	},

	alertClosed : function(oEvent){
		this._showStatusMessage('You just closed an alert!');
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

	tooltipShown : function(oEvent){
		this.getView().byId('tooltipEventIndicator').setText('Tooltip shown!');
	},

	tooltipHidden : function(oEvent){
		this.getView().byId('tooltipEventIndicator').setText('Tooltip hidden!');
	}
	
});