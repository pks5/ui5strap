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

sap.ui.define(['./library', './ListLinkItem'], function(library, ListLinkItem){

	var ListDropdownItem = ListLinkItem.extend("ui5strap.ListDropdownItem", {
		metadata : {
			library : "ui5strap",

			defaultAggregation : "menu",
			
			properties : {
				
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
		
		this.toggle();
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