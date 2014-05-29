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
			contentLeft = oControl.getContentLeft(),
			content = oControl.getContent(),
			contentRight = oControl.getContentRight(),
			position = oControl.getPosition(),
			type = oControl.getType(),
			collapse = oControl.getCollapse();

		var collapseId = oControl.getCollapseId();

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

		if(contentLeft.length > 0){
			
		}

		if(contentRight.length > 0){
			
		}

		rm.writeClasses();
		rm.write(">");
		
		//Container
		rm.write("<div");
		rm.addClass(oControl.getFluid() ? "container-fluid" : "container");
		rm.writeClasses();
		rm.write(">");


		if(contentLeft.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-left');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentLeft.length; i++){ 
		    	rm.renderControl(contentLeft[i]);
		    }
		    rm.write("</div>");
		}

		if(contentRight.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-right');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentRight.length; i++){ 
		    	rm.renderControl(contentRight[i]);
		    };
		    rm.write("</div>");
		}

		if(null !== brand){

			rm.write("<div");
			rm.addClass("navbar-header");
			rm.writeClasses();
			rm.write(">");

			
			brand.addStyleClass('navbar-brand')
			rm.renderControl(brand);
			

			rm.write("</div>");

		}


		if(content.length > 0){
			rm.write("<div");
			rm.addClass("navbar-content");
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < content.length; i++){ 
		    	rm.renderControl(content[i]);
		    };
		    rm.write("</div>");
		}



		if(collapse.length > 0){
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
		}

		

		//End container
		rm.write("</div>");

		//End control
		rm.write("</div>");
	};

}());
