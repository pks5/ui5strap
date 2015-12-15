/*
 * 
 * UI5Strap
 *
 * ui5strap.ControlBase
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

	jQuery.sap.declare("ui5strap.ControlBase");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.Control.extend("ui5strap.ControlBase", {
		metadata : {

			library : "ui5strap",
			
			properties : {
				options : {
					type : "string",
					defaultValue : ""
				}
			}
		}
	});
	
	var ControlBaseProto = ui5strap.ControlBase.prototype;
	
	ControlBaseProto._stylePrefix = 'ui5strapControlBase';
	
	/**
	 * @Protected
	 */
	ControlBaseProto._getStyleClassRoot = function(){
		return this._stylePrefix;
	};
	
	/**
	 * @Protected
	 */
	ControlBaseProto._getStyleClassPart = function(partName){
		return this._stylePrefix + "-" + partName;
	};
	
	/**
	* @Protected
	*/
	ControlBaseProto._getStyleClassType = function(type){
		return 	this._stylePrefix + "-type-" + type;
	};
	
	/**
	* @Protected
	*/
	ControlBaseProto._getStyleClassFlag = function(flag){
		return 	this._stylePrefix + "-flag-" + flag;
	};
	
	/**
	* @Protected
	*/
	ControlBaseProto._getStyleClassOptions = function(){
		var options = this.getOptions(),
			classes = '';
	    
		if(options){
	    	options = options.split(' ');
	    	for(var i = 0; i < options.length; i++){
	    		classes += ' ' + this._stylePrefix + '-option-' + options[i];
	    	}
	    }
		
		return classes;
	};
	
	/**
	* @Protected
	*/
	ControlBaseProto._updateStyleClass = function(){
		var currentClassesString = '',
			options = this.getOptions();
		
		var classes = this.$().attr('class').split(' ');
		for(var i = 0; i < classes.length; i++){
			var cClass = classes[i];
			if(cClass && cClass.indexOf(this._stylePrefix + '-option-') !== 0){
				currentClassesString += ' ' + cClass;
			}
			
		}
		
		if(options){
	    	options = options.split(' ');
	    	for(var i = 0; i < options.length; i++){
	    		currentClassesString += ' ' + this._stylePrefix + '-option-' + options[i];
	    	}
	    }
	
		this.$().attr('class', currentClassesString.trim());
	};
	
	/**
	* @Public
	* @Override
	* TODO avoid overriding of user provided css classes
	*/
	ControlBaseProto.setOptions = function(newOptions){
		if(this.getDomRef()){
			this.setProperty('options', newOptions, true);
			this._updateStyleClass();
		}
		else{
			this.setProperty('options', newOptions);
		}
	};

	/**
	* @Public
	*/
	ControlBaseProto.setOptionsEnabled = function(options){
		var currentOptions = [],
			cOptions = this.getOptions();
		
		if(cOptions){
			currentOptions = cOptions.split(' ');
		}
		
		for(var optionName in options){
			var optionIndex = jQuery.inArray(optionName, currentOptions),
				optionEnabled = options[optionName];

			if(optionEnabled && -1 === optionIndex
				|| !optionEnabled && -1 !== optionIndex){
				
				if(optionEnabled){
					currentOptions.push(optionName);
				}
				else{
					currentOptions.splice(optionIndex, 1);
				}
				
				this.onOptionChange(optionName, optionEnabled);
			}
		}
		this.setOptions(currentOptions.join(' '));
	};

	/**
	* @Public
	*/
	ControlBaseProto.isOptionEnabled = function(optionName){
		return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
	};
	
	ControlBaseProto.setOptionEnabled = function(optionName, optionEnabled){
		var options = {};
		
		options[optionName] = optionEnabled;
		
		this.setOptionsEnabled(options);
	};
	
	/**
	* @Public
	*/
	ControlBaseProto.toggleOption = function(optionName){
		this.setOptionEnabled(optionName, !this.isOptionEnabled(optionName));
	};
	
	/**
	* @Public
	*/
	ControlBaseProto.onOptionChange = function(optionName, optionEnabled){
		
	};
}());