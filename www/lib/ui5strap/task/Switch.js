/*
 * 
 * UI5Strap
 *
 * ui5strap.task.Switch
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

	//Declare Module
	jQuery.sap.declare("ui5strap.task.Switch");

	//Require ui5strap.ActionModule
	jQuery.sap.require("ui5strap.ActionModule");

	//Define Constructor
	ui5strap.ActionModule.extend("ui5strap.task.Switch");
	
	var SwitchProto = ui5strap.task.Switch.prototype;
	
	/*
	* @Override
	*/
	SwitchProto.namespace = 'switch';

	/*
	* @Override
	*/
	SwitchProto.parameters = {
			"expression" : {
				"required" : true, 
				"type" : "string"
			},
			"actions" : {
				"required" : true, 
				"type" : "object"
			},
			"defaultAction" : {
				"required" : false,
				"defaultValue" : null,
				"type" : "string"
			}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	SwitchProto.run = function(){
		var expression = this.getParameter("expression"),
			actions = this.getParameter("actions"),
			theAction = this.getParameter("defaultAction");
		
		if(actions[expression]){
			theAction = actions[expression];
		}
		
		if(theAction){
			ui5strap.Action.run({
				app : this.context.app,
				controller : this.context.controller,
				eventSource : this.context.eventSource,
				eventParameters : this.context.eventParameters,
				parameters: theAction
			});
		}
	};

}());