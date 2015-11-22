/*
 * 
 * UI5Strap
 *
 * ui5strap.AMUpdateMenu
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
	jQuery.sap.declare("ui5strap.AMUpdateMenu");

	//Require ui5strap.ActionModule
	jQuery.sap.require("ui5strap.ActionModule");

	//Define Constructor
	ui5strap.ActionModule.extend("ui5strap.AMUpdateMenu");

	var AMUpdateMenuProto = ui5strap.AMUpdateMenu.prototype;
	
	/*
	* @Override
	*/
	AMUpdateMenuProto.namespace = "updateMenu";
	
	/*
	* @Override
	*/
	AMUpdateMenuProto.parameters = {
		
		//Required
		"target" : {
			"required" : true, 
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
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	AMUpdateMenuProto.run = function(){
		var target = this.getParameter("target");
		if(target !== this.context.eventParameters["target"]){
			return;
		}
		
		var menu = this.findControl(),
			newPage = this.context.event.getSource().getTarget(target),
			viewData = newPage.getViewData(),
			items = menu.getItems(),
			selectedItem = null;
		
		for(var i = 0; i < items.length; i++){
			if(newPage.getId() === this.context.app.createControlId(items[i].getItemId())){
				selectedItem = items[i];
				break;
			}
		}
		
		menu.setSelectedControl(selectedItem);
	};

}());