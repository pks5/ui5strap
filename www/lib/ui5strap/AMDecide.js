/*
 * 
 * UI5Strap
 *
 * ui5strap.AMDecide
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
	jQuery.sap.declare("ui5strap.AMDecide");

	//Require ui5strap.ActionModule
	jQuery.sap.require("ui5strap.ActionModule");

	//Define Constructor
	ui5strap.ActionModule.extend("ui5strap.AMDecide");
	
	var AMDecideProto = ui5strap.AMDecide.prototype;
	
	/*
	* @Override
	*/
	AMDecideProto.namespace = 'decide';

	/*
	* @Override
	*/
	AMDecideProto.parameters = {
			"conditions" : {
				"required" : true, 
				"type" : "array"
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
	AMDecideProto.run = function(){
		var conditions = this.getParameter("conditions"),
			defaultAction = this.getParameter("defaultAction");
		
		
	};

}());