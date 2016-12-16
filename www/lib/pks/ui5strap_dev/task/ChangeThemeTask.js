/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.ChangeThemeTask
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
	 * Constructor for a new ChangeThemeTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Changes the theme.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.ChangeThemeTask
	 * 
	 */
	var ChangeThemeTask = Task.extend("pks.ui5strap.task.ChangeThemeTask"),
	/**
	 * @alias pks.ui5strap.task.ChangeThemeTask.prototype
	 */
		ChangeThemeTaskProto = ChangeThemeTask.prototype;

	/*
	* @Override
	*/
	ChangeThemeTaskProto.parameters = {
		"theme" : {
			"required" : true,
			"type" : "string"
		}
	};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	ChangeThemeTaskProto.run = function(){
		var newTheme = this.getParameter('theme'),
			_this = this,
			app = this.context.app;

		app.setLoaderVisible(true, function(){

			window.setTimeout(function(){
				
				app.setTheme(newTheme);

				window.setTimeout(function(){
					app.setLoaderVisible(false);
					
					_this.then();
				}, 800);
				

			}, 200);

		}, 'opaque');
	};
	
	//Legacy
	ChangeThemeTaskProto.completed = function(){};

	//Return Module Constructor
	return ChangeThemeTask;
});