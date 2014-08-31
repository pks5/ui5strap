/*
 * 
 * ui5strap
 *
 * AMSetProperty
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

	jQuery.sap.declare("ui5strap.AMSetProperty");

	ui5strap.ActionModule.extend("ui5strap.AMSetProperty");

	var AMSetPropertyProto = ui5strap.AMSetProperty.prototype;

	/*
	* @Override
	*/
	AMSetPropertyProto.namespace = 'setProperty';

	/*
	* @Override
	*/
	AMSetPropertyProto.parameters = {
		"controlId" : {
			"required" : true, 
			"type" : "string"
		},
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"propertyValue" : {
			"required" : true, 
			"type" : ["int", "boolean", "string", "object"]
		}
	};

	/*
	* @Override
	*/
	AMSetPropertyProto.run = function(){
			var controlId = this.getParameter("controlId");
			var control = this.context.app.getControl(controlId);

			if(typeof control === 'undefined'){
				this.context._log.fatal("Invalid control: '" + controlId + "'");
				return;
			}

			var propertyKey = this.getParameter("propertyName");
			var propertyValue = this.getParameter("propertyValue");
			
			control.setProperty(propertyKey, propertyValue);

			this.context._log.debug("[AMSetProperty]: '" + propertyKey + "' = '" + propertyValue + "'");
	};

}());