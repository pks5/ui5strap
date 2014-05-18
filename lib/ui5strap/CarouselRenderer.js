/*
 * 
 * UI5Strap
 *
 * Carousel Renderer
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

	jQuery.sap.declare("ui5strap.CarouselRenderer");

	ui5strap.CarouselRenderer = {
	};

	ui5strap.CarouselRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			itemsLength = items.length,
			carouselId = oControl.getId();
		 	
		 	rm.write("<div");
		    rm.writeControlData(oControl);
		    rm.addClass("carousel slide");
		    rm.writeClasses();
		    rm.write(">");

		    if(oControl.getPagination()){ 
				    rm.write("<ol id='" + oControl.getId() + "--carousel-indicators'");
				    rm.addClass("carousel-indicators");
				    rm.writeClasses();
				    rm.write(">");
				    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<li");
			    		rm.addClass("carousel-indicator");
			    		if(i === oControl.getIndex()){
					    	rm.addClass("active");
						}
						rm.writeAttribute('data-slide-to', i);
						rm.writeAttribute('data-target', '#' + carouselId);
						rm.writeClasses();
					    rm.write(">");
						rm.write("</li>");
					}
				    rm.write("</ol>");
			}

		    rm.write("<div");
		    rm.addClass("carousel-inner");
		    rm.writeClasses();
		    rm.write(">");

		    for(var i = 0; i < itemsLength; i++){
		    		rm.write("<div");
				    rm.addClass("item");
				    
				    if(i === oControl.getIndex()){
					    	rm.addClass("active");
						}
						rm.writeClasses();
				    rm.write(">");
				    rm.renderControl(items[i]);
				    
				    rm.write("</div>");
		    }
		    
			rm.write("</div>");
		    
			if(oControl.getControls()){ 
		    	    rm.write("<a");
				    rm.addClass("left carousel-control");
				    rm.writeAttribute('href', '#' + carouselId);
				    rm.writeAttribute('data-slide', 'prev');
				   	rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-left"></span>');
				    rm.write("</a>");
				
				    rm.write("<a");
				    rm.addClass("right carousel-control");
				    rm.writeAttribute('href', '#' + carouselId);
				    rm.writeAttribute('data-slide', 'next');
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-right"></span>');
				    rm.write("</a>");
			}
				
			

		    rm.write("</div>");
	};

}());
