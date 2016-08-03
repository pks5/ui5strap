sap.ui.define(['./library', 'sap/ui/core/Component'], function(library, Component){

	var RootComponent = Component.extend("ui5strap.RootComponent", {
		metadata : {
	    	interfaces : ["ui5strap.IRootComponent", "ui5strap.IRootNavigator"],
	    	
			properties : {
	            app: {
	            	type : "ui5strap.AppBase"
	            }
	        }
	    }
	
	}),
	RootComponentProto = RootComponent.prototype;
	
	/**
	 * Creates the Root Control asynchronously.
	 * FIXME: When using ui5strap.AppBase as app module, there is no method called _createRootControl.
	 */
	RootComponentProto._createRootControl = function(callback){
		return this.getApp()._createRootControl(callback);
	};
	
	/**
	 * Shows the app's initial content.
	 * TODO: This is only relevant when using ui5strap.App as app module.
	 */
	RootComponentProto._showInitialContent = function(callback, useTransitions){
		return this.getApp()._showInitialContent(callback, useTransitions);
	};
	
	/**
	 * Makes the app navigate to a certain page.
	 * TODO: This is only relevant when using ui5strap.App as app module.
	 */
	RootComponentProto._navigateTo = function(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions){
		return this.getApp()._navigateTo(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions);
	};
		
	return RootComponent;
});