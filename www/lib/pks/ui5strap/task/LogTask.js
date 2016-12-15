/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.LogTask
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
	 * Constructor for a new LogTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Logs in console.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.LogTask
	 * 
	 */
	var LogTask = Task.extend("pks.ui5strap.task.LogTask"),
	/**
	 * @alias pks.ui5strap.task.LogTask.prototype
	 */
		LogTaskProto = LogTask.prototype;

	/*
	* @Override
	*/
	LogTaskProto.parameters = {
		"logType" : {
			"required" : true, 
			"type" : "string"
		},
		"message" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	LogTaskProto.run = function(){
		this.context._log[this.getParameter("logType")](this.getParameter("message"));
		
		this.then();
	};
	
	//Legacy
	LogTaskProto.completed = function(){};
	
	return LogTask;
});