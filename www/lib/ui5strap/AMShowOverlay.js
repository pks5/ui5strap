/*
 * 
 * UI5Strap
 *
 * ui5strap.AMShowOverlay
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMShowOverlay = ActionModule.extend("ui5strap.AMShowOverlay"),
		AMShowOverlayProto = AMShowOverlay.prototype;

	/*
	* @Override
	*/
	AMShowOverlayProto.namespace = 'showOverlay';

	/*
	* @Override
	*/
	AMShowOverlayProto.parameters = {
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : true, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		},
		"transition" : {
			"required" : false, 
			"defaultValue" : "transition-slide-ttb", 
			"type" : "string"
		},
		"scope" : {
			"required" : false,
			"defaultValue" : "APP",
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMShowOverlayProto.run = function(){

		var _this = this,
			viewId = this.getParameter("id"),
			viewType = this.getParameter("type"),
			viewName = this.getParameter("viewName"),
			target = this.getParameter("target"),
			parameters = this.getParameter("parameters"),
			app = this.context.app,
			overlayParent = app;

		var viewOptions = {
			"appId" : app.getId(),
			"id" : viewId,
			"type" : viewType,
			"viewName" : viewName,
			"target" : target,
			"parameters" : parameters
		};
		
		if("VIEWER" === this.getParameter("scope")){
			if(!(app instanceof ui5strap.AppSystem)){
				throw new Error("Only System Apps can open global overlays!");
			}
			overlayParent = app.getViewer();
		}
		
		overlayParent.showOverlay(viewOptions, function AMShowOverlayRunComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		}, this.getParameter('transition'));
	};

	/*
	* @Override
	*/
	AMShowOverlayProto.completed = function(){

	};
	
	return AMShowOverlay;
});