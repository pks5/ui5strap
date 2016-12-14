sap.ui.define(['./library', 'sap/ui/core/Component'], function(ui5strapViewerLib, Component){
	
	"use strict";
	
	/**
	 * Constructor for a new RootComponent instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Root component for apps.
	 * @extends sap.ui.core.Component
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.RootComponent
	 * 
	 */
	var RootComponent = Component.extend("pks.ui5strap.viewer.RootComponent", /** @lends pks.ui5strap.viewer.RootComponent.prototype */{
		metadata : {
	    	interfaces : ["pks.ui5strap.viewer.IRootComponent", "pks.ui5strap.viewer.IRootNavigator"],
	    	
			properties : {
	            app: {
	            	type : "pks.ui5strap.viewer.AppBase"
	            }
	        }
	    }
	
	}),
	/**
	 * @alias pks.ui5strap.viewer.RootComponent.prototype
	 */
	RootComponentProto = RootComponent.prototype;
	
	/**
	 * Creates the Root Control asynchronously.
	 * FIXME: When using pks.ui5strap.viewer.AppBase as app module, there is no method called _createRootControl.
	 */
	RootComponentProto._createRootControl = function(callback){
		return this.getApp()._createRootControl(callback);
	};
	
	/**
	 * Shows the app's initial content.
	 * TODO: This is only relevant when using pks.ui5strap.viewer.App as app module.
	 */
	RootComponentProto._showInitialContent = function(callback, useTransitions){
		return this.getApp()._showInitialContent(callback, useTransitions);
	};
	
	/**
	 * Makes the app navigate to a certain page.
	 * TODO: This is only relevant when using pks.ui5strap.viewer.App as app module.
	 */
	RootComponentProto._navigateTo = function(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions){
		return this.getApp()._navigateTo(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions);
	};
		
	return RootComponent;
});