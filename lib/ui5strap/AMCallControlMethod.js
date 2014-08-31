/*
 * 
 * ui5strap
 *
 * ActionModule to call a method of a control
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

	jQuery.sap.declare("ui5strap.AMCallControlMethod");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMCallControlMethod");

	var AMCallControlMethodProto = ui5strap.AMCallControlMethod.prototype;

	/*
	* @Override
	*/
	AMCallControlMethodProto.namespace = 'callControlMethod';

	/*
	* @Override
	*/
	AMCallControlMethodProto.parameters = {
		"controlId" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "GLOBAL", 
			"type" : "string"
		},
		"funcName" : {
			"required" : true,

			"type" : "string"
		},
		"funcArgs" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"tgtParam" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMCallControlMethodProto.run = function(){
			var funcName = this.getParameter("funcName"),
				funcArgs = this.getParameter("funcArgs"),
				tgtParam = this.getParameter("tgtParam"),
				control = this.findControl(false);
			
			if(null === funcArgs){
				funcArgs = [];
			}

			var result = control[funcName].apply(control, funcArgs);

			if(tgtParam){
				this.context._setParameter(tgtParam, result);
			}

			this.context._log.debug("Calling control method '" + funcName + "' of control '" + control.getId() + "'");
	};

}());