/*
 * 
 * UI5Strap
 *
 * ui5strap.AMSetListItemSelected
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

	var AMSetListItemSelected = ActionModule.extend("ui5strap.AMSetListItemSelected"),
		AMSetListItemSelectedProto = AMSetListItemSelected.prototype;
	
	/*
	* @Override
	*/
	AMSetListItemSelectedProto.namespace = "setListItemSelected";
	
	/*
	* @Override
	*/
	AMSetListItemSelectedProto.parameters = {
		
		//Required
		"itemId" : {
			"required" : true, 
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
	AMSetListItemSelectedProto.run = function(){
		var itemId = this.getParameter("itemId");
		
		if(!itemId){
			return;
		}
		
		var menu = this.findControl(),
			items = menu.getItems(),
			selectedItem = null;
		
		for(var i = 0; i < items.length; i++){
			if(this.context.app.config.createControlId(itemId) === this.context.app.config.createControlId(items[i].getItemId())){
				selectedItem = items[i];
				break;
			}
		}
		
		menu.setSelection(selectedItem);
	};
	
	return AMSetListItemSelected;
});