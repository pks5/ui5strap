/*
 * 
 * UI5Strap
 *
 * ui5strap.OptionsSupport
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

sap.ui.define(['./library'], function(library){
	
	var OptionsSupport = {};
	
	OptionsSupport.bless = function(obj){
		/**
		 * @Protected
		 */
		obj._getIdPart = function(){
			if(arguments.legnth === 0){
				throw new Error("Please provide at least one argument for ui5strap.ControlBase.prototype._getIdPart!");
			}
			var args = jQuery.makeArray(arguments);
			return this.getId() + "___" + args.join('-');
		};
		
		/**
		 * @Protected
		 */
		obj._$getPart = function(){
			return jQuery('#' + this._getIdPart.apply(this, arguments));
		};
		
		/**
		 * @Protected
		 */
		obj._getStyleClassPrefix = function(){
			return this.getMetadata().getElementName().replace(/\./g, '');
		};
		
		/**
		 * @Protected
		 */
		obj._getStyleClassRoot = function(){
			return this._getStyleClassPrefix();
		};
		
		/**
		 * @Protected
		 */
		obj._getStyleClassPart = function(partName){
			return this._getStyleClassPrefix() + "-" + partName;
		};
		
		/**
		* @Protected
		*/
		obj._getStyleClassType = function(type, typeKey){
			return 	this._getStyleClassPrefix() + "-" + (typeKey || "type") + "-" + type;
		};
		
		/**
		* @Protected
		*/
		obj._getStyleClassFlag = function(flag){
			return 	this._getStyleClassPrefix() + "-flag-" + flag;
		};
		
		/**
		* @Public
		* @Override
		* TODO avoid overriding of user provided css classes
		*/
		obj.setOptions = function(newOptions){
			if(this.getDomRef()){
				this.setProperty('options', newOptions, true);
				this._updateStyleClass();
			}
			else{
				this.setProperty('options', newOptions);
			}
		};
		
		/**
		* @Protected
		*/
		obj._getStyleClassOptions = function(){
			var options = this.getOptions(),
				classes = '';
		    
			if(options){
		    	options = options.split(' ');
		    	for(var i = 0; i < options.length; i++){
		    		classes += ' ' + this._getStyleClassPrefix() + '-option-' + options[i];
		    	}
		    }
			
			return classes;
		};
		
		obj._getStyleClass = function(){
			return this._getStyleClassRoot() + " " + this._getStyleClassOptions();	
		};
		
		/**
		* @Protected
		*/
		obj._updateStyleClass = function(){
			var currentClassesString = '',
				options = this.getOptions();
			
			var classes = this.$().attr('class').split(' ');
			for(var i = 0; i < classes.length; i++){
				var cClass = classes[i];
				if(cClass && cClass.indexOf(this._getStyleClassPrefix() + '-option-') !== 0){
					currentClassesString += ' ' + cClass;
				}
				
			}
			
			if(options){
		    	options = options.split(' ');
		    	for(var i = 0; i < options.length; i++){
		    		currentClassesString += ' ' + this._getStyleClassPrefix() + '-option-' + options[i];
		    	}
		    }
		
			this.$().attr('class', currentClassesString.trim());
		};
		
		

		/**
		* @Public
		*/
		obj.setOptionsEnabled = function(options){
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
		obj.isOptionEnabled = function(optionName){
			return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
		};
		
		obj.setOptionEnabled = function(optionName, optionEnabled){
			var options = {};
			
			options[optionName] = optionEnabled;
			
			this.setOptionsEnabled(options);
		};
		
		/**
		* @Public
		*/
		obj.toggleOption = function(optionName){
			this.setOptionEnabled(optionName, !this.isOptionEnabled(optionName));
		};
		
		/**
		* @Public
		*/
		obj.onOptionChange = function(optionName, optionEnabled){};
	};
	
	return OptionsSupport;
	
}, true);
	