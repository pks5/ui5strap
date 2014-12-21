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

(function(){

	jQuery.sap.declare("ui5strap.AMGotoPage");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMGotoPage");

	var AMGotoPageProto = ui5strap.AMGotoPage.prototype;

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
		}
		
	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMGotoPageProto.run = function(){
			var viewId = this.getParameter("id"),
				viewType = this.getParameter("type"),
				viewName = this.getParameter("viewName"),
				target = this.getParameter("target"),
				writeHistory = this.getParameter("writeHistory"),
				bookmarkable = this.getParameter("bookmarkable"),
				virtual = this.getParameter("virtual"),
				parameters = this.getParameter("parameters");

			this.context._log.debug("Goto page '" + viewId + "' on target '" + target + "' ...");
			
			var view = {
				id : viewId,
				viewName : viewName,
				type : viewType,
				target : target,
				writeHistory : writeHistory,
				bookmarkable : bookmarkable,
				virtual : virtual,
				parameters : parameters
			};

			this.context.app.getFrame().gotoPage(this.context.parameters[this.namespace]);
	}

}());