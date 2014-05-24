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
		var navBar = oControl.getNavBar();

		this.startRender(rm, oControl);

		var aggregations = oControl.getMetadata().getAggregations();

		for(var aggregationId in aggregations){

			this.renderAggregation(rm, oControl, aggregationId);
		
		}

		this.endRender(rm, oControl);
	};



	/*
	* @Public
	*/
	NavContainerRenderer.startRender = function(rm, oControl) {
		 	rm.write("<div");
		    rm.writeControlData(oControl);
		    rm.addClass("navcontainer navcontainer-" + oControl.getName());
		    rm.writeClasses();
		    rm.write(">");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.renderAggregation = function (rm, oControl, aggregationName) {
			rm.write('<div');
			rm.addClass('navcontainer-aggregation navcontainer-aggregation-' + aggregationName);
			rm.writeClasses();
			rm.write(">");

			rm.write('<div id="' + oControl.aggregationPagesDomId(aggregationName) + '"');
			rm.addClass('navcontainer-pages');
			rm.writeClasses();
			rm.write(">");

			var content = oControl.getAggregation(aggregationName);
			if(null !== content){

				oControl.incAnonymousPageId(aggregationName);

				rm.write('<div class="navcontainer-page navcontainer-page-next navcontainer-page-prerendered navcontainer-page-hidden" id="' + oControl.pageDomId(aggregationName, content) + '">');
				
				
				rm.renderControl(content);
				
				rm.write("</div>");
			
			}

			rm.write("</div>");
			
			rm.write('<div id="' + oControl.aggregationLayersDomId(aggregationName) + '"');
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
