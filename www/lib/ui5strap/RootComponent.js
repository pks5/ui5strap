sap.ui.define(['./library', 'sap/ui/core/Component'], function(library, Component){

	var RootComponent = Component.extend("ui5strap.RootComponent", {
	
	    metadata : {
	    	properties : {
	            app: {
	            	type : "ui5strap.AppBase"
	            }
	        }
	    }
	
	}),
	RootComponentProto = RootComponent.prototype;
	
	RootComponentProto._createRootControl = function(callback){
		return this.getApp()._createRootControl(callback);
	};
	
	RootComponentProto._showInitialContent = function(callback){
		return this.getApp()._showInitialContent(callback);
	};
	
	RootComponentProto._navigateTo = function(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions){
		return this.getApp()._navigateTo(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions);
	};
		
	return RootComponent;
});