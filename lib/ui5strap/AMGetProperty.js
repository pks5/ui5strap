/*
 * 
 * ui5strap
 *
 * GetPropertyAction
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

	jQuery.sap.declare("ui5strap.AMGetProperty");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMGetProperty");

	var AMGetPropertyProto = ui5strap.AMGetProperty.prototype;

	/*
	* @Override
	*/
	AMGetPropertyProto.namespace = 'getProperty';

	/*
	* @Override
	*/
	AMGetPropertyProto.parameters = {
		"controlId" : {
			"required" : true, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "GLOBAL", 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMGetPropertyProto.run = function(){
			var controlId = this.getParameter("controlId"),
				propertyKey = this.getParameter("propertyName"),
				scope = this.getParameter("scope"),
				tgtParam = this.getParameter("tgtParam");
			
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

			var propertyValue = control["get" + jQuery.sap.charToUpperCase(propertyKey, 0)]();

			this.context._setParameter(tgtParam, propertyValue);
			this.context._log.debug("get '" + propertyKey + "' = '" + propertyValue + "'");
	};

}());