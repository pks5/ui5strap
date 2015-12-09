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
		//Required
		"PAGE" : {
			"required" : true, 
			"type" : "object"
		},
		
		"FRAME_CONTROLLER" : {
			"required" : false,
			"type" : ["string", "object"],
			"defaultValue" : null
		}

	};

	/*
	* Run the ActionModule
	* @override
	*/
	NavigateProto.run = function(){
			var component = this.getParameter("FRAME_CONTROLLER"),
				navContainer = this.context.app.getRootControl(),
				CONTROLS = this.context.action[this.namespace]["CONTROLS"],
				VIEWS = this.context.action[this.namespace]["VIEWS"];
			
			if(CONTROLS && ("navContainer" in CONTROLS)){
				navContainer = this.context.resolve(this, CONTROLS.navContainer, true);
			}
			
			if(null === component){
				component = this.context.app.components.frame;
			}
			
			if(!(component instanceof ui5strap.AppFrame)){
				throw new Error("Cannot goto page: component must be instance of ui5strap.AppFrame!");
			}
			
			if(!navContainer || !(navContainer instanceof ui5strap.NavContainer)){
				throw new Error("[ui5strap.Task.Navigate] Please provide a valid NavContainer instance in .CONTROLS.navContainer!");
			}
			
			var viewsKeys = Object.keys(VIEWS);
			for(var i = 0; i < viewsKeys.length; i++){
				component.navigateTo(navContainer, this.context.resolve(this, VIEWS[viewsKeys[i]]));
			}
	}

}());