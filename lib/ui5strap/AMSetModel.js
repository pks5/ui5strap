/*
 * 
 * ui5strap
 *
 * AMSetModel
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

	jQuery.sap.declare("ui5strap.AMSetModel");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMSetModel");

	var AMSetModelProto = ui5strap.AMSetModel.prototype;

	/*
	* @Override
	*/
	AMSetModelProto.namespace = 'setModel';

	/*
	* @Override
	*/
	AMSetModelProto.parameters = {
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
			"defaultValue" : null, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		},
		"data" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"srcParam" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMSetModelProto.run = function(){ 
			var srcParam = this.getParameter("srcParam"),
				modelName = this.getParameter("modelName"),
				controlId = this.getParameter("controlId"),
				scope = this.getParameter("scope"),
				data = this.getParameter("data"),
				theControl = null;
			
			if("GLOBAL" === scope){ 
				theControl = sap.ui.getCore();

				if(null !== controlId){
					theControl = this.context.app.getControl(controlId, this.getParameter("viewId"));
				}
			}
			else if("VIEW" === scope){ 
				theControl = this.context.controller.getView();
			
				if(null !== controlId){
					theControl = this.context.app.getControl(controlId, theControl.getId());
				}
			}
			
			if(!theControl){
				throw new Error('Invalid control: ' + theControl);
			}

			if(null !== srcParam){
				data = this.context._getParameter(srcParam);
			}

			var oModel = new sap.ui.model.json.JSONModel(data);

			theControl.setModel(oModel, modelName);

			this.context._log.debug("Model '" + modelName + "' (parameterName: '" + parameterName + "', scope: '" + scope + "') set.");
	};

}());