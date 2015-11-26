/*
 * 
 * UI5Strap
 *
 * ui5strap.AMRemoveAggregation
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
	jQuery.sap.declare("ui5strap.AMRemoveAggregation");

	//Require ui5strap.ActionModule
	jQuery.sap.require("ui5strap.ActionModule");

	//Define Constructor
	ui5strap.ActionModule.extend("ui5strap.AMRemoveAggregation");
	
	var AMRemoveAggregationProto = ui5strap.AMRemoveAggregation.prototype;
	
	/*
	* @Override
	*/
	AMRemoveAggregationProto.namespace = 'removeAggregation';

	/*
	* @Override
	*/
	AMRemoveAggregationProto.parameters = {
			//Subject
			"controlId" : {
				"required" : false, 
				"defaultValue" : null, 
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
				"defaultValue" : "VIEW", 
				"type" : "string"
			},
			
			//Arguments
			"aggregation" : {
				"required" : true,
				"defaultValue" : null,
				"type" : "string"
			},
			"instance" : {
				"required" : false,
				"defaultValue" : null,
				"type" : "object"
			}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	AMRemoveAggregationProto.run = function(){
		var srcParam = this.getParameter("srcParam"),
			instance = this.getParameter("instance"),
			targetControl = this.findControl(),
			aggregation = this.getParameter("aggregation");
		
		if(!instance){
			throw new Error("Cannot remove instance from aggregation!");
		}
		
		targetControl['remove' + jQuery.sap.charToUpperCase(aggregation)](instance);
	};

}());