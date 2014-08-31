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
			var modelName = this.getParameter("modelName"),
				controlId = this.getParameter("controlId"),
				scope = this.getParameter("scope"),
				theControl = null;
			
			if("GLOBAL" === scope){ 
				theControl = sap.ui.getCore();
			}
			else if("VIEW" === scope){ 
				theControl = this.context.controller.getView();
			}
			
			if(null !== controlId){
				theControl = this.context.app.getControl(controlId);
			}

			
			if(null !== theControl){
				theControl.setModel(null, modelName);
			}
			
			this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (scope: '" + scope + "') unloaded.");

	};

}());