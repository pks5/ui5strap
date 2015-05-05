/*
 * 
 * Analogue Clock Renderer
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */

(function(){

	jQuery.sap.declare("tld__domain.shared__lib.ClockRenderer");

	tld__domain.shared__lib.ClockRenderer = {};

	tld__domain.shared__lib.ClockRenderer.render = function(rm, oControl) {
		//Container
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-gpu clock-control clock-control-" + oControl.getDesign());
		rm.writeClasses();
		rm.write(">");

			//Hour
			rm.write("<div");
			rm.addClass("clock-control-hand clock-control-hour");
			rm.writeClasses();
			rm.write(">");
			rm.write("</div>");

			//Minute
			rm.write("<div");
			rm.addClass("clock-control-hand clock-control-minute");
			rm.writeClasses();
			rm.write(">");
			rm.write("</div>");

			//Second
			rm.write("<div");
			rm.addClass("clock-control-hand clock-control-second");
			rm.writeClasses();
			rm.write(">");
			rm.write("</div>");

		rm.write("</div>");
	};

}());
