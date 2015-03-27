/*
 * 
 * Liberty Framework
 *
 * OpenAppAction
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/coolui5
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.AMOpenApp");
	
	jQuery.sap.require("ui5strap.ActionModule");

	var ActionModule = ui5strap.ActionModule;

	ActionModule.extend("ui5strap.AMOpenApp");

	var OpenAppProto = ui5strap.AMOpenApp.prototype;

	/*
	* @Override
	*/
	OpenAppProto.namespace = 'openApp';

	/*
	* @Override
	*/
	OpenAppProto.parameters = {
		"appUrl" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : false, 
			"defaultValue" : "BROWSER", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	OpenAppProto.run = function(){
		
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');

		var sappUrl = this.getParameter("appUrl");

		if(null === sappUrl || "" === sappUrl){
			throw new Error('Invalid sapplication url: ' + sappUrl);
		}

		var sapplicationUrl = currentUrl + '?sapp=' + encodeURIComponent(sappUrl) + '&rand=' + Math.random();

		this.setParameter("frameUrl", sapplicationUrl);

		if(!(this.context.app instanceof ui5strap.AppSystem)){
			console.log(this.context.app);
			throw new Error('Only system apps can run ui5strap.AMOpenApp');
		}

		var sappViewer = this.context.app.getViewer();
		var target = this.getParameter("target");
		if("BROWSER" === target){
			//Means to redirect
			sappViewer.openSapplication(sappUrl);
		}
		else if("VIEWER" === target){
			var _this = this;
			sappViewer.executeSapplication(sappUrl, false, function(){
				//Notify the action module that the action is completed.
				_this.fireEvents(ActionModule.EVENT_COMPLETED);
			});	
		}
		
	};

	/*
	* @Override
	*/
	OpenAppProto.completed = function(){

	};

}());