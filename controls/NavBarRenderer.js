/*
 * 
 * UI5Strap
 *
 * NavBar Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.NavBarRenderer");

	de_pksoftware.ui5strap.controls.NavBarRenderer = {};

	de_pksoftware.ui5strap.controls.NavBarRenderer.render = function(rm, oControl) {
		var brand = oControl.getBrand(),
			align = oControl.getAlign(),
			type = oControl.getType(),
			collapse = oControl.getCollapse();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("navbar");
		if('' !== type){
			rm.addClass('navbar-' + type);
		}
		if(oControl.getInverse()){
			rm.addClass('navbar-inverse');
		}
		if('' !== align){
			rm.addClass('navbar-' + align);
		}
		rm.writeClasses();
		rm.write(">");
		
		//Container
		rm.write("<div");
		rm.addClass("container");
		rm.writeClasses();
		rm.write(">");

			//Header
			rm.write("<div");
			rm.addClass("navbar-header");
			rm.writeClasses();
			rm.write(">");
				rm.write('<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#' + oControl.getId() + '--collapse">');
				rm.write('<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>');
				rm.write('</button>');

				if("" !== brand){
					rm.write("<a");
					rm.addClass("navbar-brand");
					rm.writeClasses();
					rm.write(">");
					rm.write(brand);
					rm.write("</a>");
				}

			rm.write("</div>");

			//Collapse
			rm.write("<div id='" + oControl.getId() + "--collapse'");
			rm.addClass("collapse navbar-collapse");
			rm.writeClasses();
			rm.write(">");

			    for(var i = 0; i < collapse.length; i++){ 
			    	rm.renderControl(collapse[i]);
			    };
			
			//End collapse
			rm.write("</div>");

		//End container
		rm.write("</div>");

		//End control
		rm.write("</div>");
	};

}());
