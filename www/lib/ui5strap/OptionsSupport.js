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
	
	/**
	 * Adds the required properties to the Meta Data definition.
	 * @Public
	 */
	OptionsSupport.meta = function(meta){
		meta.properties.options = {
			type : "string[]"
		};
	};
	
	/**
	 * Adds Support for Options to an prototype or object
	 * @Public
	 */
	OptionsSupport.proto = function(oControl){
		/**
		 * @Protected
		 * @Override
		 */
		var oldGetStyleClass = oControl._getStyleClass;
		oControl._getStyleClass = function(){
			return oldGetStyleClass.call(this) + this._getStyleClassOptions();	
		};
		
		/**
		* @Public
		* @Override
		* TODO avoid overriding of user provided css classes
		*/
		oControl.setOptions = function(newOptions){
			
			if("string" === typeof newOptions){
				newOptions = newOptions.trim().split(" ");
				jQuery.sap.log.warning("Space-separated options are deprecated! Please use a string[] instead!");
			}
			
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
		oControl._getStyleClassOptions = function(){
			var options = this.getOptions(),
				classes = '';
		    
			if(options){
		    	//options = options.split(' ');
		    	for(var i = 0; i < options.length; i++){
		    		classes += ' ' + this._getStyleClassPrefix() + '-option-' + options[i];
		    	}
		    }
			
			return classes;
		};
		
		/**
		* @Protected
		*/
		oControl._updateStyleClass = function(){
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
		    	//options = options.split(' ');
		    	for(var i = 0; i < options.length; i++){
		    		currentClassesString += ' ' + this._getStyleClassPrefix() + '-option-' + options[i];
		    	}
		    }
		
			this.$().attr('class', currentClassesString.trim());
		};
		
		

		/**
		* @Public
		*/
		oControl.setOptionsEnabled = function(options){
			var currentOptions = this.getOptions();
			
			if(!currentOptions){
				currentOptions = [];
			}
			
			//currentOptions = currentOptions.split(' ');
			
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
			
			this.setOptions(currentOptions); //.join(' ')
		};

		/**
		* @Public
		*/
		oControl.isOptionEnabled = function(optionName){
			return -1 !== jQuery.inArray(optionName, this.getOptions()); //.split(' ')
		};
		
		oControl.setOptionEnabled = function(optionName, optionEnabled){
			var options = {};
			
			options[optionName] = optionEnabled;
			
			this.setOptionsEnabled(options);
		};
		
		/**
		* @Public
		*/
		oControl.toggleOption = function(optionName){
			this.setOptionEnabled(optionName, !this.isOptionEnabled(optionName));
		};
		
		/**
		* @Public
		*/
		oControl.onOptionChange = function(optionName, optionEnabled){};
	};
	
	return OptionsSupport;
	
});
	