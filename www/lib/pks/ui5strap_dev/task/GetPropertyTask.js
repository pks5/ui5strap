/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.GetPropertyTask
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
	 * Constructor for a new GetPropertyTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Gets a property.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.GetPropertyTask
	 * 
	 */
	var GetPropertyTask = Task.extend("pks.ui5strap.task.GetPropertyTask"),
	/**
	 * @alias pks.ui5strap.task.GetPropertyTask.prototype
	 */
		GetPropertyTaskProto = GetPropertyTask.prototype;

	/*
	* @Override
	*/
	GetPropertyTaskProto.parameters = {
		
		//Required
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : false, 
			"type" : "string"
		},
		
		//Optional
		"controlId" : {
			"required" : false, 
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
			"defaultValue" : "APP", 
			"type" : "string"
		}
		
	};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	GetPropertyTaskProto.run = function(){
			var propertyKey = this.getParameter("propertyName"),
				tgtParam = this.getParameter("tgtParam"),
				control = this.findControl(false),
				propertyValue = control["get" + jQuery.sap.charToUpperCase(propertyKey, 0)]();
			
			if(tgtParam){
				this.context.set(this, tgtParam, propertyValue);
			}
			
			this.setParameter("result", propertyValue);
			
			this.context._log.debug("get '" + propertyKey + "' = '" + propertyValue + "'");
			
			this.then();
	};
	
	//Legacy
	GetPropertyTaskProto.completed = function(){};
	
	return GetPropertyTask;
});