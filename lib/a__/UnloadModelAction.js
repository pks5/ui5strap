/*
 * 
 * a__
 *
 * UnloadModelAction
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

	jQuery.sap.declare("a__.UnloadModelAction");

	a__.ActionModule.extend("a__.UnloadModelAction");

	var UnloadModelActionProto = a__.UnloadModelAction.prototype;

	/*
	* @Override
	*/
	UnloadModelActionProto.namespace = 'unloadModel';

	/*
	* @Override
	*/
	UnloadModelActionProto.parameters = {
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"modelScope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	UnloadModelActionProto.run = function(){ 
			var modelName = this.getParameter("modelName"),
				controlId = this.getParameter("controlId"),
				scope = this.getParameter("modelScope"),
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