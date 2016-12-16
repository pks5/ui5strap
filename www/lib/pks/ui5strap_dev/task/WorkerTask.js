/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.WorkerTask
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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
	 * Constructor for a new WorkerTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Runs a JavaScript worker thread.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.WorkerTask
	 * 
	 */
	var WorkerTask = Task.extend("pks.ui5strap.task.WorkerTask"),
	/**
	 * @alias pks.ui5strap.task.WorkerTask.prototype
	 */
		WorkerTaskProto = WorkerTask.prototype;

	/*
	* @Override
	*/
	WorkerTaskProto.parameters = {
		"workerName" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	WorkerTaskProto.run = function(){
		var workerUrl = jQuery.sap.getModulePath(this.getParameter("workerName")) + '.worker.js',
			worker = new Worker(workerUrl),
			app = this.context.app,
			controller = this.context.controller;

		worker.addEventListener('message', function(e) {
			
			if(!(typeof(e.data) === 'object') || !("type" in e.data)){
				throw new Error('Invalid worker message: ' + JSON.stringify(e.data));
			}
			
			var messageType = e.data.type;
			if('ACTION' === messageType){

				var actionParameters = {
					"parameters" : e.data.message, 
					"controller" : controller  
				};
				
				//No callback needed
				app.runAction(actionParameters);
			}

		}, false);

		worker.postMessage('START');
		
		this.then();
	};
	
	//Legacy
	WorkerTaskProto.completed = function(){};
	
	return WorkerTask;
});