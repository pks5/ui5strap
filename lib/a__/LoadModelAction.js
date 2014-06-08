/*
 * 
 * a__
 *
 * LoadModelAction
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
	//Test without any SAPUI5 Object stuff

	jQuery.sap.declare("a__.LoadModelAction");
	//jQuery.sap.require("a__.ActionModule");

	//a__.ActionModule.extend("de.pksoftware.sappmaker.common.actions.LoadModelAction");

	var LoadModelAction = function(){

	};

	LoadModelAction.prototype = new a__.ActionModule();

	var LoadModelActionProto = LoadModelAction.prototype;
	a__.LoadModelAction = LoadModelAction;

	LoadModelAction.TYPE_ODATA = "ODATA";
	LoadModelAction.TYPE_JSON = "JSON";
	LoadModelAction.TYPE_RESOURCE = "RESOURCE";

	LoadModelAction.SCOPE_VIEW = "VIEW";
	LoadModelAction.SCOPE_GLOBAL = "GLOBAL";

	/*
	* @Override
	*/
	LoadModelActionProto.namespace = 'loadModel';

	/*
	* @Override 
	*/
	LoadModelActionProto.parameters = {
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
	LoadModelActionProto.prepareParameters = function(){
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
	LoadModelActionProto.run = function(){ 
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
			if(LoadModelAction.SCOPE_GLOBAL === scope){ 
				theControl = sap.ui.getCore();
			}
			else if(LoadModelAction.SCOPE_VIEW === scope){ 
				theControl = this.context.controller.getView();
			}
			
			if(null !== controlId){
				theControl = this.context.app.getControl(controlId);
			}

			if(typeof theControl === 'undefined'){
				throw new Error('Invalid control: ' + controlId);
			}

			var oModel = null;
			if(LoadModelAction.TYPE_ODATA === modelType){
				oModel = new sap.ui.model.odata.ODataModel(modelUrl);
			}
			else if(LoadModelAction.TYPE_JSON === modelType){ 
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(modelUrl);
			}
			else if(LoadModelAction.TYPE_RESOURCE === modelType){ 
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