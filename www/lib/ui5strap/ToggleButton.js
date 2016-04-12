/*
 * 
 * UI5Strap
 *
 * ui5strap.ToggleButton
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

sap.ui.define(["./library", "./ControlBase", './SelectableSupport'], function(ulib, ControlBase, SelectableSupport){
	
	
	var _meta = {
			interfaces : ["ui5strap.IText"],
			
			library : "ui5strap",
			
			properties : { 
				textSelected : {
					type:"string",
					defaultValue : ""
				},
				textDeselected : {
					type:"string",
					defaultValue:""
				},
				vertical : {
					type : "boolean",
					defaultValue : false
				},
				toggeable : {
					type : "boolean",
					defaultValue : true
				}
	
			},
			
			events : {
				"tap" : {},
				"toggle" : {}
			}
		};
	
	//Add meta data of ISelectableItem
	SelectableSupport.meta(_meta);
	
	//Constructor
	var ToggleButton = ControlBase.extend("ui5strap.ToggleButton", {
		metadata : _meta
	}),
	ToggleButtonProto = ToggleButton.prototype;
	
	//Add methods of ISelectableItem 
	SelectableSupport.proto(ToggleButtonProto);
	
	/**
	 * Produces the Root CSS Classes
	 */
	ToggleButtonProto._getStyleClassRoot = function(){
		var styleClass = " " + this._getStyleClassType(this.getVertical() ? 'Vertical' : 'Horizontal');
		
		return styleClass;
	};
	
	/**
	 * Handles the ontap / onclick event
	 */
	ToggleButtonProto._handlePress = function(oEvent){
		oEvent.setMarked();
		oEvent.setMarked("ui5strap.ISelectableItem");
		oEvent.setMarked("ui5strap.ToggleButton");
		
		if(this.getEnabled()){
			
			//If button is toggeable and selectable, change selected state and fire toggle event
			if(this.getToggeable() && this.getSelectable()){
				this.setSelected(!this.getSelected());
				
				this.fireToggle({});
			}
			
			this.fireTap({});
		}
	}
	
	if(ui5strap.support.touch){	
		ToggleButtonProto.ontap = ToggleButtonProto._handlePress;
	}
	else{
		ToggleButtonProto.onclick = ToggleButtonProto._handlePress;
	}
	
	//Return Constructor
	return ToggleButton;

});