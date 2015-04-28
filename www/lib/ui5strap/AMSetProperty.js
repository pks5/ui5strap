/*
 * 
 * UI5Strap
 *
 * ui5strap.AMSetProperty
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

	jQuery.sap.declare("ui5strap.AMSetProperty");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMSetProperty");

	var AMSetPropertyProto = ui5strap.AMSetProperty.prototype;

	/*
	* @Override
	*/
	AMSetPropertyProto.namespace = 'setProperty';

	/*
	* @Override
	*/
	AMSetPropertyProto.parameters = {
		
		//Required
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"value" : {
			"required" : true, 
			"type" : ["int", "boolean", "string", "object"]
		},

		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		},

		"srcParam" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		}

	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMSetPropertyProto.run = function(){
			var srcParam = this.getParameter("srcParam"),
				propertyName = this.getParameter("propertyName"),
				propertyValue = this.getParameter("value"),
				control = this.findControl(false);
			
			//Read value from another parameter
			if(null !== srcParam){
				propertyValue = this.context._getParameter(srcParam);
			}

			control.setProperty(propertyName, propertyValue);

			this.context._log.debug("[AMSetProperty]: '" + propertyName + "' = '" + propertyValue + "'");
	};

}());