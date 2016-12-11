/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.ex.BarMenu
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

sap.ui.define(['./library', '../core/ListBase'], function(ui5strapExLib, ListBase){

	"use strict";
	
	/**
	 * Constructor for a new BarMenu instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating bar menus.
	 * @extends pks.ui5strap.core.ListBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.ex.BarMenu
	 * 
	 */
	var BarMenu = ListBase.extend("pks.ui5strap.ex.BarMenu", {
		metadata : {

			library : "pks.ui5strap.ex",
			
			defaultAggregation : "items",
			
			properties : { 
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				
				//TODO rename to zoom
				zoomExtraSmall : {
					type:"int",
					defaultValue : 0
				},
				
				//TODO rename to zoomSmallUp
				zoomSmall : {
					type : "int",
					defaultValue : 0
				},
				
				//TODO rename to zoomMediumUp
				zoomMedium : {
					type : "int",
					defaultValue : 0
				},
				
				//TODO rename to zoomLargeUp
				zoomLarge : {
					type : "int",
					defaultValue : 0
				},
				
				//TODO add zoomExtraLarge on Bootstrap 4 Upgrade
				
				//TODO rename to type
				typeExtraSmall : {
					type : "pks.ui5strap.ex.BarMenuType",
					defaultValue : ui5strapExLib.BarMenuType.ListVertical
				},
				
				//TODO rename to typeSmallUp
				typeSmall : {
					type : "pks.ui5strap.ex.BarMenuType",
					defaultValue : ui5strapExLib.BarMenuType.Default
				},
				
				//TODO rename to typeMediumUp
				typeMedium : {
					type : "pks.ui5strap.ex.BarMenuType",
					defaultValue : ui5strapExLib.BarMenuType.Default
				},
				
				//TODO rename to typeLargeUp
				typeLarge : {
					type : "pks.ui5strap.ex.BarMenuType",
					defaultValue : ui5strapExLib.BarMenuType.Default
				}
				
				//TODO add typeExtraLarge on Bootstrap 4 Upgrade
			},
			
			aggregations : { 
				items : {
					type : "pks.ui5strap.ex.BarMenuItem",
					singularName: "item"
				} 
			}

		},
		
		renderer : function(rm, oControl) {
			var items = oControl.getItems(),
				zoomExtraSmall = oControl.getZoomExtraSmall(),
				zoomSmall = oControl.getZoomSmall(),
				zoomMedium = oControl.getZoomMedium(),
				zoomLarge = oControl.getZoomLarge(),
				typeExtraSmall = oControl.getTypeExtraSmall(),
				typeSmall = oControl.getTypeSmall(),
				typeMedium = oControl.getTypeMedium(),
				typeLarge = oControl.getTypeLarge();
			
			var classes = "u5sl-barmenu";
			if(oControl.getInverse()){
				classes += " ui5sl-barmenu-flag-inverse";
			}
			if(typeExtraSmall === ui5strapExLib.BarMenuType.Default){
				classes += ' u5sl-barmenu-flag-listvertical-xs';
			}
			else{
				classes += ' u5sl-barmenu-flag-' + typeExtraSmall.toLowerCase() + "-xs";
			}
			classes += ' u5sl-barmenu-flag-' + typeSmall.toLowerCase() + "-sm";
			classes += ' u5sl-barmenu-flag-' + typeMedium.toLowerCase() + "-md";
			classes += ' u5sl-barmenu-flag-' + typeLarge.toLowerCase() + "-lg";
			
			//Zoom
			classes += ' u5sl-barmenu-flag-zoom-xs-' + (zoomExtraSmall < 0 ? 'm' : 'p') + Math.abs(zoomExtraSmall);
			classes += ' u5sl-barmenu-flag-zoom-sm-' + (zoomSmall < 0 ? 'm' : 'p') + Math.abs(zoomSmall);
			classes += ' u5sl-barmenu-flag-zoom-md-' + (zoomMedium < 0 ? 'm' : 'p') + Math.abs(zoomMedium);
			classes += ' u5sl-barmenu-flag-zoom-lg-' + (zoomLarge < 0 ? 'm' : 'p') + Math.abs(zoomLarge);
			
			
			rm.write("<ul");
			rm.writeControlData(oControl);
			rm.addClass(classes);
			rm.writeClasses();
			rm.write(">");
			    
			for(var i = 0; i < items.length; i++){ 
				rm.renderControl(items[i]);
			}
			    
			rm.write("</ul>");
		}
	}),
	BarMenuProto = BarMenu.prototype;
	
	return BarMenu;
});