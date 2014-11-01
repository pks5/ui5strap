/*
 * 
 * UI5Strap
 *
 * Renderer for Standard Nav Container
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
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
