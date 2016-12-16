/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.SetListItemSelectedTask
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
	 * Constructor for a new SetListItemSelectedTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Sets a list item as selected.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.SetListItemSelectedTask
	 * 
	 */
	var SetListItemSelectedTask = Task.extend("pks.ui5strap.task.SetListItemSelectedTask"),
	/**
	 * @alias pks.ui5strap.task.SetListItemSelectedTask.prototype
	 */
		SetListItemSelectedTaskProto = SetListItemSelectedTask.prototype;
	
	/*
	* @Override
	*/
	SetListItemSelectedTaskProto.parameters = {
		
		//Required
		"itemId" : {
			"required" : true, 
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
	
	/**
	 * Run the task.
	* @override
	* @protected
	*/
	SetListItemSelectedTaskProto.run = function(){
		var itemId = this.getParameter("itemId");
		
		if(!itemId){
			return;
		}
		
		var menu = this.findControl(),
			items = menu.getItems(),
			selectedItem = null;
		
		for(var i = 0; i < items.length; i++){
			if(this.context.app.config.createControlId(itemId) === this.context.app.config.createControlId(items[i].getItemId())){
				selectedItem = items[i];
				break;
			}
		}
		
		menu.setSelection(selectedItem);
		
		this.then();
	};
	
	//Legacy
	SetListItemSelectedTaskProto.completed = function(){};
	
	return SetListItemSelectedTask;
});