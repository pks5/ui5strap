/*
 * 
 * ui5strap
 *
 * Sending app message
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

	jQuery.sap.declare("ui5strap.AMAppMessage");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMAppMessage");

	var AMAppMessageProto = ui5strap.AMAppMessage.prototype;

	AMAppMessageProto.namespace = 'appMessage';

	AMAppMessageProto.parameters = {
		"receiver" : {
			"required" : true, 
			"type" : [ "string", "object"]
		},
		"message" : {
			"required" : true, 
			"type" : "object"
		},
		"toParent" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		}
	};

	/*
	* @Override
	*/
	AMAppMessageProto.run = function(){
		this.context.app.sendMessage(this.context.parameters[this.namespace]);
	};

}());