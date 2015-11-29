/*
 * 
 * UI5Strap
 *
 * ui5strap.task.CreateControl
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
	jQuery.sap.declare("ui5strap.task.CreateControl");

	//Require ui5strap.ActionModule
	jQuery.sap.require("ui5strap.ActionModule");

	//Define Constructor
	ui5strap.ActionModule.extend("ui5strap.task.CreateControl");
	
	var CreateControlProto = ui5strap.task.CreateControl.prototype;
	
	/*
	* @Override
	*/
	CreateControlProto.namespace = 'createControl';

	/*
	* @Override
	*/
	CreateControlProto.parameters = {
			"MODULE" : {
				"required" : true, 
				"type" : "string"
			},
			"SETTINGS" : {
				"required" : false, 
				"defaultValue" : {}, 
				"type" : "object"
			}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	CreateControlProto.run = function(){
		var moduleName = this.getParameter("MODULE"),
			moduleSettings = this.getParameter("SETTINGS"),
			Constructor = jQuery.sap.getObject(moduleName);
		
		if(!Constructor){
			throw new Error("Cannot create instance of '" + moduleName + "'");
		}
		var instance = new Constructor(moduleSettings);
		
		this.setParameter("INSTANCE", instance);
		
	};

}());