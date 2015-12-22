/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownMenu
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var ListDropdownMenu = ListBase.extend("ui5strap.ListDropdownMenu", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : {
				hostUpdate : {
					type : "ui5strap.DropdownMenuHostUpdate",
					defaultValue : ui5strap.DropdownMenuHostUpdate.None
				}
			},
	
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListDropdownMenuProto = ListDropdownMenu.prototype;
	
	var _updateParentTap = function(oEvent, data){
		var hostUpdate = this.getHostUpdate(),
			parent = this.getParent(),
			grandParent = parent.getParent(),
			listItem = oEvent.getParameter("srcItem");
		
		if(!parent.getMetadata().isInstanceOf("ui5strap.IDropdownMenuHost")){
			throw new Error("Cannot update host: not an instance of 'ui5strap.IDropdownMenuHost'");
		}
		
		if(hostUpdate === ui5strap.DropdownMenuHostUpdate.All
			|| hostUpdate === ui5strap.DropdownMenuHostUpdate.Text){
			
			parent.setText && parent.setText(listItem.getText());
		}
		
		if(hostUpdate === ui5strap.DropdownMenuHostUpdate.All
			|| hostUpdate === ui5strap.DropdownMenuHostUpdate.Data){
			
			parent.data(listItem.data());
		}
		
		if(grandParent.getMetadata().isInstanceOf("ui5strap.ISelectionProvider")){
			grandParent.pressItem(oEvent.srcControl, parent, this, listItem);
		}
	};
	
	
	
	ListDropdownMenuProto.init = function(){
		this.attachEvent("tap", {}, _updateParentTap);
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 * @Override
	 */
	ListDropdownMenuProto._handlePress = function(oEvent){
		ui5strap.ListBase.prototype._handlePress.call(this, oEvent);
		
		oEvent.stopPropagation();
		
		//Close ButtonDropdown or ListDropdownItem
		var parent = this.getParent();
		if("close" in parent){
			parent.close();
		}
	};

	if(ui5strap.support.touch){
		ListDropdownMenuProto.ontap = ListDropdownMenuProto._handlePress;
	}
	else{
		ListDropdownMenuProto.onclick = ListDropdownMenuProto._handlePress;
	}
	
	return ListDropdownMenu;
});