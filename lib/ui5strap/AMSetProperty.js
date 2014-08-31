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
		"viewId" : {
			"required" : false, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "GLOBAL", 
			"type" : "string"
		},
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"value" : {
			"required" : true, 
			"type" : ["int", "boolean", "string", "object"]
		},
		"srcParam" : {
			"required" : false
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMSetPropertyProto.run = function(){
			var controlId = this.getParameter("controlId"),
				scope = this.getParameter("scope"),
				srcParam = this.getParameter("srcParam"),
				propertyKey = this.getParameter("propertyName"),
				propertyValue = this.getParameter("value");
				
			var control = null;
			
			if(scope === 'GLOBAL'){
				control = this.context.app.getControl(controlId, this.getParameter("viewId"));
			}
			else if(scope === 'VIEW'){
				control = this.context.controller.getView();
				if(null !== controlId){
					control = this.context.app.getControl(controlId, control.getId());
				}
			}

			if(!control){
				throw new Error('Invalid control: ' + controlId);
			}

			//Read value from another parameter
			if(null !== srcParam){
				propertyValue = this.context._getParameter(srcParam);
			}

			control.setProperty(propertyKey, propertyValue);

			this.context._log.debug("[AMSetProperty]: '" + propertyKey + "' = '" + propertyValue + "'");
	};

}());