/*
 * 
 * UI5Strap
 *
 * ui5strap.BarMenuRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BarMenuRenderer = {};

	BarMenuRenderer.render = function(rm, oControl) {
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
		if(typeExtraSmall === ui5strap.BarMenuType.Default){
			classes += ' u5sl-barmenu-flag-type-xs-listvertical';
		}
		else{
			classes += ' u5sl-barmenu-flag-type-xs-' + typeExtraSmall.toLowerCase();
		}
		classes += ' u5sl-barmenu-flag-type-sm-' + typeSmall.toLowerCase();
		classes += ' u5sl-barmenu-flag-type-md-' + typeMedium.toLowerCase();
		classes += ' u5sl-barmenu-flag-type-lg-' + typeLarge.toLowerCase();
		
		//Zoom
		if(zoomExtraSmall !== 0){
			classes += ' u5sl-barmenu-flag-zoom-xs-' + (zoomExtraSmall < 0 ? 'm' : 'p') + Math.abs(zoomExtraSmall);
		}
		if(zoomSmall !== 0){
			classes += ' u5sl-barmenu-flag-zoom-sm-' + (zoomSmall < 0 ? 'm' : 'p') + Math.abs(zoomSmall);
		}
		if(zoomMedium !== 0){
			classes += ' u5sl-barmenu-flag-zoom-md-' + (zoomMedium < 0 ? 'm' : 'p') + Math.abs(zoomMedium);
		}
		if(zoomLarge !== 0){
			classes += ' u5sl-barmenu-flag-zoom-lg-' + (zoomLarge < 0 ? 'm' : 'p') + Math.abs(zoomLarge);
		}
		
		rm.write("<ul");
		rm.writeControlData(oControl);
		rm.addClass(classes);
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < items.length; i++){ 
			rm.renderControl(items[i]);
		}
		    
		rm.write("</ul>");
	};
	
	return BarMenuRenderer;
}, true);
