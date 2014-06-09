/*
 * 
 * ui5strap
 *
 * AMAlert
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

	jQuery.sap.declare("ui5strap.AMAlert");

	ui5strap.ActionModule.extend("ui5strap.AMAlert");

	var AMAlertProto = ui5strap.AMAlert.prototype;

	/*
	* @Override
	*/
	AMAlertProto.namespace = 'alert';

	/*
	* @Override
	*/
	AMAlertProto.parameters = {
		"message" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMAlertProto.run = function(){
		alert(this.getParameter('message'));
	};

}());