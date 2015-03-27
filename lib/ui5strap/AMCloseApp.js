/*
 * 
 * Liberty Framework
 *
 * CloseAppAction
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

 	jQuery.sap.declare("ui5strap.AMCloseApp");
	
	
 	var AMCloseApp = function(){

	};

	AMCloseApp.prototype = new ui5strap.ActionModule();

	var AMCloseAppProto = AMCloseApp.prototype;
	ui5strap.AMCloseApp = AMCloseApp;

	/*
	* @Override
	*/
	AMCloseAppProto.namespace = 'closeApp';

	/*
	* @Override
	*/
	AMCloseAppProto.parameters = {
		"appId" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMCloseAppProto.run = function(){
		
		if(!(this.context.app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMCloseApp');
		}

		var _this = this;

		this.context.app.getViewer().closeSapplication(this.getParameter('appId'), function CloseAppActionComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		});
		
	};

	/*
	* @Override
	*/
	AMCloseAppProto.completed = function(){

	};

})();