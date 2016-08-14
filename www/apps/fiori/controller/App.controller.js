sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.App", {

    	onAfterRendering : function(){
    		console.log(this.getOwnerComponent().getApp());
    	},
    	
    	onOpenDialog : function () {
			this.getOwnerComponent().helloDialog.open(this.getView());
		}
    
    });
});