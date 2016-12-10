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

sap.ui.define(["./library", "pks/ui5strap/core/ControlBase", 'pks/ui5strap/core/SelectableSupport'], function(ui5strapExLib, ControlBase, SelectableSupport){
	
	
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
	
	/**
	 * Constructor for a new ToggleButton instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating mobile like toggle buttons.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.ToggleButton
	 * 
	 */
	var ToggleButton = ControlBase.extend("ui5strap.ToggleButton", {
		metadata : _meta,
		
		renderer : function(rm, oControl) {
			rm.write("<div");
			rm.writeControlData(oControl);
		    rm.addClass(oControl._getStyleClass());
		    rm.writeClasses();
			rm.write(">");
				
				//Text On
				if(oControl.getTextDeselected()){
					rm.write("<span");
					rm.addClass("ui5strapToggleButton-text ui5strapToggleButton-text-Deselected");
					rm.writeClasses();
					rm.write(">");
					rm.writeEscaped(oControl.getTextDeselected());
					rm.write("</span>");
				}
		
				rm.write("<span");
				rm.addClass("ui5strapToggleButton-hole");
				rm.writeClasses();
				rm.write(">");
					rm.write("<span");
					rm.addClass("ui5strapToggleButton-pin");
					rm.writeClasses();
					rm.write("></span>");
				rm.write("</span>");
			    
				//Text Off
				if(oControl.getTextSelected()){
					rm.write("<span");
					rm.addClass("ui5strapToggleButton-text ui5strapToggleButton-text-Selected");
					rm.writeClasses();
					rm.write(">");
					rm.writeEscaped(oControl.getTextSelected());
					rm.write("</span>");
				}
			rm.write("</div>");
		}
	}),
	ToggleButtonProto = ToggleButton.prototype;
	
	//Add methods of ISelectableItem 
	SelectableSupport.proto(ToggleButtonProto);
	
	ToggleButtonProto._getStyleClassPrefix = function(){
		return "ui5strapToggleButton";
	};
	
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