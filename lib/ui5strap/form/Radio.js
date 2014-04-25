/*
 * 
 * UI5Strap
 *
 * form.Radio
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.Radio");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.form.Radio", {
		metadata : {

			library : "de_pksoftware.ui5strap",
			
			properties : { 
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
			}
		}
	};

	de_pksoftware.ui5strap.form.Radio.prototype.onAfterRendering = function(){
		this.$checkbox = this.$().find('#' + this.getId() + '---radio');
		this.$checkbox.on('change', _onChange(this));
	};

	de_pksoftware.ui5strap.form.Radio.prototype.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$checkbox.off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	de_pksoftware.ui5strap.form.Radio.prototype.setChecked = function(sValue) {
		sValue = this.validateProperty("checked", sValue);
		
		if (sValue != this.getSelected()) {
			this.setProperty("selected", sValue, true);
			if (this.getDomRef() && this.$checkbox.prop('checked') != sValue) {
				this.$checkbox.prop('checked', sValue);
			}
		}
		return this;
	};

}());