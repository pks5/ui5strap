/*
 * 
 * UI5Strap
 *
 * ui5strap.AMCreateControl
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
	jQuery.sap.declare("ui5strap.AMCreateControl");

	//Require ui5strap.ActionModule
	jQuery.sap.require("ui5strap.ActionModule");

	//Define Constructor
	ui5strap.ActionModule.extend("ui5strap.AMCreateControl");
	
	var AMCreateControlProto = ui5strap.AMCreateControl.prototype;
	
	/*
	* @Override
	*/
	AMCreateControlProto.namespace = 'createControl';

	/*
	* @Override
	*/
	AMCreateControlProto.parameters = {
			"moduleName" : {
				"required" : true, 
				"type" : "string"
			},
			"settings" : {
				"required" : false, 
				"defaultValue" : {}, 
				"type" : "object"
			},
			"tgtParam" : {
				"required" : false,
				"defaultValue" : null,
				"type" : "string"
			}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	AMCreateControlProto.run = function(){
		var moduleName = this.getParameter("moduleName"),
			moduleSettings = this.getParameter("settings"),
			tgtParam = this.getParameter("tgtParam"),
			Constructor = jQuery.sap.getObject(moduleName);
		
		if(!Constructor){
			throw new Error("Cannot create instance of '" + moduleName + "'");
		}
		var instance = new Constructor(moduleSettings);
		
		if(tgtParam){
			this.context._setParameter(tgtParam, instance);
		}
		
		this.setParameter("result", instance);
		
	};

}());