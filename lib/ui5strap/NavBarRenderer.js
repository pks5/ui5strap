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

	jQuery.sap.declare("ui5strap.NavBarRenderer");

	ui5strap.NavBarRenderer = {

		positionToClass : {
			FixedTop : "navbar-fixed-top",
			FixedBottom : "navbar-fixed-bottom",
			StaticTop : "navbar-static-top"
		},

		typeToClass : {
			Default : "navbar-default"
		}

	};

	ui5strap.NavBarRenderer.render = function(rm, oControl) {
		var brand = oControl.getBrand(),
			position = oControl.getPosition(),
			type = oControl.getType(),
			toggleButtonHtml = oControl.getToggleButtonHtml(),
			collapse = oControl.getCollapse();

		var collapseId = oControl.getId() + '---collapse';

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("navbar");
		
		if(ui5strap.NavBarType.None !== type){
			rm.addClass(this.typeToClass[type]);
		}

		if(oControl.getInverse()){
			rm.addClass('navbar-inverse');
		}

		if(ui5strap.NavBarPosition.Default !== position){
			rm.addClass(this.positionToClass[position]);
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

		if('' !== toggleButtonHtml){
			rm.write('<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#' + collapseId + '">');
			rm.write(toggleButtonHtml);
			rm.write('</button>');
		}
		
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
		rm.write("<div id='" + collapseId + "'");
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
