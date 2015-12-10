/*
 * 
 * UI5Strap
 *
 * ui5strap.AMOpenApp
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

	var AMOpenApp = ActionModule.extend("ui5strap.AMOpenApp"),
		OpenAppProto = AMOpenApp.prototype;

	/*
	* @Override
	*/
	OpenAppProto.namespace = 'openApp';

	/*
	* @Override
	*/
	OpenAppProto.parameters = {
		"url" : {
			"required" : true, 
			"type" : "string"
		},
		"id" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"package" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"icon" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"name" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"launcher" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : "index.html"
		},
		"type" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : "HTML5"
		},
		"internal" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"target" : {
			"required" : false, 
			"defaultValue" : "BROWSER", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	OpenAppProto.run = function(){
		var appUrl = this.getParameter("url");

		if(!appUrl){
			throw new Error('Invalid sapplication url: ' + appUrl);
		}

		if(!(this.context.app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMOpenApp');
		}

		//TODO
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
		var sapplicationUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();
		this.setParameter("frameUrl", sapplicationUrl);
		//
		
		var viewer = this.context.app.getViewer();
		var target = this.getParameter("target");
		if("BROWSER" === target){
			//Means to redirect
			viewer.openSapplication(appUrl);
		}
		else if("VIEWER" === target){
			var _this = this;
			viewer.executeApp(
				{
					"id" : this.getParameter("id"),
					"package" : this.getParameter("package"),
					"type" : this.getParameter("type"),
					"url" : appUrl,
					"internal" : this.getParameter("internal"),
					"icon" : this.getParameter("icon"),
					"name" : this.getParameter("name"),
					"launcher" : this.getParameter("launcher")
				}, 
				false, 
				function(){
					//Notify the action module that the action is completed.
					_this.fireEvents(ActionModule.EVENT_COMPLETED);
				},
				null
			);	
		}
		
	};

	/*
	* @Override
	*/
	OpenAppProto.completed = function(){
		//Originally, the EVENT_COMPLETED is fired here. We have to override this method to disable this default behaviour.
	};
	
	return AMOpenApp;
});