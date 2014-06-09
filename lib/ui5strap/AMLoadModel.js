/*
 * 
 * ui5strap
 *
 * AMLoadModel
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
	//Test without any SAPUI5 Object stuff

	jQuery.sap.declare("ui5strap.AMLoadModel");
	//jQuery.sap.require("ui5strap.ActionModule");

	//ui5strap.ActionModule.extend("de.pksoftware.sappmaker.common.actions.AMLoadModel");

	var AMLoadModel = function(){

	};

	AMLoadModel.prototype = new ui5strap.ActionModule();

	var AMLoadModelProto = AMLoadModel.prototype;
	ui5strap.AMLoadModel = AMLoadModel;

	AMLoadModel.TYPE_ODATA = "ODATA";
	AMLoadModel.TYPE_JSON = "JSON";
	AMLoadModel.TYPE_RESOURCE = "RESOURCE";

	AMLoadModel.SCOPE_VIEW = "VIEW";
	AMLoadModel.SCOPE_GLOBAL = "GLOBAL";

	/*
	* @Override
	*/
	AMLoadModelProto.namespace = 'loadModel';

	/*
	* @Override 
	*/
	AMLoadModelProto.parameters = {
		"service" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"serviceMapping" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : ["object", "string"]
		},
		"modelUrl" : {
			"required" : true, 
			"type" : "string"
		},
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"modelType" : {
			"required" : true, 
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
		},
		"modelPath" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		}
	};

	/*
	* @Override 
	*/
	AMLoadModelProto.prepareParameters = function(){
			var serviceId = this.getParameter("service");
			if(null !== serviceId){
				var service = this.context.sapplication.getServiceData(serviceId);
				if(null === service){
					throw new Error('Invalid service: "' + serviceId + '"');
				}
				this.setParameter("modelUrl", service.url);
			}
	};

	/*
	* @Override 
	*/
	AMLoadModelProto.run = function(){ 
			var modelUrl = this.context.app.resolvePath(this.getParameter("modelUrl"));

			var serviceMapping = this.getParameter("serviceMapping");
				if(null !== serviceMapping){
					var mapping = {};
					var mappingType = typeof serviceMapping;
					if(mappingType === 'string'){
						mapping = JSON.parse('{' + serviceMapping + '}');
					}
					else if(mappingType === 'object'){
						mapping = serviceMapping;
					}	
					
					for(var paramKey in mapping){
							var replaceValue = this.context._getParameter(mapping[paramKey]);
							modelUrl = modelUrl.replace("{"+paramKey+"}", replaceValue);
					}	
				}

			//TODO create option to disable anti-caching
			modelUrl += (modelUrl.indexOf('?') !== -1 ? '&' : '?') + 'rand=' + Math.random();

			var modelType = this.getParameter("modelType");
			var modelName = this.getParameter("modelName");
			var controlId = this.getParameter("controlId");
			var scope = this.getParameter("modelScope");
			var modelPath = this.getParameter("modelPath");
			
			jQuery.sap.log.debug("Loading view model: '" + modelUrl + "'");

			var theControl = null;
			if(AMLoadModel.SCOPE_GLOBAL === scope){ 
				theControl = sap.ui.getCore();
			}
			else if(AMLoadModel.SCOPE_VIEW === scope){ 
				theControl = this.context.controller.getView();
			}
			
			if(null !== controlId){
				theControl = this.context.app.getControl(controlId);
			}

			if(typeof theControl === 'undefined'){
				throw new Error('Invalid control: ' + controlId);
			}

			var oModel = null;
			if(AMLoadModel.TYPE_ODATA === modelType){
				oModel = new sap.ui.model.odata.ODataModel(modelUrl);
			}
			else if(AMLoadModel.TYPE_JSON === modelType){ 
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(modelUrl);
			}
			else if(AMLoadModel.TYPE_RESOURCE === modelType){ 
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelUrl
				});
			}

			if(modelPath !== null){ 
				oModel.attachRequestCompleted({}, function(){
					var data = oModel.getProperty(modelPath); 
					oModel = new sap.ui.model.json.JSONModel(data);

					if(null !== theControl){
						theControl.setModel(oModel, modelName);
					}
				});
				
			}
			else{
				if(null !== theControl){
					theControl.setModel(oModel, modelName);
				}
			}

			this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (type: '" + modelType + "', scope: '" + scope + "') loaded.");
	};

}());