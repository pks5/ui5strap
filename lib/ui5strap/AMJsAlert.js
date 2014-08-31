/*
 * 
 * ui5strap
 *
 * AMJsAlert
 *
 * Simple Action that creates a standard JavaScript Alert. Used for quick testing actions.
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.AMJsAlert");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMJsAlert");

	var AMJsAlertProto = ui5strap.AMJsAlert.prototype;

	/*
	* @Override
	*/
	AMJsAlertProto.namespace = 'alert';

	/*
	* @Override
	*/
	AMJsAlertProto.parameters = {
		"message" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMJsAlertProto.run = function(){
		alert(this.getParameter('message'));
	};

}());