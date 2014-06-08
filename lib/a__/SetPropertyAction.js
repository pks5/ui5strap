/*
 * 
 * a__
 *
 * SetPropertyAction
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/a__
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function(){

	jQuery.sap.declare("a__.SetPropertyAction");

	a__.ActionModule.extend("a__.SetPropertyAction");

	var SetPropertyActionProto = a__.SetPropertyAction.prototype;

	/*
	* @Override
	*/
	SetPropertyActionProto.namespace = 'setProperty';

	/*
	* @Override
	*/
	SetPropertyActionProto.parameters = {
		"controlId" : {
			"required" : true, 
			"type" : "string"
		},
		"propertyKey" : {
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
	SetPropertyActionProto.run = function(){
			var controlId = this.getParameter("controlId");
			var control = this.getSapplication().getControl(controlId);

			if(typeof control === 'undefined'){
				this.context._log.fatal("Invalid control: '" + controlId + "'");
				return;
			}

			var propertyKey = this.getParameter("propertyKey");
			var propertyValue = this.getParameter("propertyValue");
			
			control.setProperty(propertyKey, propertyValue);

			this.context._log.debug("[SetPropertyAction]: '" + propertyKey + "' = '" + propertyValue + "'");
	};

}());