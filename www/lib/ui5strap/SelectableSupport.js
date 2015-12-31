/*
 * 
 * UI5Strap
 *
 * ui5strap.SelectableSupport
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
	
	var SelectableSupport = {};
	
	/**
	 * Adds the required properties to the Meta Data definition.
	 * @Public
	 */
	SelectableSupport.meta = function(meta){
		
		//Interfaces
		
		meta.interfaces.push("ui5strap.ISelectableItem");
		
		//Properties
		
		meta.properties.selected = {
			type:"boolean", 
			defaultValue:false
		};
		
		meta.properties.enabled = {
			type:"boolean", 
			defaultValue:true
		};
		
		meta.properties.selectable = {
			type : "boolean",
			defaultValue : true
		};
	};
	
	/**
	 * Adds Support for Options to an prototype or object
	 * @Public
	 */
	SelectableSupport.proto = function(oControl){
		/**
		 * @Public
		 */
		oControl.isSelectable = function(selectionProvider){
			return this.getSelectable();
		};
		
		/**
		 * @Public
		 */
		oControl.setSelected = function(newSelected, suppressInvalidate){
			if(this.getDomRef()){
	              if(newSelected){
	                  this.$().addClass("active");
	              }
	              else{
	                  this.$().removeClass("active");
	              }
	              

	              this.setProperty("selected", newSelected, true);
	          }
	          else{
	              this.setProperty("selected", newSelected, suppressInvalidate);
	          }
		};
		
		/**
		 * @Protected
		 * @Override
		 */
		var oldGetStyleClass = oControl._getStyleClass;
		oControl._getStyleClass = function(){
			return oldGetStyleClass.call(this) + SelectableSupport.getStyleClass(this);	
		};
	};
	
	SelectableSupport.getStyleClass = function(oControl){
		var styleClass = "";
		if(oControl.getSelected()){
			styleClass += " active";
		}
		
		if(!oControl.getEnabled()){
			styleClass += " disabled";
		}
		
		return styleClass;
	};
	
	return SelectableSupport;

});