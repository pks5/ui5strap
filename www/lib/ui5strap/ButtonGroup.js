/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonGroup
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

	jQuery.sap.declare("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	
	ui5strap.ListBase.extend("ui5strap.ButtonGroup", {
		metadata : {

			defaultAggregation : "buttons",
				
			library : "ui5strap",

			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				type : {
					type: "ui5strap.ButtonGroupType", 
					defaultValue: ui5strap.ButtonGroupType.Default
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
					
			aggregations : { 
				buttons : {
					singularName: "buttons"
				} 
			},

			events:{
				select : {
					parameters : {
						listItem : {type : "ui5strap.Button"},
						button : {type : "ui5strap.Button"},
						srcControl : {type : "ui5strap.Control"}
					}
				},
				tap : {
					parameters : {
						listItem : {type : "ui5strap.Button"},
						button : {type : "ui5strap.Button"},
						srcControl : {type : "ui5strap.Control"}
					}
				}
		    }
		}
	});

	var ButtonGroupProto = ui5strap.ButtonGroup.prototype;
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._getItems = function(){
		return this.getButtons();
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._findClosestItem = function(srcControl){
		return ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.Button);
	};
	
	/**
	 * @Public
	 * @Override
	 */
	ButtonGroupProto.getItemIndex = function(item){
		return this.indexOfAggregation("buttons", item);
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._getEventOptions = function(srcControl){
		var button = this._findClosestItem(srcControl);
		
		return {
			srcControl : srcControl,
			item : button,
			listItem : button, //deprecated
			button : button, //deprecated
			listItemIndex : this.getItemIndex(button) //deprecated
		};
	};

}());