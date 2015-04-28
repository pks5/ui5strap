/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainerRenderer
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

	jQuery.sap.declare("ui5strap.NavContainerRenderer");

	var NavContainerRenderer = {};

	ui5strap.NavContainerRenderer = NavContainerRenderer;

	NavContainerRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl);

		for(var aggregationId in oControl.targets){
			this.renderTarget(rm, oControl, aggregationId);
		}

		this.endRender(rm, oControl);
	};

	/*
	* @Public
	*/
	NavContainerRenderer.startRender = function(rm, oControl) {
			rm.write("<div");
		    rm.writeControlData(oControl);
		    rm.addClass(oControl.getClassString());
		    rm.writeClasses();
		    rm.write(">");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.renderTarget = function (rm, oControl, target) {
			rm.write('<div');
			rm.addClass('navcontainer-target navcontainer-' + oControl.ncType + '-target navcontainer-' + oControl.ncType + '-target-' + target);
			//Legacy support
			rm.addClass('navcontainer-aggregation navcontainer-aggregation-' + target);
			rm.writeClasses();
			rm.write(">");

			//Pages container
			rm.write('<div id="' + oControl.targetPagesDomId(target) + '"');
			rm.addClass('navcontainer-pages');
			rm.writeClasses();
			rm.write("></div>");
			
			//Layers container
			rm.write('<div id="' + oControl.targetLayersDomId(target) + '"');
			rm.addClass('navcontainer-layers');
			rm.writeClasses();
			rm.write(">");
			rm.write("</div>");

			rm.write("</div>");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.endRender = function(rm) {
		 	rm.write("</div>");
	};


}());
