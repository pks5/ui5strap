/*
 * 
 * a__
 *
 * GetPropertyAction
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/a__
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("a__.GetPropertyAction");

	a__.ActionModule.extend("a__.GetPropertyAction");

	var GetPropertyActionProto = a__.GetPropertyAction.prototype;

	/*
	* @Override
	*/
	GetPropertyActionProto.namespace = 'getProperty';

	/*
	* @Override
	*/
	GetPropertyActionProto.parameters = {
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
	GetPropertyActionProto.run = function(){
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