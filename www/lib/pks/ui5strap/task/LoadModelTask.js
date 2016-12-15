/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.LoadModelTask
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

sap.ui.define(["./library", "../viewer/Task"], function(ui5strapTaskLib, Task){
	
	"use strict";
	
	/**
	 * Constructor for a new LoadModelTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Loads a model.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.LoadModelTask
	 * 
	 */
	var LoadModelTask = Task.extend("pks.ui5strap.task.LoadModelTask"),
	/**
	 * @alias pks.ui5strap.task.LoadModelTask.prototype
	 */
		LoadModelTaskProto = LoadModelTask.prototype;
	

	LoadModelTask.TYPE_ODATA = "ODATA";
	LoadModelTask.TYPE_JSON = "JSON";
	LoadModelTask.TYPE_RESOURCE = "RESOURCE";

	/*
	* @Override 
	*/
	LoadModelTaskProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"src" : {
			"required" : true, 
			"type" : "string"
		},
		"type" : {
			"required" : true, 
			"type" : "string"
		},

		//Optional
		"serviceId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"paramMapping" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : ["object", "string"]
		},
		"dataPath" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		
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
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
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
	LoadModelTaskProto.prepareParameters = function(){
			var serviceId = this.getParameter("serviceId");
			if(null !== serviceId){
				var service = this.context.app.getServiceData(serviceId);
				if(null === service){
					throw new Error('Invalid service: "' + serviceId + '"');
				}
				this.setParameter("src", service.url);
			}
	};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	LoadModelTaskProto.run = function(){ 
			var _this = this,
				modelUrl = this.context.app.config.resolvePath(this.getParameter("src"), false);

			var serviceMapping = this.getParameter("paramMapping");
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
					var replaceValue = this.context.get(this, mapping[paramKey]);
					modelUrl = modelUrl.replace("{"+paramKey+"}", replaceValue);
				}	
			}

			//TODO create option to disable anti-caching
			modelUrl += (modelUrl.indexOf('?') !== -1 ? '&' : '?') + 'rand=' + Math.random();

			var modelType = this.getParameter("type");
			var modelName = this.getParameter("modelName");
			var modelPath = this.getParameter("dataPath");
			
			jQuery.sap.log.debug("Loading view model: '" + modelUrl + "'");

			var theControl = this.findControl(true);
			
			var oModel = null;
			if(LoadModelTask.TYPE_ODATA === modelType){
				oModel = new sap.ui.model.odata.ODataModel(modelUrl);
			}
			else if(LoadModelTask.TYPE_JSON === modelType){ 
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(modelUrl);
			}
			else if(LoadModelTask.TYPE_RESOURCE === modelType){ 
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelUrl,
					async : true
				});
			}
			else{
				throw new Error('Invalid model type: ' + modelType);
			}

			oModel.attachRequestCompleted({}, function(){
				if(modelPath !== null){ 
					
						var data = oModel.getProperty(modelPath); 
						oModel = new sap.ui.model.json.JSONModel(data);

						if(null !== theControl){
							theControl.setModel(oModel, modelName);
						}
					
				}
				else{
					if(null !== theControl){
						theControl.setModel(oModel, modelName);
					}
				}
				
				_this.then();
				_this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (type: '" + modelType + "', scope: '" + _this.getParameter("scope") + "') loaded.");
			});
	};
	
	//Legacy
	LoadModelTaskProto.completed = function(){};
	
	return LoadModelTask;
});