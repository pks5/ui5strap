/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.NavigateTask
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

sap.ui.define(["./library", "../viewer/Task", "../core/NavContainer"], function(ui5strapTaskLib, Task, NavContainer){
	
	"use strict";
	
	/**
	 * Constructor for a new NavigateTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Navigates to a page.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.NavigateTask
	 * 
	 */
	var NavigateTask = Task.extend("pks.ui5strap.task.NavigateTask"),
	/**
	 * @alias pks.ui5strap.task.NavigateTask.prototype
	 */
		NavigateTaskProto = NavigateTask.prototype;

	/**
	* @Override
	*/
	NavigateTaskProto.parameters = {};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	NavigateTaskProto.run = function(){
			var navigator = this.context.app.getRootControl(),
				CONTROLS = this.context.action[this.namespace]["CONTROLS"];
			
			if(CONTROLS && ("NAVIGATOR" in CONTROLS)){
				
				navigator = this.context.resolve(this, CONTROLS.NAVIGATOR, true);
			}
			
			if(!navigator || !(navigator instanceof NavContainer)){
				throw new Error("[NavigateTask] Please provide a valid INavigator instance in .CONTROLS.navigator!");
			}
			
			var VIEWS = this.context.action[this.namespace]["VIEWS"],
				viewsKeys = Object.keys(VIEWS);
			
			for(var i = 0; i < viewsKeys.length; i++){
				var viewDef = this.context.resolve(this,VIEWS[viewsKeys[i]]);
				this.context.app.navigateTo(navigator,  viewDef);
			}
			
			this.then();
	};

	//Return Module Constructor
	return NavigateTask;
});