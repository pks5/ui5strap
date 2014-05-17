/*
 * 
 * UI5Strap
 *
 * Radio Button for forms
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.Radio");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Radio", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				type : {
					type:"ui5strap.RadioType", 
					defaultValue:ui5strap.RadioType.Block
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

		}
	});

	var _onChange = function(_this){
		return function(ev){
			var inputValue = _this.$checkbox.prop('checked');
			if(inputValue !== _this.getSelected()){ 
				_this.setProperty("selected", inputValue, true);
				_this.updateGroup();
			}
			
		}
	};

	ui5strap.Radio.prototype.onAfterRendering = function(){
		this.$checkbox = this.$().find('#' + 'ui5strap-radio---' + this.getId());
		this.$checkbox.on('change', _onChange(this));
	};

	ui5strap.Radio.prototype.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$checkbox.off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	ui5strap.Radio.prototype.updateGroup = function() {
		var radio = this;
		jQuery('.ui5strap-radio-' + this.getGroupName()).each(function(i, o){
			var controlId = o.id.substr(17);
			if(controlId !== radio.getId()){
				sap.ui.getCore().byId(controlId).setSelected(false);
			}
		});
	};

	ui5strap.Radio.prototype.setSelected = function(sValue) {
		var checkbox = this;
		sValue = this.validateProperty("selected", sValue);
		
		if (sValue != this.getSelected()) {
			this.setProperty("selected", sValue, true);
			if (this.getDomRef() && this.$checkbox.prop('checked') != sValue) {
				this.$checkbox.prop('checked', sValue);
				checkbox.updateGroup();
			}


		}
//alert('test');
		
		return this;
	};

}());