/*
 * 
 * Ui5OS
 * 
 * AppSandbox
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

 (function(){

	var jQuerySap = jQuery.sap;
	jQuerySap.declare("ui5strap.AppSandbox");

	jQuerySap.require("ui5strap.library");

	jQuerySap.require("ui5strap.App");
	
	jQuerySap.require("ui5strap.Sandbox");

	ui5strap.App.extend("ui5strap.AppSandbox");

	var AppSandbox = ui5strap.AppSandbox, 
		AppSandboxProto = AppSandbox.prototype;

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/
	
	AppSandboxProto.getRootControl = function(){
		if(!this._sandboxControl){
			this._sandboxControl = new ui5strap.Sandbox();
		}
		return this._sandboxControl;
	}; 

	/*
	* ----------------------------------------------------------
	* --------------------- Event Handlers ---------------------
	* ----------------------------------------------------------
	*/

	/**
	* Triggered when an app message is sent to this app
	* @public
	*/
	AppSandboxProto.onMessage = function(oEvent){
		var appMessage = oEvent.getParameters();
		appMessage.toParent = false;
		this._sandboxControl.sendMessage(appMessage, '*');
	};

	AppSandboxProto.onFirstShow = function(){
		ui5strap.App.prototype.onFirstShow.call(this);

		this._sandboxControl.setSrc(this.config.data.app.appURL);
	};

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	AppSandboxProto.includeStyle = function(callback){
		callback && callback();
	};

	AppSandboxProto.removeStyle = function(){};

}());