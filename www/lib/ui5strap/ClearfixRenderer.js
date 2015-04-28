/*
 * 
 * UI5Strap
 *
 * ui5strap.ClearfixRenderer
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

	jQuery.sap.declare("ui5strap.ClearfixRenderer");

	ui5strap.ClearfixRenderer = {};

	ui5strap.ClearfixRenderer.render = function(rm, oControl) {
		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('clearfix');
		
		var visibilityMedium = oControl.getVisibilityMedium(),
			visibilityLarge = oControl.getVisibilityLarge(),
			visibilitySmall = oControl.getVisibilitySmall(),
			visibilityExtraSmall = oControl.getVisibilityExtraSmall(),
			defaultVisibility = ui5strap.Visibility.Default,
			visible = ui5strap.Visibility.Visible,
			hidden = ui5strap.Visibility.Hidden;


		if(defaultVisibility !== visibilityMedium){
			if(visibilityMedium === visible){
				rm.addClass('visible-md');
			}
			if(visibilityMedium === hidden){
				rm.addClass('hidden-md');
			}
		}
		if(defaultVisibility !== visibilityLarge){
			if(visibilityLarge === visible){
				rm.addClass('visible-lg');
			}
			if(visibilityLarge === hidden){
				rm.addClass('hidden-lg');
			}
		}
		if(defaultVisibility !== visibilitySmall){
			if(visibilitySmall === visible){
				rm.addClass('visible-sm');
			}
			if(visibilitySmall === hidden){
				rm.addClass('hidden-sm');
			}
		}
		if(defaultVisibility !== visibilityExtraSmall){
			if(visibilityExtraSmall === visible){
				rm.addClass('visible-xs');
			}
			if(visibilityExtraSmall === hidden){
				rm.addClass('hidden-xs');
			}
		}

		rm.writeClasses();
		rm.write(">");
		
		rm.write("</div>");
	};

}());
