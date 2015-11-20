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

(function(){

	jQuery.sap.declare("ui5strap.BarMenuRenderer");

	ui5strap.BarMenuRenderer = {
	};

	ui5strap.BarMenuRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			typeExtraSmall = oControl.getTypeExtraSmall(),
			typeSmall = oControl.getTypeSmall(),
			typeMedium = oControl.getTypeMedium(),
			typeLarge = oControl.getTypeLarge();
		
		var classes = "u5sl-barmenu";
		if(typeExtraSmall === ui5strap.BarMenuType.Default){
			classes += ' u5sl-barmenu-flag-type-xs-listvertical';
		}
		else{
			classes += ' u5sl-barmenu-flag-type-xs-' + typeExtraSmall.toLowerCase();
		}
		classes += ' u5sl-barmenu-flag-type-sm-' + typeSmall.toLowerCase();
		classes += ' u5sl-barmenu-flag-type-md-' + typeMedium.toLowerCase();
		classes += ' u5sl-barmenu-flag-type-lg-' + typeLarge.toLowerCase();
		
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

}());
