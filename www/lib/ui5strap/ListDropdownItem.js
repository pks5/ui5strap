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

(function(){

	jQuery.sap.declare("ui5strap.ListDropdownItem");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListLinkItem");
	
	ui5strap.ListLinkItem.extend("ui5strap.ListDropdownItem", {
		metadata : {
			library : "ui5strap",

			defaultAggregation : "menu",
			
			properties : {
				selectable : {
					type : "boolean",
					defaultValue : false
				}
			},

			aggregations : { 
				menu : {
					type : "ui5strap.ListDropdownMenu",
					multiple : false
				}
			}
		}
	});

	var ListDropdownItemProto = ui5strap.ListDropdownItem.prototype;

	ListDropdownItemProto.setText = function(newText){
		if(this.getMenu() === null){
			ui5strap.Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
		}
		else{
			this.setProperty('text', newText);
		}
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

	if(ui5strap.options.enableTapEvents){
		ListDropdownItemProto.ontap = function(oEvent){
			this.$().toggleClass('open');
		};
	};

	if(ui5strap.options.enableClickEvents){
		ListDropdownItemProto.onclick = function(oEvent){
			this.$().toggleClass('open');
		};
	};
	

}());