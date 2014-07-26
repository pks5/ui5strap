/*
 * 
 * UI5Strap
 *
 * Bar Renderer
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

	jQuery.sap.declare("ui5strap.BarRenderer");

	var BarRenderer = {};

	ui5strap.BarRenderer = BarRenderer;

	BarRenderer.render = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('bar');
		rm.writeClasses();
		rm.write(">");

		rm.write("<div");
		rm.addClass('bar-inner');
		rm.writeClasses();
		rm.write(">");
		   
		//Content left
		var contentLeft = oControl.getLeft();
		if(null !== contentLeft){     
			rm.write("<div");
			rm.addClass("bar-content bar-content-left");
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentLeft.length; i++){ 
				rm.renderControl(contentLeft[i]);
			}
			rm.write("</div>");
		}

		//Content middle
		var contentMiddle = oControl.getMiddle();
		if(null !== contentMiddle){     
			rm.write("<div");
			rm.addClass("bar-content bar-content-middle");
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentMiddle.length; i++){ 
				rm.renderControl(contentMiddle[i]);
			}
			rm.write("</div>");
		}
		   
		//Content right
		var contentRight = oControl.getRight();
		if(null !== contentRight){     
			rm.write("<div");
			rm.addClass("bar-content bar-content-right");
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentRight.length; i++){ 
				rm.renderControl(contentRight[i]);
			}
			rm.write("</div>");
		}   
		    
		rm.write("</div>");    
		rm.write("</div>");
	};
}());