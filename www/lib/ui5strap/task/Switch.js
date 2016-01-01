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

sap.ui.define(['../library', '../ActionModule'], function(library, ActionModule){

	//Define Constructor
	var Switch = ActionModule.extend("ui5strap.task.Switch"),
		SwitchProto = ui5strap.task.Switch.prototype;
	
	/**
	* @Override
	*/
	SwitchProto.namespace = 'switch';

	/**
	* @Override
	*/
	SwitchProto.parameters = {
			"EXPRESSION" : {
				"required" : true, 
				"type" : "string"
			},
			"ACTIONS" : {
				"required" : true, 
				"type" : "object"
			},
			"DEFAULT_ACTION" : {
				"required" : false,
				"defaultValue" : null,
				"type" : "string"
			}
	};
	
	/**
	* Run the ActionModule
	* @override
	*/
	SwitchProto.run = function(){
		var actionKey = this.getParameter("EXPRESSION"),
			actions = this.getParameter("ACTIONS"),
			theAction = this.getParameter("DEFAULT_ACTION");
		
		if(actions[actionKey]){
			theAction = this.context.resolve(this, actions[actionKey]);
		}
		
		if(theAction){
			this.context.app.runAction({
				controller : this.context.controller,
				eventSource : this.context.eventSource,
				eventParameters : this.context.eventParameters,
				parameters: this.context.resolve(this, theAction)
			});
		}
	};

	//Return Module Constructor
	return Switch;
});