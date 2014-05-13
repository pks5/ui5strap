/*
 * 
 * UI5Strap
 *
 * Thumbnail Renderer
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

	jQuery.sap.declare("ui5strap.ThumbnailRenderer");

	ui5strap.ThumbnailRenderer = {};

	ui5strap.ThumbnailRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			image = oControl.getImage();



		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('thumbnail');
		
		rm.writeClasses();
		rm.write(">");
		
		if(null !== image){
			rm.renderControl(image);
		}
		
		rm.write('<div class="caption">');
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div></div>");
	};

}());
