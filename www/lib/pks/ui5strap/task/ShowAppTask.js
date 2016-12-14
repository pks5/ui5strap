/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.ShowAppTask
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
	 * Constructor for a new ShowAppTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Loads and shows an app.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.ShowAppTask
	 * 
	 */
	var ShowAppTask = Task.extend("pks.ui5strap.task.ShowAppTask"),
	/**
	 * @alias pks.ui5strap.task.ShowAppTask.prototype
	 */
		ShowAppProto = ShowAppTask.prototype;

	/*
	* @Override
	*/
	ShowAppProto.parameters = {
		"id" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	ShowAppProto.run = function(){
		if(!(this.context.app instanceof pks.ui5strap.viewer.AppSystem)){
			throw new Error('Only system apps can run pks.ui5strap.task.OpenAppTask');
		}

		var viewer = this.context.app.getViewer();
		var _this = this;
			viewer.showApp(
				this.getParameter("id"),
				null, 
				function(){
					//Notify the action module that the action is completed.
					_this.then();
				}
			);	
		
		
	};
	
	//Legacy
	ShowAppProto.completed = function(){};

	return ShowAppTask;
});