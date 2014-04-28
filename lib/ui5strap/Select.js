/*
 * 
 * UI5Strap
 *
 * Select
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

	jQuery.sap.declare("ui5strap.Select");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Select", {
		metadata : {

			defaultAggregation : "items",

			library : "ui5strap",
			
			properties : { 
				value : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				trailingSpace : {
					type:"boolean", 
					defaultValue:true
				}
			},

			aggregations : { 
				items : {
					type : "ui5strap.Item",
					singularName: "items"
				} 
			}

		}
	});
	
	var _getInputValue = function(_this){
		return _this.$().val();
	};
	
	var _onChange = function(_this){
		return function(ev){
			var inputValue = _getInputValue(_this);
			if(inputValue !== _this.getValue()){ 
				_this.setProperty("value", inputValue, true);
			}
		}
	};

	ui5strap.Select.prototype.onAfterRendering = function(){
		this.$().on('change', _onChange(this));
	};

	ui5strap.Select.prototype.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$().off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	ui5strap.Select.prototype.setValue = function(sValue) {
		sValue = this.validateProperty("value", sValue);
		
		if (sValue != this.getValue()) {
			this.setProperty("value", sValue, true);
			if (this.getDomRef() && this.$().val() != sValue) {
				this.$().val(sValue);
				//this._curpos = this._$input.cursorPos();
			}
		}
		return this;
	};


}());