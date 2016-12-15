/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.SetModelTask
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
	 * Constructor for a new SetModelTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Sets a model.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.SetModelTask
	 * 
	 */
	var SetModelTask = Task.extend("pks.ui5strap.task.SetModelTask"),
	/**
	 * @alias pks.ui5strap.task.SetModelTask.prototype
	 */
		SetModelTaskProto = SetModelTask.prototype;

	/*
	* @Override
	*/
	SetModelTaskProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"defaultValue" : null, 
			"type" : "string"
		},

		//Optional
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

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	SetModelTaskProto.run = function(){ 
			var srcParam = this.getParameter("srcParam"),
				modelName = this.getParameter("modelName"),
				data = this.getParameter("data"),
				theControl = this.findControl(true);
			
			if(null !== srcParam){
				data = this.context.get(this, srcParam);
			}

			if(!data){
				throw new Error('Data must be an object!');
			}

			theControl.setModel(new sap.ui.model.json.JSONModel(data), modelName);
			
			this.then();
			
			this.context._log.debug("Model '" + modelName + "' (src param: '" + srcParam + "', scope: '" + this.getParameter("scope") + "') set.");
	};
	
	//Legacy
	SetModelTaskProto.completed = function(){};
	
	return SetModelTask;
});