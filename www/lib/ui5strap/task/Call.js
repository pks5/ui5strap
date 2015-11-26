/*
 * 
 * UI5Strap
 *
 * ui5strap.task.Call
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

	jQuery.sap.declare("ui5strap.task.Call");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.task.Call");

	var CallProto = ui5strap.task.Call.prototype;

	/*
	* @Override
	*/
	CallProto.namespace = 'call';

	/*
	* @Override
	*/
	CallProto.parameters = {
		"subject" : {
			"defaultValue" : {},
			"type" : "object"
		},
		"method" : {
			"type" : "string"
		},
		"tgtParam" : {
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	CallProto.run = function(){
		var subject = this.findSubject(),
			tgtParam = this.getParameter("tgtParam");
		
		this.setParameter("subject.control", subject);
		
		var result = this.getParameter("method");
		if(tgtParam){
			this.context._setParameter(tgtParam, result);
		}
		
		this.setParameter("result", result);
	};

}());