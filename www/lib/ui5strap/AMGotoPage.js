/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGotoPage
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMGotoPage = ActionModule.extend("ui5strap.AMGotoPage"),
		AMGotoPageProto = AMGotoPage.prototype;

	/*
	* @Override
	*/
	AMGotoPageProto.namespace = "gotoPage";

	/*
	* @Override
	*/
	AMGotoPageProto.parameters = {
		//Required
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"target" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		},
		
		"writeHistory" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"bookmarkable" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : true
		},
		"virtual" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"frameId" : {
			"required" : false,
			"type" : "string",
			"defaultValue" : "frame"
		},
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

	/*
	* Run the ActionModule
	* @override
	*/
	AMGotoPageProto.run = function(){
			var frameId = this.getParameter("frameId");
				control = this.findControl();

			var frameGetter = 'get' + jQuery.sap.charToUpperCase(frameId, 0);
			
			if(!this.context.app[frameGetter]){
				throw new Error("Cannot goto page: No such frame with component id: " + frameId);
			}
			
			if(control === this.context.app.getRootControl()){
				this.context.app[frameGetter]().gotoPage(this.context.parameters[this.namespace]);
			}
			else{
				this.context.app[frameGetter]().navigateTo(control, this.context.parameters[this.namespace]);
			}
	}
	
	return AMGotoPage;
});