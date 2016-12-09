/*
 * 
 * UI5Strap
 *
 * ui5strap.RadioButton
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

sap.ui.define(['./library', "pks/ui5strap/core/ControlBase"], function(library, ControlBase){

	/**
	 * Constructor for a new RadioButton instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap radio buttons.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.RadioButton
	 * 
	 */
	var RadioButton = ControlBase.extend("ui5strap.RadioButton", {
		metadata : {
			interfaces : ["ui5strap.IInputGroupAddon"],
			
			library : "ui5strap",
			
			properties : { 
				type : {
					type:"ui5strap.RadioButtonType", 
					defaultValue:ui5strap.RadioButtonType.Block
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				groupName : {
					type : "string",
					defaultValue : ""
				},
				selected : {
					type : "boolean",
					defaultValue : false
				}
			}

		},
		
		renderer : function(rm, oControl) {
			var groupName = oControl.getGroupName(),
				type = oControl.getType(),
				typeBlock = ui5strap.RadioButtonType.Block,
				inInputGroup = oControl.getParent().getMetadata().isInstanceOf("ui5strap.IInputGroup");
			
			if(!inInputGroup){
				if(type === typeBlock){ 
					rm.write("<div");
					rm.writeControlData(oControl);
					rm.addClass('radio');
					rm.writeClasses();
					rm.write(">");
				}
				
				rm.write("<label");
				if(type === ui5strap.RadioButtonType.Inline){
					rm.writeControlData(oControl);
					rm.addClass('radio-inline');
				}
				rm.writeClasses();
				rm.write(">");
			}
			
			rm.write('<input')
			if(inInputGroup || type === ui5strap.RadioButtonType.Default){
				rm.writeControlData(oControl);
			}
			else{
				rm.writeAttribute('id', 'ui5strap-radio---' + oControl.getId());
			}
			rm.writeAttribute('type', 'radio');
			rm.writeAttribute('value', oControl.getValue());
			rm.writeAttribute('name', groupName);
			if(oControl.getSelected()){
				rm.writeAttribute('checked', 'checked');
			}
			rm.addClass('ui5strap-radio-' + groupName);
			rm.writeClasses();
			rm.write('/>');
				
			rm.writeEscaped(oControl.getLabel());
			
			if(!inInputGroup){
				rm.write("</label>");

				if(type === typeBlock){ 
					rm.write("</div>");
				}
			}
		}
	}),
	RadioButtonProto = RadioButton.prototype;

	var _onChange = function(_this){
		return function(ev){
			var inputValue = _this.$checkbox.prop('checked');
			if(inputValue !== _this.getSelected()){ 
				_this.setProperty("selected", inputValue, true);
				_this.updateGroup();
			}
			
		}
	};

	RadioButtonProto.onAfterRendering = function(){
		this.$checkbox = this.$().find('#' + 'ui5strap-radio---' + this.getId());
		this.$checkbox.on('change', _onChange(this));
	};

	RadioButtonProto.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$checkbox.off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	RadioButtonProto.updateGroup = function() {
		var radio = this;
		jQuery('.ui5strap-radio-' + this.getGroupName()).each(function(i, o){
			var controlId = o.id.substr(17);
			if(controlId !== radio.getId()){
				sap.ui.getCore().byId(controlId).setSelected(false);
			}
		});
	};

	RadioButtonProto.setSelected = function(sValue) {
		var checkbox = this;
		sValue = this.validateProperty("selected", sValue);
		
		if (sValue != this.getSelected()) {
			this.setProperty("selected", sValue, true);
			if (this.getDomRef() && this.$checkbox.prop('checked') != sValue) {
				this.$checkbox.prop('checked', sValue);
				checkbox.updateGroup();
			}


		}
		
		return this;
	};
	
	return RadioButton;
});