/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGetCurrentPage
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

	var AMGetCurrentPage = ActionModule.extend("ui5strap.AMGetCurrentPage"),
		AMGetCurrentPageProto = AMGetCurrentPage.prototype;
	
	/*
	* @Override
	*/
	AMGetCurrentPageProto.namespace = "getCurrentPage";
	
	/*
	* @Override
	*/
	AMGetCurrentPageProto.parameters = {
		
		//Required
		"target" : {
			"required" : true, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : false, 
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
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	AMGetCurrentPageProto.run = function(){
		var target = this.getParameter("target"),
			scope = this.getParameter("scope"),
			tgtParam = this.getParameter("tgtParam");
		
		//TODO better with action conditions
		if(scope === "SOURCE" && target !== this.context.eventParameters["target"]){
			return;
		}
		
		var nc = this.findControl(),
			currentPage = nc.getTarget(target);
		
		if(tgtParam){
			this.context.set(this, tgtParam, currentPage.getId());
		}
		this.setParameter("result", currentPage.getId());
	};
	
	return AMGetCurrentPage;
});