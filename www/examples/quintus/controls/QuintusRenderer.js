/*
 * 
 * Quintus Game Renderer
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

jQuery.sap.declare("net__rozzo__games.quintus__app.controls.QuintusRenderer");

net__rozzo__games.quintus__app.controls.QuintusRenderer = {
};

net__rozzo__games.quintus__app.controls.QuintusRenderer.render = function(rm, oControl) {
	 	rm.write("<div");
	    rm.writeControlData(oControl);
	    rm.addClass("quintus-container");
	    rm.writeClasses();
	    rm.write(">");

	    rm.write('<canvas id="' + oControl.getId() + '---canvas"></canvas>');
	    
	    rm.write("</div>");
};
