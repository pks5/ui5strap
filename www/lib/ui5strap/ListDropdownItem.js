/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownItem
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

sap.ui.define(['./library', './ListItemBase', './ListLinkItem'], function(library, ListItemBase, ListLinkItem){

	var ListDropdownItem = ListLinkItem.extend("ui5strap.ListDropdownItem", {
		metadata : {
			interfaces : ["ui5strap.IDropdownMenuHost"],
			
			library : "ui5strap",

			defaultAggregation : "menu",
			
			properties : {
				update : {
					type : "ui5strap.DropdownMenuHostUpdate",
					defaultValue : ui5strap.DropdownMenuHostUpdate.None
				}
			},

			aggregations : { 
				menu : {
					type : "ui5strap.ListDropdownMenu",
					multiple : false
				}
			}
		}
	}),
	ListDropdownItemProto = ListDropdownItem.prototype;

	/**
	 * @Protected
	 * @Override
	 */
	ListDropdownItemProto._getStyleClassDesign = function(){
		var styleClass = " dropdown";
		if(this.getSelected()){
			styleClass += " active";
		}
		if(!this.getEnabled()){
			styleClass += " disabled";
		}
		return styleClass;
	};
	
	ListDropdownItemProto.setText = function(newText){
		if(this.getMenu() === null){
			ui5strap.Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
		}
		else{
			this.setProperty('text', newText);
		}
	};
	
	/**
	 * @Public
	 * @Override
	 */
	ListDropdownItemProto.isSelectable = function(selectionProvider){
		return this.getSelectable() && selectionProvider === this.getMenu();
	};

	ListDropdownItemProto.open = function(){
		this.$().addClass('open');
	};
	
	ListDropdownItemProto.close = function(){
		this.$().removeClass('open');
	};

	ListDropdownItemProto.toggle = function(){
		this.$().toggleClass('open');
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ListDropdownItemProto._handlePress = function(oEvent){
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("ui5strap.ISelectableItem");
		oEvent.setMarked("ui5strap.ListDropdownItem");
		
		if(this.getEnabled()){
			if(oEvent.isMarked("ui5strap.ListDropdownMenu")){
				this.close();
				
				var menuListItem = ui5strap.Utils.findClosestParentControl(oEvent.srcControl, ListItemBase),
					hostUpdate = this.getUpdate();
				
				if(menuListItem){
					if(hostUpdate === ui5strap.DropdownMenuHostUpdate.TextAndData
						|| hostUpdate === ui5strap.DropdownMenuHostUpdate.Text){
						
						this.setText(menuListItem.getText());
					}
					
					if(hostUpdate === ui5strap.DropdownMenuHostUpdate.TextAndData
						|| hostUpdate === ui5strap.DropdownMenuHostUpdate.Data){
						
						this.data(menuListItem.data());
					}
					
					if(hostUpdate !== ui5strap.DropdownMenuHostUpdate.None){
						oEvent.setMarked("ui5strap.ISelectableItem.update");
					}
				}
			}
			else{
				this.toggle();
			}
		}
	};

	//Registering Event Handler
	//TODO Desktop / Mobile Test!!!
	if(ui5strap.support.touch){
		ListDropdownItemProto.ontap = ListDropdownItemProto._handlePress;
	}
	else{
		ListDropdownItemProto.onclick = ListDropdownItemProto._handlePress;
	}
	
	return ListDropdownItem;
});