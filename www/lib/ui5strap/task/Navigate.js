/*
 * 
 * UI5Strap
 *
 * ui5strap.task.Navigate
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

	jQuery.sap.declare("ui5strap.task.Navigate");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.task.Navigate");

	var NavigateProto = ui5strap.task.Navigate.prototype;

	/*
	* @Override
	*/
	NavigateProto.namespace = "navigate";

	/*
	* @Override
	*/
	NavigateProto.parameters = {
		"subject" : {
			"required" : false,
			"defaultValue" : {},
			"type" : "object"
		},
			
		//Required
		"page" : {
			"required" : true, 
			"type" : "object"
		},
		
		"frameId" : {
			"required" : false,
			"type" : "string",
			"defaultValue" : "frame"
		}

	};

	/*
	* Run the ActionModule
	* @override
	*/
	NavigateProto.run = function(){
			var subject = this.findSubject(),
				view = this.getParameter("page"),
				frameId = this.getParameter("frameId");

			if(!this.context.app.components[frameId]){
				throw new Error("Cannot goto page: No such frame with component id: " + frameId);
			}
			
			this.setParameter("page.viewName", this.getParameter("page.viewName"));
			
			this.context.app.components[frameId].navigateTo(subject, view);
	}

}());