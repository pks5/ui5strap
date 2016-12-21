/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.CloseOverlayTask
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
	 * Constructor for a new CloseOverlayTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Closes an overlay.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.1-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.CloseOverlayTask
	 * 
	 */
	var CloseOverlayTask = Task.extend("pks.ui5strap.task.CloseOverlayTask"),
	/**
	 * @alias pks.ui5strap.task.CloseOverlayTask.prototype
	 */
		CloseOverlayTaskProto = CloseOverlayTask.prototype;

	/*
	* @Override
	*/
	CloseOverlayTaskProto.parameters = {
			
			"transition" : {
				"required" : false, 
				"defaultValue" : "slide-btt", 
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
	CloseOverlayTaskProto.run = function(){
		var _this = this,
			app = this.context.app,
			overlayParent = app;
		
		if("VIEWER" === this.getParameter("scope")){
			if(!(app instanceof pks.ui5strap.viewer.SystemApp)){
				throw new Error("Only System Apps can open global overlays!");
			}
			overlayParent = app.getViewer();
		}
		
		overlayParent.hideOverlay(function CloseOverlayActionComplete(){
			_this.then();
		}, this.getParameter('transition'));
	};
	
	//Legacy
	CloseOverlayTaskProto.completed = function(){};

	return CloseOverlayTask;
});