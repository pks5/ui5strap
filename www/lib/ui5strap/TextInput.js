/*
 * 
 * UI5Strap
 *
 * ui5strap.TextInput
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	/**
	 * Constructor for a new TextInput instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating text input fields.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.TextInput
	 * 
	 */
	var TextInput = ControlBase.extend("ui5strap.TextInput", {
		metadata : {
			interfaces : ["ui5strap.IText", "ui5strap.IInputGroupControl"],
			library : "ui5strap",
			
			properties : { 
				type : {
					type : "ui5strap.TextInputType",
					defaultValue : ui5strap.TextInputType.FormControl
				},
				format : {
					type : "ui5strap.TextInputFormat",
					defaultValue : ui5strap.TextInputFormat.Default
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				rows : {
					type: "int",
					defaultValue : 1
				},
				maxLength : {
					type : "int",
					defaultValue : -1
				},
				placeholder : {
					type:"string", 
					defaultValue:""
				},
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				autocomplete : {
					type:"boolean", 
					defaultValue:true
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			},
			
			events : {
				change : {},
				liveChange : {}
			}

		},
		
		renderer : function(rm, oControl) {
			var rows = oControl.getRows(),
				type = oControl.getType(),
				maxLength = oControl.getMaxLength();
			
			//TODO We need a option for Input VS Textare instead of using rows to decide.
			//If the new option is not specified, it could decide by rows.
			if(2 > rows){
				//Render Input Field
				
				rm.write("<input");
				
				rm.writeControlData(oControl);
				
				rm.writeAttribute('type', "text");

				rm.writeAttribute('placeholder', oControl.getPlaceholder());
				rm.writeAttribute('value', oControl.getValue());
				
				if(type === ui5strap.TextInputType.FormControl){
					rm.addClass('form-control');
				}
				
				if(!oControl.getEnabled()){
					rm.writeAttribute('disabled', 'disabled');
				}
				
				if(!oControl.getAutocomplete()){
					rm.writeAttribute('autocomplete', 'off');
				}
				
				if(maxLength > 0){
					rm.writeAttribute('maxlength', maxLength);
				}

				var size = oControl.getSize();
				if(ui5strap.Size.Default !== size){
					rm.addClass('input-' + ui5strap.BSSize[size]);
				}
				
				rm.writeClasses();
				rm.write("/>");

			}
			else{
				//Render Textarea
				rm.write("<textarea");
				
				rm.writeControlData(oControl);
				
				rm.writeAttribute('rows', rows);
				rm.writeAttribute('placeholder', oControl.getPlaceholder());
				
				if(type === ui5strap.TextInputType.FormControl){
					rm.addClass('form-control');
				}
				
				if(!oControl.getEnabled()){
					rm.writeAttribute('disabled', 'disabled');
				}
				
				if(!oControl.getAutocomplete()){
					rm.writeAttribute('autocomplete', 'off');
				}
				
				if(maxLength > 0){
					rm.writeAttribute('maxlength', maxLength);
				}

				rm.writeClasses();
				rm.write(">");
				
				rm.writeEscaped(oControl.getValue());
				
				rm.write("</textarea>");
			}

			ui5strap.RenderUtils.renderTrail(rm, oControl);
		}
	}),
	TextInputProto = TextInput.prototype;
	
	TextInputProto.onAfterRendering = function(){
		
	};

	TextInputProto.onBeforeRendering = function() {
		
	};

	TextInputProto.setValue = function(sValue, bSuppressInvalidate) {
		if(this.getDomRef()){
			this.setProperty("value", sValue, true);
			
			if (this.$().val() != sValue) {
				this.$().val(sValue);
			}
		}
		else{
			this.setProperty("value", sValue, bSuppressInvalidate);
		}
		
		this._lastValue = sValue;
		this._lastLiveValue = sValue;
	};
	
	TextInputProto.onfocusin = function(oEvent){
		//console.log("focus");
	};
	
	TextInputProto._onChange = function(oEvent){
		var newValue = this.$().val();
		
		if(newValue !== this._lastValue){ 
			this.setProperty("value", newValue, true);
			
			this.fireChange({
				"oldValue" : this._lastValue
			});
			
			this._lastValue = newValue;
		}
	};
	
	TextInputProto.onsapfocusleave = function(oEvent) {
		this._onChange(oEvent);
	};
	
	
	TextInputProto.oninput = function(oEvent) {
		var newValue = this.$().val();
		if(newValue !== this._lastLiveValue){
			this.setProperty("value", newValue, true);
				
			this.fireLiveChange({
				"oldValue" : this._lastLiveValue
			});
			
			this._lastLiveValue = newValue;
		}
	};
	
	TextInputProto.onsapenter = function(oEvent) {
		if(2 > this.getRows()){
			this._onChange(oEvent);
		}
	};
	
	return TextInput;
});