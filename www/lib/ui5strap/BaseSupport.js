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
	
	var BaseSupport = {};
	
	BaseSupport.meta = function(meta){
		//Visibility DOES inherit from smaller sizes
		meta.properties.visibilityExtraSmall = {
			type : "ui5strap.Visibility",
			defaultValue : ui5strap.Visibility.Default
		};
		meta.properties.visibilitySmall = {
			type : "ui5strap.Visibility",
			defaultValue : ui5strap.Visibility.Default
		};
		meta.properties.visibilityMedium = {
			type : "ui5strap.Visibility",
			defaultValue : ui5strap.Visibility.Default
		};
		meta.properties.visibilityLarge = {
			type : "ui5strap.Visibility",
			defaultValue : ui5strap.Visibility.Default
		};
		//TODO add visibilityExtraLarge on Bootstrap 4 Upgrade
	};
	
	/**
	 * General enhancements
	 * @Public
	 */
	BaseSupport.proto = function(oControl){
		/**
		 * @Protected
		 */
		oControl._getIdPart = function(){
			if(arguments.legnth === 0){
				throw new Error("Please provide at least one argument for ui5strap.ControlBase.prototype._getIdPart!");
			}
			var args = jQuery.makeArray(arguments);
			return this.getId() + "___" + args.join('-');
		};
		
		/**
		 * @Protected
		 */
		oControl._$getPart = function(){
			return jQuery('#' + this._getIdPart.apply(this, arguments));
		};
		
		/**
		 * @Protected
		 */
		oControl._getStyleClassPrefix = function(){
			return this.getMetadata().getElementName().replace(/\./g, '');
		};
		
		/**
		 * @Protected
		 */
		oControl._getStyleClassDesign = function(){
			return "";
		};
		
		/**
		 * @Protected
		 */
		oControl._getStyleClassRoot = function(){
			return "";
		};
		
		/**
		* @Protected
		*/
		oControl._getStyleClass = function(){
			return this._getStyleClassPrefix() 
					+ this._getStyleClassRoot()
					+ this._getStyleClassDesign() 
					+ BaseSupport.getStyleClass(this);	
		};
		
		//Class Name Builders
		/**
		 * @Protected
		 */
		oControl._getStyleClassPart = function(partName){
			return this._getStyleClassPrefix() + "-" + partName;
		};
		
		/**
		* @Protected
		*/
		oControl._getStyleClassType = function(type, typeKey){
			return 	this._getStyleClassPrefix() + "-" + (typeKey || "type") + "-" + type;
		};
		
		/**
		* @Protected
		*/
		oControl._getStyleClassFlag = function(flag){
			return 	this._getStyleClassPrefix() + "-flag-" + flag;
		};
		
		//Binding Context
		oControl.getBindingContextData = function(modelName){
			var bindingContext = this.getBindingContext(modelName);
			
			return bindingContext.getModel().getProperty(bindingContext.getPath());
		};
	};
	
	BaseSupport.getStyleClass = function(oControl){
		var visibility = visibilityExtraSmall = oControl
				.getVisibilityExtraSmall(), visibilitySmall = oControl
				.getVisibilitySmall(), visibilityMedium = oControl
				.getVisibilityMedium(), visibilityLarge = oControl
				.getVisibilityLarge(), Visibility = ui5strap.Visibility;
		
		var styleClass = "", inheritHide = false;
		
		// Visibility for EXTRA_SMALL screens
		if (visibilityExtraSmall === Visibility.VisibleUp) {
			// Visible on EXTRA_SMALL
			inheritHide = false;
		}
		else if (visibilityExtraSmall === Visibility.Visible) {
			//
		} 
		else if (inheritHide
				|| visibilityExtraSmall === Visibility.Hidden
				|| visibilityExtraSmall === Visibility.HiddenUp) {
			
			// Hidden on EXTRA_SMALL
			styleClass += " ui5strap-hide-xs";
			
			if(visibilityExtraSmall === Visibility.HiddenUp){
				inheritHide = true;
			}
		}
		
		// Visibility for SMALL screens
		if (visibilitySmall === Visibility.VisibleUp) {
			// Visible on SMALL
			inheritHide = false;
		} 
		else if (visibilitySmall === Visibility.Visible) {
			//
		}
		else if (inheritHide
				|| visibilitySmall === Visibility.Hidden
				|| visibilitySmall === Visibility.HiddenUp) {
			
			// Hidden on SMALL
			styleClass += " ui5strap-hide-sm";
			
			if(visibilitySmall === Visibility.HiddenUp){
				inheritHide = true;
			}
		}
		
		// Visibility for MEDIUM screens
		if (visibilityMedium === Visibility.VisibleUp) {
			// Visible on MEDIUM
			inheritHide = false;
		} 
		else if (visibilityMedium === Visibility.Visible) {
			//
		}
		else if (inheritHide
				|| visibilityMedium === Visibility.Hidden
				|| visibilityMedium === Visibility.HiddenUp) {
			
			// Hidden on MEDIUM
			styleClass += " ui5strap-hide-md";
			
			if(visibilityMedium === Visibility.HiddenUp){
				inheritHide = true;
			}
		}
		
		// Visibility for LARGE screens
		if (visibilityLarge === Visibility.VisibleUp) {
			// Visible on LARGE
			inheritHide = false;
		} 
		else if (visibilityLarge === Visibility.Visible) {
			//
		} 
		else if (inheritHide
				|| visibilityLarge === Visibility.Hidden
				|| visibilityLarge === Visibility.HiddenUp) {
			
			// Hidden on LARGE
			styleClass += " ui5strap-hide-lg";
			
			if(visibilityLarge === Visibility.HiddenUp){ 
				inheritHide = true;
			}
		}
		
		//TODO Add ExtraLarge on BS4 Update
		
		
		return styleClass;
	};
	
	return BaseSupport;
});