/*
 * 
 * UI5Strap
 *
 * ui5strap.AMCallControlMethod
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMCallControlMethod = ActionModule.extend("ui5strap.AMCallControlMethod"),
		AMCallControlMethodProto = AMCallControlMethod.prototype;

	/*
	* @Override
	*/
	AMCallControlMethodProto.namespace = 'callControlMethod';

	/*
	* @Override
	*/
	AMCallControlMethodProto.parameters = {
		//Required
		"funcName" : {
			"required" : true,
			"type" : "string"
		},

		//Optional
		"funcArgs" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"tgtParam" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},

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
			"defaultValue" : "APP", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMCallControlMethodProto.run = function(){
		var funcName = this.getParameter("funcName"),
			funcArgs = this.getParameter("funcArgs"),
			tgtParam = this.getParameter("tgtParam"),
			control = this.findControl(false);
		
		if(null === funcArgs){
			funcArgs = [];
		}

		var result = control[funcName].apply(control, funcArgs);

		if(tgtParam){
			this.context.set(this, tgtParam, result);
		}

		this.context._log.debug("Calling control method '" + funcName + "' of control '" + control.getId() + "'");
	};

	//Return Module Constructor
	return AMCallControlMethod;
});