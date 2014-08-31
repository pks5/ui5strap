/*
 * 
 * ui5strap
 *
 * AMUnloadModel
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

	jQuery.sap.declare("ui5strap.AMUnloadModel");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMUnloadModel");

	var AMUnloadModelProto = ui5strap.AMUnloadModel.prototype;

	/*
	* @Override
	*/
	AMUnloadModelProto.namespace = 'unloadModel';

	/*
	* @Override
	*/
	AMUnloadModelProto.parameters = {
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
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMUnloadModelProto.run = function(){ 
			var theControl = this.findControl(true),
				modelName = this.getParameter("modelName");
			
			theControl.setModel(null, modelName);
			
			this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (scope: '" + this.getParameter("scope") + "') unloaded.");
	};

}());