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
		"propertyKey" : {
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
			var control = this.context.app.getControl(this.getParameter("controlId")),
				propertyKey = this.getParameter("propertyKey"),
				tgtParam = this.getParameter("tgtParam"),
				propertyValue = control["get" + de.pksoftware.sappmaker.common.SappUtils.ucFirst(propertyKey)]();

			this.context._setParameter(tgtParam, propertyValue);
			this.context._log.debug("get '" + propertyKey + "' = '" + propertyValue + "'");
	};

}());