/*
 * 
 * UI5Strap
 *
 * ui5strap.PositionSupport
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
	
	var PositionSupport = {};
	
	/**
	 * Adds the required properties to the Meta Data definition.
	 * @Public
	 */
	PositionSupport.meta = function(meta){
		meta.properties.align = {
			type : "ui5strap.Alignment",
			defaultValue : ui5strap.Alignment.Default
		};
	};
	
	/**
	 * Adds Support for Options to an prototype or object
	 * @Public
	 */
	PositionSupport.proto = function(oControl){
		/**
		 * @Protected
		 * @Override
		 */
		var oldGetStyleClass = oControl._getStyleClass;
		oControl._getStyleClass = function(){
			return oldGetStyleClass.call(this) + PositionSupport.getStyleClass(this);	
		};
	};
	
	PositionSupport.getStyleClass = function(oControl){
		var align = oControl.getAlign(), Alignment = ui5strap.Alignment, styleClass = "";

		if (align !== Alignment.Default && align !== Alignment.NavBar && align !== Alignment.Sidebar) {
			styleClass += " " + ui5strap.BSAlignment[align];
		}

		/*
		 * This are special options for Button, ButtonGroup, Nav
		 * and Form to show properly inside NavBar controls
		 * 
		 * @deprecated
		 */
		
		if (align === Alignment.NavBar
				|| align === Alignment.NavBarLeft
				|| align === Alignment.NavBarRight) {
			jQuery.sap.log
					.warning("Using Alignment.NavBar* options is deprecated.");
			var elName = oControl.getMetadata().getElementName();
			if(elName === "ui5strap.Button" 
				|| elName === "ui5strap.ButtonGroup"
				|| elName === "ui5strap.ButtonDropdown"){
				styleClass += " navbar-btn";
			}
			else if(elName === "ui5strap.Form"){
				styleClass += " navbar-form";
			}
			else if(elName === "ui5strap.Nav"){
				styleClass += " navbar-nav";
			}
		}
		

		/*
		 * This are special options for Nav controls to show
		 * properly inside Sidebar controls
		 * 
		 * @deprecated
		 */
		if (align === Alignment.Sidebar) {
			jQuery.sap.log
					.warning("Using Alignment.Sidebar options is deprecated.");
			styleClass += " sidebar-nav";
		}
		return styleClass;
	};
	
	return PositionSupport;

});