/**
 * 
 * Ui5OS
 * 
 * ui5os.controls.HomeScreenIconRenderer
 * 
 * Author: Jan Philipp Knoeller
 * 
 * Copyright (c) 2013 Philipp Knoeller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var HomeScreenIconRenderer = {};
	
	HomeScreenIconRenderer.render = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("ui5strapHomeScreenIcon");
		rm.addClass('ui5strapHomeScreenIcon-random-' + (oControl.getIndex() % 5));
		rm.addClass("ui5strapHomeScreenIcon-style-" + oControl.getIconStyle());
		rm.writeClasses();
		rm.write(">");
	
			//Icon Image wrapper
			rm.write("<div");
			rm.addClass("ui5strapHomeScreenIcon-imgWrapper");
			rm.writeClasses();
			rm.write(">");
		
				//Icon Image
				rm.write("<div");
				rm.addClass("ui5strapHomeScreenIcon-img");
				rm.writeClasses();
				rm.write(">");
				
					rm.write("<img src='" + oControl.getIcon() + "' />");
			
					rm.write("<span");
					rm.addClass("ui5strapHomeScreenIcon-bevel");
					rm.writeClasses();
					rm.write(">");
					rm.write("</span>");
			
					rm.write("<span");
					rm.addClass("ui5strapHomeScreenIcon-gloss");
					rm.writeClasses();
					rm.write(">");
					rm.write("</span>");
			
					//Top Layer
					rm.write("<span");
					rm.addClass("ui5strapHomeScreenIcon-topLayer");
					rm.writeClasses();
					rm.write(">");
						var counterValue = oControl.getCounter();
						if(counterValue > 0){
							rm.write("<span");
							rm.addClass("ui5strapHomeScreenIcon-decorator ui5strapHomeScreenIcon-decoratorCounter");
							rm.writeClasses();
							rm.write(">");
							rm.write(counterValue);
							rm.write("</span>");
						}
					rm.write("</span>");
			
					//Loader
					rm.write("<span");
					rm.addClass("ui5strapHomeScreenIcon-loader");
					rm.writeClasses();
					rm.write(">");
					
						//Spinner
						rm.write("<span");
						rm.addClass("ui5strapHomeScreenIcon-loaderSpinner");
						rm.writeClasses();
						rm.write(">");
						rm.write("</span>");
				
					rm.write("</span>");
				
				rm.write("</div>");
			
				
				//Icon Actions
				rm.write("<div");
				rm.addClass("ui5strapHomeScreenIcon-actions");
				rm.writeClasses();
				rm.write(">");
				
				if(oControl.getClosable()){
					rm.write("<div");
					rm.addClass("ui5strapHomeScreenIcon-decorator ui5strapHomeScreenIcon-actionsClose");
					rm.writeClasses();
					rm.write(">x");
					rm.write("</div>");
				}
				
				rm.write("</div>");
		
			rm.write("</div>");
		
			//Icon Title
			rm.write("<div");
			rm.addClass("ui5strapHomeScreenIcon-title");
			rm.writeClasses();
			rm.write(">");
				rm.writeEscaped(oControl.getTitle());
			rm.write("</div>");
		
		
		rm.write("</div>");
	};
	
	return HomeScreenIconRenderer;
}, true);